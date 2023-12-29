import { getEmailHtml } from "@/constants/email";
import path from "path";
import nodemailer from "nodemailer";

const host = process.env.MAIL_SMTP_HOST;
const port = Number(process.env.MAIL_SMTP_PORT || "587");
const user = process.env.MAIL_SMTP_USER;
const pass = process.env.MAIL_SMTP_PASS;

if (!host || !port || !user || !pass) {
  throw new Error("Missing SMTP credentials");
}

let transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

export const sendEmail = (
  type: "reset-password" | "activation" | "welcome",
  { email, token, name }: { email: string; token: string; name: string }
) => {
  const inlineImage = {
    filename: "logo.png",
    path: path.join(process.cwd(), "public", "logo.png"),
    cid: "logo.png",
  };

  return transporter.sendMail({
    from: `ThemeAI.io ${user}`,
    to: email,
    subject:
      type === "reset-password"
        ? "Reset your password"
        : "Verify your ThemeAI account",
    html: getEmailHtml(type, { token, name }),
    attachments: [inlineImage],
  });
};
