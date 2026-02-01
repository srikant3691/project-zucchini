import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { updateTransactionStatus } from "@repo/database";
import { Resend } from "resend";
import { getEmailTemplate } from "@/components/email-template";

function verifyPayuHash(params: Record<string, string>, salt: string): boolean {
  const receivedHash = params.hash;

  const hashString = `${salt}|${params.status}||||||${params.udf5 || ""}|${params.udf4 || ""}|${params.udf3 || ""}|${params.udf2 || ""}|${params.udf1 || ""}|${params.email}|${params.firstname}|${params.productinfo}|${params.amount}|${params.txnid}|${params.key}`;

  const calculatedHash = createHash("sha512").update(hashString).digest("hex");

  return receivedHash === calculatedHash;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    const salt = process.env.PAYU_SALT;
    if (!salt) {
      return NextResponse.redirect(new URL("/failure?error=config", req.url), 303);
    }

    const isHashValid = verifyPayuHash(params, salt);

    if (!isHashValid) {
      return NextResponse.redirect(new URL("/failure?error=hash", req.url), 303);
    }

    const status = params.status?.toLowerCase();
    const origin = req.nextUrl.origin;

    if (params.txnid) {
      const { result, user } = await updateTransactionStatus(
        params.txnid,
        status === "success" ? "success" : "error"
      );
      if (user && result) {
        const resend = new Resend(process.env.RESEND_API_KEY!);
        resend.emails
          .send({
            from: "team@nitrutsav.in",
            to: user.email as string,
            subject: "🎉 You're Registered for NITRUTSAV '26",
            html: getEmailTemplate({
              participantName: user.name as string,
              registrationId: String(user.id),
              referralCode: user.referralCode!,
              type: params.txnid.includes("NU26") ? "nitrutsav" : "mun",
            }),
          })
          .catch((err) => console.error("Email send failed:", err));
      }
    }

    if (status === "success") {
      return NextResponse.redirect(
        new URL(`/success?txnid=${params.txnid}&mihpayid=${params.mihpayid}`, origin),
        303
      );
    } else {
      return NextResponse.redirect(
        new URL(
          `/failure?txnid=${params.txnid}&status=${status}&reason=${encodeURIComponent(params.field9 || "Payment failed")}`,
          origin
        ),
        303
      );
    }
  } catch (error) {
    console.error("PayU Callback Error:", error);
    return NextResponse.redirect(new URL("/failure?error=exception", req.url), 303);
  }
}
