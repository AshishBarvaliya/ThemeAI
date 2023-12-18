import Mailgun from "mailgun.js";
import FormData from "form-data";
import { getEmailHtml } from "@/constants/email";

const mailgun: any = new Mailgun(FormData as any);

const domain = process.env.MAILGUN_DOMAIN || "";
const apiKey = process.env.MAILGUN_API_KEY || "";

if (!domain || !apiKey) {
  throw new Error("Missing Mailgun credentials");
}

const client = mailgun.client({
  username: process.env.MAILGUN_USERNAME || "test",
  key: apiKey,
});

export const sendEmail = (
  type: "reset-password" | "activation" | "welcome",
  { email, token, name }: { email: string; token: string; name: string }
) => {
  const data = {
    from: "ThemeAI.io <contact@themeai.io>",
    to: email,
    subject:
      type === "reset-password"
        ? "Reset your password"
        : "Verify your ThemeAI account",
    html: getEmailHtml(type, { token, name }),
  };
  return client.messages.create(domain, data);
};
