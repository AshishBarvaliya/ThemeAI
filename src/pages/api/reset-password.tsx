import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import db from "@/db";
import {
  accounts as accountsSchema,
  resetPasswords,
  users as usersSchema,
} from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { sendEmail } from "@/config/mail";

const FORGOT_PASSWORD_MAIL_LIMIT = parseInt(
  process.env.FORGOT_PASSWORD_MAIL_LIMIT || "0"
);
const EMAIL_LINK_EXPIRY = parseInt(process.env.EMAIL_LINK_EXPIRY || "0");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (email) {
      const user = await db.query.users.findFirst({
        where: eq(usersSchema.email, email),
        columns: {
          id: true,
          name: true,
        },
        with: {
          resetPasswords: true,
        },
      });

      if (!user) {
        return res.status(201).json({
          messsage:
            "Reset password mail has been sent. The reset password link is valid for 60 minutes.",
        });
      }

      const googleUser = await db.query.accounts.findFirst({
        where: eq(accountsSchema.userId, user.id),
        columns: {
          provider: true,
        },
      });

      if (googleUser?.provider === "google") {
        return res
          .status(404)
          .json({ error: "Reset password with Google account is not allowed" });
      }

      if (user?.resetPasswords.length === FORGOT_PASSWORD_MAIL_LIMIT) {
        return res.status(404).json({ error: "Reset password limit reached" });
      }

      try {
        const newToken = `${randomUUID()}${randomUUID()}`.replace(/-/g, "");
        await db.insert(resetPasswords).values({
          id: createId(),
          userId: user.id,
          token: newToken,
          expiresAt: new Date(new Date().getTime() + 60000 * EMAIL_LINK_EXPIRY),
        });

        try {
          await sendEmail("reset-password", {
            email,
            token: newToken,
            name: user.name,
          });

          return res.status(201).json({
            messsage:
              "Reset password mail has been sent. The reset password link is valid for 60 minutes.",
          });
        } catch {
          return res
            .status(500)
            .json({ error: "Failed to send reset password mail" });
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to send reset password mail" });
      }
    } else {
      return res.status(400).json({ error: "Missing required fields" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
