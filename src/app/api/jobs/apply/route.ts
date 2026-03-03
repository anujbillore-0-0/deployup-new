import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ROLE_LABELS: Record<string, string> = {
  "ai-fullstack-intern": "AI and Fullstack Engineer Intern",
  "android-intern": "Android Development Intern",
};

const LEGAL_LABELS: Record<string, string> = {
  yes: "Yes, legally authorized to work in India",
  no: "No, not legally authorized to work in India",
};

const SPONSORSHIP_LABELS: Record<string, string> = {
  no: "No, will not require sponsorship",
  yes: "Yes, will require sponsorship",
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const role = formData.get("role") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const batch = formData.get("batch") as string;
    const gender = formData.get("gender") as string;
    const address = formData.get("address") as string;
    const skills = formData.get("skills") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const projectLink = formData.get("projectLink") as string;
    const whyJoin = formData.get("whyJoin") as string;
    const legallyAuthorized = formData.get("legallyAuthorized") as string;
    const requiresSponsorship = formData.get("requiresSponsorship") as string;
    const resumeFile = formData.get("resume") as File | null;

    // Basic validation
    if (!role || !name || !email || !batch || !gender || !address || !skills || !projectDescription || !whyJoin || !legallyAuthorized || !requiresSponsorship || !resumeFile) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    if (resumeFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Resume must be a PDF file." }, { status: 400 });
    }

    if (resumeFile.size > 1024 * 1024) {
      return NextResponse.json({ error: "Resume must be under 1 MB." }, { status: 400 });
    }

    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const roleLabel = ROLE_LABELS[role] ?? role;
    const safeProjectLink = projectLink
      ? `<a href="${projectLink}" style="color:#4f46e5;">${projectLink}</a>`
      : "<em style='color:#9ca3af;'>Not provided</em>";

    await transporter.sendMail({
      from: `"DeployUp Careers" <${process.env.GMAIL_USER}>`,
      to: "deployup.co@gmail.com",
      replyTo: email,
      subject: `[DeployUp Careers] New Application: ${roleLabel} - ${name}`,
      attachments: [
        {
          filename: `${name.replace(/\s+/g, "_")}_Resume.pdf`,
          content: resumeBuffer,
          contentType: "application/pdf",
        },
      ],
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; background: #f9fafb; padding: 24px; border-radius: 12px;">
          
          <div style="background: #fff; border-radius: 10px; padding: 28px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: #4f46e5; display: flex; align-items: center; justify-content: center;">
                <span style="color: #fff; font-weight: 900; font-size: 14px;">D</span>
              </div>
              <div>
                <h1 style="margin: 0; font-size: 18px; font-weight: 800; color: #111827;">DeployUp Careers</h1>
                <p style="margin: 0; font-size: 12px; color: #6b7280;">New Job Application Received</p>
              </div>
            </div>

            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #1e40af; font-weight: 600;">Position Applied For</p>
              <p style="margin: 4px 0 0; font-size: 16px; color: #1e3a8a; font-weight: 800;">${roleLabel}</p>
            </div>

            <h2 style="font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">Personal Information</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; width: 160px; font-weight: 500;">Full Name</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #4f46e5;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Graduation Batch</td>
                <td style="padding: 10px 0; color: #111827;">Batch of ${batch}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Gender</td>
                <td style="padding: 10px 0; color: #111827;">${gender}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Address</td>
                <td style="padding: 10px 0; color: #111827;">${address.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>

            <h2 style="font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">Professional Background</h2>
            
            <p style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;">Skills</p>
            <p style="font-size: 14px; color: #111827; line-height: 1.7; margin-bottom: 18px; padding: 12px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">${skills.replace(/\n/g, "<br>")}</p>

            <p style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;">Project Description</p>
            <p style="font-size: 14px; color: #111827; line-height: 1.7; margin-bottom: 8px; padding: 12px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">${projectDescription.replace(/\n/g, "<br>")}</p>
            <p style="font-size: 13px; color: #6b7280; margin-bottom: 18px;">Project Link: ${safeProjectLink}</p>

            <p style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;">Why DeployUp?</p>
            <p style="font-size: 14px; color: #111827; line-height: 1.7; margin-bottom: 24px; padding: 12px; background: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">${whyJoin.replace(/\n/g, "<br>")}</p>

            <h2 style="font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">Legal Authorization</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Authorized to Work in India</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 600;">${LEGAL_LABELS[legallyAuthorized] ?? legallyAuthorized}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500; vertical-align: top;">Requires Sponsorship</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 600;">${SPONSORSHIP_LABELS[requiresSponsorship] ?? requiresSponsorship}</td>
              </tr>
            </table>
          </div>

          <div style="background: #fff; border-radius: 10px; padding: 16px 20px; border: 1px solid #e5e7eb; display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: #fee2e2; display: flex; align-items: center; justify-content: center; shrink: 0;">
              <span style="font-weight: 800; font-size: 12px; color: #dc2626;">PDF</span>
            </div>
            <div>
              <p style="margin: 0; font-size: 13px; font-weight: 600; color: #111827;">Resume Attached</p>
              <p style="margin: 2px 0 0; font-size: 12px; color: #6b7280;">${name.replace(/\s+/g, "_")}_Resume.pdf</p>
            </div>
          </div>

          <p style="text-align: center; font-size: 11px; color: #9ca3af; margin-top: 16px;">
            This application was submitted via deployup.in/jobs/apply
          </p>
        </div>
      `,
    });

    // Send confirmation email to applicant
    await transporter.sendMail({
      from: `"DeployUp Careers" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your Application to DeployUp Has Been Received`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 540px; margin: 0 auto; padding: 24px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 24px;">
            <div style="width: 32px; height: 32px; border-radius: 7px; background: #4f46e5; display: flex; align-items: center; justify-content: center;">
              <span style="color: #fff; font-weight: 900; font-size: 13px;">D</span>
            </div>
            <span style="font-size: 18px; font-weight: 800; color: #111827;">Deploy<span style="color: #4f46e5;">Up</span></span>
          </div>
          <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin-bottom: 12px;">We have received your application!</h2>
          <p style="font-size: 14px; color: #374151; line-height: 1.7; margin-bottom: 8px;">Hi ${name},</p>
          <p style="font-size: 14px; color: #374151; line-height: 1.7; margin-bottom: 16px;">
            Thank you for applying for the <strong>${roleLabel}</strong> position at DeployUp. We have successfully received your application and our team will review it carefully.
          </p>
          <p style="font-size: 14px; color: #374151; line-height: 1.7; margin-bottom: 24px;">
            If your profile matches our requirements, we will reach out to you within 7 business days to discuss next steps. In the meantime, feel free to explore our website at <a href="https://deployup.in" style="color: #4f46e5;">deployup.in</a>.
          </p>
          <p style="font-size: 14px; color: #374151; line-height: 1.7; margin-bottom: 4px;">Best regards,</p>
          <p style="font-size: 14px; color: #374151; font-weight: 700;">The DeployUp Team</p>
          <hr style="border: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="font-size: 11px; color: #9ca3af; text-align: center;">DeployUp &bull; deployup.in &bull; deployup.co@gmail.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Job application API error:", err);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
