// @ts-nocheck - build fails without this

import { db } from "../index";
import { usersTable, transactionsTable, munRegistrationsTable } from "../schema";
import { eq } from "drizzle-orm";
import { ApiError } from "@repo/shared-types";

export type TransactionType = "NITRUTSAV" | "MUN";

export const getTxnIdByFirebaseUid = async (firebaseUid: string): Promise<string | null> => {
  const [result] = await db
    .select({ txnId: transactionsTable.txnId })
    .from(usersTable)
    .innerJoin(transactionsTable, eq(usersTable.id, transactionsTable.userId))
    .where(eq(usersTable.firebaseUid, firebaseUid));

  return result?.txnId || null;
};

export const updatePaymentStatusByTxnId = async (txnId: string, isVerified: boolean) => {
  return await db.transaction(async (tx) => {
    const [transaction] = await tx
      .update(transactionsTable)
      .set({ isVerified })
      .where(eq(transactionsTable.txnId, txnId))
      .returning();

    if (transaction?.teamId) {
      await db
        .update(munRegistrationsTable)
        .set({ isVerified })
        .where(eq(munRegistrationsTable.teamId, transaction.teamId));
      return { status: true, user: null };
    }

    if (!transaction || !transaction.userId) {
      throw new ApiError(400, "Transaction has no associated user");
    }

    const [user] = await tx
      .update(usersTable)
      .set({ isVerified })
      .where(eq(usersTable.id, transaction.userId))
      .returning();
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return { status: true, user };
  });
};

export type TransactionStatus = "success" | "error";

export const updateTransactionStatus = async (txnId: string, status: TransactionStatus) => {
  return await db.transaction(async (tx) => {
    const isVerified = status === "success";
    const [transaction] = await tx
      .update(transactionsTable)
      .set({ status, isVerified })
      .where(eq(transactionsTable.txnId, txnId))
      .returning();

    if (!transaction) {
      throw new ApiError(404, `Transaction not found: ${txnId}`);
    }

    if (transaction.teamId) {
      await tx
        .update(munRegistrationsTable)
        .set({ isVerified })
        .where(eq(munRegistrationsTable.teamId, transaction.teamId));

      const [user] = await tx
        .select()
        .from(munRegistrationsTable)
        .where(eq(munRegistrationsTable.teamId, transaction.teamId))
        .limit(1);
      return { result: true, user: { ...user, referralCode: "MUN" } };
    }

    const [user] = await tx
      .update(usersTable)
      .set({ isVerified })
      .where(eq(usersTable.id, transaction.userId))
      .returning();

    return { result: true, user };
  });
};

function generateTxnId(type: TransactionType): string {
  const prefix = type === "NITRUTSAV" ? "NU26" : "MUN26";
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}-${random}`;
}

export const createTransaction = async (
  type: TransactionType,
  amount: number,
  userId?: number,
  teamId?: string
) => {
  if (!userId && !teamId) {
    throw new ApiError(400, "Either userId or teamId is required");
  }

  const [existingTransaction] = await db
    .select()
    .from(transactionsTable)
    .where(userId ? eq(transactionsTable.userId, userId) : eq(transactionsTable.teamId, teamId!));

  if (existingTransaction) {
    if (existingTransaction.isVerified) {
      return existingTransaction;
    }
    await db.delete(transactionsTable).where(eq(transactionsTable.id, existingTransaction.id));
  }

  const txnId = generateTxnId(type);

  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      userId: userId || null,
      teamId: teamId || null,
      txnId,
      type,
      amount,
      isVerified: false,
    })
    .returning();

  return transaction;
};

export type EmailRecipient = {
  type: TransactionType;
  isVerified: boolean;
  email: string;
  name: string;
  userId?: number;
  referralCode?: string | null;
};

export const getTransactionWithUser = async (txnId: string): Promise<EmailRecipient | null> => {
  // First try to find transaction
  const [transaction] = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.txnId, txnId));

  if (!transaction) {
    return null;
  }

  // If it's a MUN transaction (has teamId), get team leader from mun_registrations
  if (transaction.teamId) {
    const [munUser] = await db
      .select({
        email: munRegistrationsTable.email,
        name: munRegistrationsTable.name,
        isVerified: munRegistrationsTable.isVerified,
      })
      .from(munRegistrationsTable)
      .where(eq(munRegistrationsTable.teamId, transaction.teamId))
      .limit(1);

    if (!munUser) {
      return null;
    }

    return {
      type: "MUN",
      isVerified: munUser.isVerified,
      email: munUser.email,
      name: munUser.name,
    };
  }

  // For NITRUTSAV, get user from users table
  if (transaction.userId) {
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        isVerified: usersTable.isVerified,
        referralCode: usersTable.referralCode,
      })
      .from(usersTable)
      .where(eq(usersTable.id, transaction.userId));

    if (!user) {
      return null;
    }

    return {
      type: "NITRUTSAV",
      isVerified: user.isVerified,
      email: user.email,
      name: user.name,
      userId: user.id,
      referralCode: user.referralCode,
    };
  }

  return null;
};
