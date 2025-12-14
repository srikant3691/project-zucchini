import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updatePaymentStatus } from "@repo/firebase-config";

export interface VerifyBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  userDocumentId: string;
}

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userDocumentId,
    }: VerifyBody = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required parameters", success: false },
        { status: 400 }
      );
    }

    if (!userDocumentId) {
      return NextResponse.json(
        { error: "User document ID is required", success: false },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET as string;
    if (!secret) {
      return NextResponse.json({ error: "Razorpay secret not found" }, { status: 400 });
    }

    const HMAC = crypto.createHmac("sha256", secret);
    HMAC.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = HMAC.digest("hex");

    if (generatedSignature === razorpay_signature) {
      try {
        const result = await updatePaymentStatus(userDocumentId, "razorpay", {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        });

        return NextResponse.json({
          message: "Payment verified successfully",
          success: true,
          data: result,
        });
      } catch (firebaseError) {
        console.error("Firebase update error:", firebaseError);
        return NextResponse.json(
          {
            error: "Payment verified but failed to update database",
            success: false,
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ error: "Invalid signature", success: false }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "An error occurred", success: false }, { status: 500 });
  }
}
