import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"DeployUp Contact" <${process.env.GMAIL_USER}>`,
      to: "deployup.co@gmail.com",
      replyTo: email,
      subject: `[DeployUp] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #6b7280; font-size: 14px; margin-top: 0;">via deployup.in</p>
          <hr style="border: 1px solid #e5e7eb; margin: 16px 0;" />
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 100px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1e40af;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Subject</td>
              <td style="padding: 8px 0; color: #111827;">${subject}</td>
            </tr>
          </table>
          <hr style="border: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #6b7280; font-size: 13px; margin-bottom: 6px;">Message</p>
          <p style="color: #111827; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
