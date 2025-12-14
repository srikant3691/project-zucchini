import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../index";
import { handleError } from "@repo/shared-types";

export interface RazorpayDetails {
  orderId: string;
  paymentId: string;
  signature: string;
}

export type PaymentMethod = "qr" | "razorpay";
export const updatePaymentStatus = async (
  documentId: string,
  paymentMethod: PaymentMethod,
  razorpayDetails?: RazorpayDetails
) => {
  try {
    const userRef = doc(db, "users", documentId);

    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }

    const updateData: any = {
      isVerified: true,
      paymentMethod,
      verifiedAt: serverTimestamp(),
    };
    if (paymentMethod === "razorpay" && razorpayDetails) {
      updateData.razorpayDetails = {
        orderId: razorpayDetails.orderId,
        paymentId: razorpayDetails.paymentId,
        signature: razorpayDetails.signature,
        verifiedAt: serverTimestamp(),
      };
    }

    await updateDoc(userRef, updateData);

    return {
      success: true,
      message: "Payment verified successfully",
      documentId,
    };
  } catch (e) {
    handleError(e, "Failed to update payment status");
  }
};

export const getPaymentStatus = async (documentId: string) => {
  try {
    const userRef = doc(db, "users", documentId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }

    const data = userDoc.data();

    return {
      isVerified: data.isVerified || false,
      paymentMethod: data.paymentMethod || null,
      verifiedAt: data.verifiedAt || null,
      razorpayDetails: data.razorpayDetails || null,
    };
  } catch (e) {
    handleError(e, "Failed to get payment status");
  }
};
