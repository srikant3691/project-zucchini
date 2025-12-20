import { NextRequest } from "next/server";
import { getMunRegistrationFee, getMunUserByFirebaseUid, getTeamMembers } from "@repo/database";
import { handleResponse, handleApiError, requireAuth } from "@repo/shared-utils/server";
import { createOrder } from "@/lib/razorpay";
import { munAmount } from "@/config";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    const { studentType, committeeChoice } = await request.json();

    if (!studentType || !committeeChoice) {
      return handleApiError(
        new Error("Student type and committee choice are required"),
        "Invalid request"
      );
    }

    let amount: number;

    if (committeeChoice === "MOOT_COURT") {
      const registration = await getMunUserByFirebaseUid(auth.uid);

      if (!registration || !registration.teamId) {
        return handleApiError(new Error("Team registration not found"), "Registration not found");
      }

      const teamMembers = await getTeamMembers(registration.teamId);
      const nonNitrCount = teamMembers.filter((member) => !member.isNitrStudent).length;

      const baseFee = studentType === "COLLEGE" ? munAmount.college : munAmount.school;
      amount = baseFee * nonNitrCount;
    } else {
      amount = getMunRegistrationFee(studentType, committeeChoice);
    }

    const order = await createOrder({ amount, receipt: `mun#${Date.now()}` });
    return handleResponse({ orderId: order.id, amount });
  } catch (error) {
    return handleApiError(error, "Failed to create MUN order");
  }
}
