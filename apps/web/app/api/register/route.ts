import { NextRequest } from "next/server";
import { registerUser } from "@repo/database";
import { handleResponse, handleApiError } from "@repo/shared-utils/src/api-utils";
import { type Registration } from "@repo/shared-types";

interface RegisterBody extends Registration {
  firebaseUid: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterBody = await request.json();

    const { firebaseUid, ...userData } = body;

    if (!firebaseUid) {
      return handleApiError(new Error("Firebase UID is required"), "Authentication required");
    }

    const result = await registerUser(userData, firebaseUid);

    return handleResponse(result, 201);
  } catch (error) {
    return handleApiError(error, "Registration failed");
  }
}
