import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { randomUUID } from "crypto";

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
      const user = await prisma.user.findUnique({
        where: {
          id: session?.user.id,
        },
        select: {
          isActived: true,
          _count: {
            select: {
              verificationTokens: true,
            },
          },
        },
      });

      if (user?.isActived) {
        return res.status(404).json({ error: "User is already verified" });
      }

      if (user?._count?.verificationTokens === VERIFICATION_MAIL_LIMIT) {
        return res
          .status(404)
          .json({ error: "Verification mail limit reached" });
      }

      try {
        await prisma.verificationToken.create({
          data: {
            userId: session?.user.id,
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
            expiresAt: new Date(
              new Date().getTime() + 60000 * EMAIL_LINK_EXPIRY
            ),
          },
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