type EmailType = "nitrutsav" | "mun";

interface EmailTemplateProps {
  participantName: string;
  registrationId?: string;
  referralCode?: string;
  type?: EmailType;
  instagramLink?: string;
  whatsappLink?: string;
}

const MUN_INSTAGRAM_LINK = "https://www.instagram.com/nitrimun?igsh=eXQ4enM0c3c5aW0x";
const MUN_WHATSAPP_LINK = "https://chat.whatsapp.com/GAI3MlRX4TN5dyP6ZyFzlX";
const MUN_EMAIL = "secretariat.nitrimun2026@gmail.com";
const MUN_PHONE = "+91 8303963026";

const NITRUTSAV_INSTAGRAM_LINK = "https://www.instagram.com/nitrutsav_nitr?igsh=dTZvbWUzeGRvMmRw";
const NITRUTSAV_WHATSAPP_LINK = "https://whatsapp.com/channel/0029Vb7VdBI4Crfn867OO73q";

export function getEmailTemplate({
  participantName,
  registrationId,
  referralCode,
  type = "nitrutsav",
  instagramLink,
  whatsappLink,
}: EmailTemplateProps): string {
  const isMun = type === "mun";

  const finalInstagramLink =
    instagramLink ?? (isMun ? MUN_INSTAGRAM_LINK : NITRUTSAV_INSTAGRAM_LINK);
  const finalWhatsappLink = whatsappLink ?? (isMun ? MUN_WHATSAPP_LINK : NITRUTSAV_WHATSAPP_LINK);

  const headerTitle = "NITRUTSAV '26";
  const teamName = "Team NITRUTSAV '26";

  const eventName = isMun ? "NITRIMUN '26" : "NITRUTSAV '26";

  const registrationIdSection =
    !isMun && registrationId
      ? `
        <!-- Registration ID Box -->
        <div style="background-color: #1a365d; border-radius: 10px; padding: 25px; text-align: center; margin: 30px 0;">
          <p style="color: #ffffff; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px;">
            Your Registration ID
          </p>
          <p style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: 3px;">
            ${registrationId}
          </p>
        </div>
  `
      : "";

  // Referral Code section (only for NITRUTSAV)
  const referralCodeSection =
    !isMun && referralCode
      ? `
        <!-- Referral Code Block -->
        <div style="background-color: #f0f4f8; border: 1px solid #1a365d; border-radius: 10px; padding: 25px; text-align: center; margin: 20px 0;">
          <p style="color: #1a365d; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px;">
            Your Referral Code
          </p>
          <p style="color: #1a365d; font-size: 28px; font-weight: 700; margin: 0 0 15px; letter-spacing: 3px;">
            ${referralCode}
          </p>
          <p style="color: #1a365d; font-size: 13px; margin: 0; line-height: 1.6;">
            Share this code with your friends! When they register using your code, both of you get
            exclusive benefits and rewards.
          </p>
        </div>
  `
      : "";

  // Accommodation section (only for NITRUTSAV)
  const accommodationSection = !isMun
    ? `
        <!-- Accommodation Notice -->
        <div style="background-color: #f0f4f8; border: 1px solid #1a365d; border-radius: 8px; padding: 20px; margin: 25px 0;">
          <p style="color: #1a365d; font-size: 14px; margin: 0; line-height: 1.6;">
            <strong>⚠️ Important Information Regarding Accommodation:</strong>
            <br />
            Please note that accommodation allotment will be provided strictly at the time of
            offline registration upon your arrival at the campus.
          </p>
        </div>
  `
    : "";

  // Confirmation message based on type
  const confirmationMessage = isMun
    ? "This email confirms that your registration for NITRIMUN '26 has been successfully received."
    : "This email confirms that your registration has been successfully received. Please save your unique Registration ID for all future reference and on-ground verification.";

  // MUN contact details section
  const munContactSection = isMun
    ? `
        <!-- MUN Contact Details -->
        <div style="background-color: #f0f4f8; border: 1px solid #1a365d; border-radius: 10px; padding: 25px; margin: 20px 0;">
          <h3 style="color: #1a365d; font-size: 16px; margin: 0 0 15px; font-weight: 600;">
            📞 Contact Us
          </h3>
          <p style="color: #1a365d; font-size: 14px; margin: 0 0 10px;">
            <strong>Email:</strong> <a href="mailto:${MUN_EMAIL}" style="color: #1a365d;">${MUN_EMAIL}</a>
          </p>
          <p style="color: #1a365d; font-size: 14px; margin: 0;">
            <strong>Phone:</strong> <a href="tel:${MUN_PHONE.replace(/\s/g, "")}" style="color: #1a365d;">${MUN_PHONE}</a>
          </p>
        </div>
  `
    : "";

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">
      <!-- Header -->
      <div style="background-color: #1a365d; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
          ${headerTitle}
        </h1>
        <p style="color: #ffffff; margin: 10px 0 0; font-size: 14px;">
          Registration Confirmed
        </p>
      </div>

      <!-- Body -->
      <div style="background-color: #ffffff; padding: 40px 30px;">
        <p style="color: #1a365d; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
          Dear <strong>${participantName}</strong>,
        </p>

        <p style="color: #1a365d; font-size: 15px; line-height: 1.8; margin: 0 0 25px;">
          Thank you for registering for <strong>${eventName}</strong>. We are excited to have
          you join us for the ${isMun ? "Model United Nations conference" : "fest"}!
        </p>

        <p style="color: #1a365d; font-size: 15px; line-height: 1.8; margin: 0 0 25px;">
          ${confirmationMessage}
        </p>

        ${registrationIdSection}
        ${referralCodeSection}
        ${accommodationSection}
        ${munContactSection}

        <!-- Stay Updated Section -->
        <div style="margin: 30px 0;">
          <h3 style="color: #1a365d; font-size: 16px; margin: 0 0 15px; font-weight: 600;">
            📢 Stay Updated
          </h3>
          <p style="color: #1a365d; font-size: 14px; line-height: 1.8; margin: 0 0 15px;">
            For the latest announcements, schedule changes, and event highlights, please stay
            connected with us:
          </p>

          <!-- Social Links -->
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <a href="${finalInstagramLink}" style="display: inline-flex; align-items: center; gap: 8px; background-color: #1a365d; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">
              ${isMun ? "Follow NITRIMUN on Instagram" : "Follow on Instagram"}
            </a>
            <div style="width: 10px;" />
            <a href="${finalWhatsappLink}" style="display: inline-flex; align-items: center; gap: 8px; background-color: #1a365d; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">
              ${isMun ? "Join WhatsApp Group" : "Join WhatsApp Channel"}
            </a>
          </div>
        </div>

        <p style="color: #1a365d; font-size: 15px; line-height: 1.8; margin: 30px 0 0;">
          We look forward to seeing you at NIT Rourkela!
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #1a365d; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
        <p style="color: #ffffff; font-size: 14px; margin: 0 0 5px;">
          Best regards,
        </p>
        <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">
          ${teamName}
        </p>
        <p style="color: #ffffff; font-size: 12px; margin: 15px 0 0;">
          NIT Rourkela, Odisha, India
        </p>
      </div>
    </div>
  `;
}
