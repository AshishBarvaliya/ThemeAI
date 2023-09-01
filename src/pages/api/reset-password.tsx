import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

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
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          isActived: true,
          _count: {
            select: {
              resetPasswords: true,
            },
          },
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

      if (user?._count?.resetPasswords === FORGOT_PASSWORD_MAIL_LIMIT) {
        return res.status(404).json({ error: "Forgot password limit reached" });
      }

      try {
        await prisma.resetPassword.create({
          data: {
            userId: user.id,
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
            expiresAt: new Date(
              new Date().getTime() + 60000 * EMAIL_LINK_EXPIRY
            ),
          },
        });

        // TODO: sending mail logic

        return res
          .status(201)
          .json({ messsage: "Reset password mail has been sent" });
      } catch (error) {
        res.status(500).json({ error: "Failed to send mail" });
      }
    } else {
      return res.status(401).json({ error: "Email is required" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
