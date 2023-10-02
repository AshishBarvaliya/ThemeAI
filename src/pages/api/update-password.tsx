import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import db from "@/db";
import { eq } from "drizzle-orm";
import {
  resetPasswords as resetPasswordsSchema,
  users as usersSchema,
} from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "PUT") {
    const { currentpassword, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const token = (await req.query.token) as string;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!token) {
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!currentpassword) {
        return res.status(400).json({ error: "Current password is required" });
      }
      try {
        const currentuser = await db.query.users.findFirst({
          where: eq(usersSchema.email, session?.user?.email),
          columns: {
            hashedPassword: true,
          },
        });

        const passwordMatch = await bcrypt.compare(
          currentpassword,
          currentuser?.hashedPassword as string
        );

        if (!passwordMatch) {
          return res.status(400).json({ error: "Invalid current password" });
        }

        await db
          .update(usersSchema)
          .set({
            hashedPassword: hashedPassword,
          })
          .where(eq(usersSchema.id, session?.user?.id));

        return res.status(200).json({ message: "Password updated" });
      } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
      }
    }

    const resetPasswordToken = await db.query.resetPasswords.findFirst({
      where: eq(resetPasswordsSchema.token, token),
      columns: {
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

    if (!resetPasswordToken) {
      return res.status(400).json({ error: "Invalid token" });
    }

    if (resetPasswordToken.expiresAt < new Date()) {
      return res.status(400).json({ error: "Token expired" });
    }

    if (!resetPasswordToken.user.isActived) {
      return res.status(400).json({ error: "User is not verified" });
    }

    try {
      await db
        .update(usersSchema)
        .set({
          hashedPassword: hashedPassword,
        })
        .where(eq(usersSchema.id, resetPasswordToken?.user?.id));

      return res.status(200).json({ message: "Password updated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
