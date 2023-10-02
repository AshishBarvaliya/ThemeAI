import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { randomUUID } from "crypto";
import db from "@/db";
import { users as usersSchema, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

const VERIFICATION_MAIL_LIMIT = parseInt(
  process.env.VERIFICATION_MAIL_LIMIT || "0"
);
const EMAIL_LINK_EXPIRY = parseInt(process.env.EMAIL_LINK_EXPIRY || "0");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    if (session?.user.id) {
      const user = await db.query.users.findFirst({
        where: eq(usersSchema.id, session?.user.id),
        columns: {
          isActived: true,
        },
        with: {
          verificationTokens: true,
        },
      });

      if (user?.isActived) {
        return res.status(404).json({ error: "User is already verified" });
      }

      if (user?.verificationTokens.length === VERIFICATION_MAIL_LIMIT) {
        return res
          .status(404)
          .json({ error: "Verification mail limit reached" });
      }

      try {
        await db.insert(verificationTokens).values({
          id: createId(),
          userId: session?.user.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
          expiresAt: new Date(new Date().getTime() + 60000 * EMAIL_LINK_EXPIRY),
        });

        // TODO: sending mail logic

        return res
          .status(201)
          .json({ messsage: "Verification mail has been sent" });
      } catch (error) {
        res.status(500).json({ error: "Failed to send mail" });
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
