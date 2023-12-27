import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import db from "@/db";
import { resetPasswords, users as usersSchema } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { sendEmail } from "@/config/mailgun";

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
          isActived: true,
        },
        with: {
          resetPasswords: true,
        },
      });

      if (!user) {
        return res
          .status(201)
          .json({ messsage: "Reset password mail has been sent" });
      }

      if (!user?.isActived) {
        return res.status(404).json({ error: "User is not verified" });
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

        await sendEmail("reset-password", {
          email,
          token: newToken,
          name: user.name,
        }).catch((error) => {
          console.error(error);
        });
        return res
          .status(201)
          .json({ messsage: "Reset password mail has been sent" });
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
