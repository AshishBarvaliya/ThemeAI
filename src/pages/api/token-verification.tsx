import db from "@/db";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import {
  resetPasswords as resetPasswordsSchema,
  users as usersSchema,
} from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = (await req.query.token) as string;

    if (!token) {
      return res.status(400).json({ error: "token required" });
    }

    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(resetPasswordsSchema.token, token),
      columns: {
        token: true,
        expiresAt: true,
      },
      with: {
        user: {
          columns: {
            id: true,
            isActived: true,
          },
        },
      },
    });

    if (!verificationToken) {
      return res.redirect("/themes?verify=0&error=invalid");
    }

    if (verificationToken.user.isActived) {
      return res.redirect("/themes?verify=0&error=verified");
    }

    if (verificationToken.expiresAt < new Date()) {
      return res.redirect("/themes?verify=0&error=expired");
    }

    try {
      await db
        .update(usersSchema)
        .set({
          isActived: true,
        })
        .where(eq(usersSchema.id, verificationToken.user.id));

      return res.redirect("/themes?verify=1");
    } catch (error) {
      res.status(500).json({ error: "Failed to verify token" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
