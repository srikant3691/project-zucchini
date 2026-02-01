import { NextRequest } from "next/server";
import { handleResponse, requireAuth } from "@repo/shared-utils/server";
import { handleError } from "@repo/shared-types";
import { getTransactionWithUser } from "@repo/database";
import { Resend } from "resend";
import { getEmailTemplate } from "@/components/email-template";

const RATE_LIMIT_MS = 5 * 60 * 1000; // 5 minutes
const emailSentTimestamps = new Map<string, number>();

function isRateLimited(txnid: string): boolean {
  const lastSent = emailSentTimestamps.get(txnid);
  if (!lastSent) return false;

  const elapsed = Date.now() - lastSent;
  return elapsed < RATE_LIMIT_MS;
}

function getRemainingCooldown(txnid: string): number {
  const lastSent = emailSentTimestamps.get(txnid);
  if (!lastSent) return 0;

  const elapsed = Date.now() - lastSent;
  const remaining = RATE_LIMIT_MS - elapsed;
  return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
}

function recordEmailSent(txnid: string): void {
  emailSentTimestamps.set(txnid, Date.now());

  const now = Date.now();
  for (const [key, timestamp] of emailSentTimestamps.entries()) {
    if (now - timestamp > RATE_LIMIT_MS) {
      emailSentTimestamps.delete(key);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth(req);

    const { txnid } = await req.json();

    if (!txnid) {
      return handleError(new Error("Transaction ID (txnid) is required"));
    }

    if (isRateLimited(txnid)) {
      const remaining = getRemainingCooldown(txnid);
      return handleError(
        new Error(`Please wait ${remaining} seconds before requesting another email.`)
      );
    }

    const recipient = await getTransactionWithUser(txnid);

    if (!recipient) {
      return handleError(new Error("Transaction or user not found"));
    }

    if (!recipient.isVerified) {
      return handleError(new Error("Payment not verified. Cannot send confirmation email."));
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const subject =
      recipient.type === "MUN"
        ? "🎉 You're Registered for NITRIMUN '26"
        : "🎉 You're Registered for NITRUTSAV '26";

    await resend.emails.send({
      from: "team@nitrutsav.in",
      to: recipient.email,
      subject,
      html: getEmailTemplate({
        participantName: recipient.name,
        registrationId: recipient.userId ? String(recipient.userId) : undefined,
        referralCode: recipient.referralCode ?? undefined,
        type: recipient.type === "MUN" ? "mun" : "nitrutsav",
      }),
    });

    recordEmailSent(txnid);

    return handleResponse({ success: true, message: "Email sent successfully" });
  } catch (error) {
    return handleError(error);
  }
}
