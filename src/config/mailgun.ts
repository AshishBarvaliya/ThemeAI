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
  type: "reset-password" | "activation",
  { email, token, name }: { email: string; token: string; name: string }
) => {
  if (type === "reset-password") {
    const data = {
      from: "ThemeAI.io <contact@themeai.io>",
      to: email,
      subject: "Reset your password",
      html: getEmailHtml("reset-password", { token, name }),
    };
    return client.messages.create(domain, data);
  }

  return new Error("Not implemented");
};
