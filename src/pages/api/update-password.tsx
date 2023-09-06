import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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
        const currentuser = await prisma.user.findUnique({
          where: {
            id: session?.user?.id,
          },
          select: {
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

        const user = await prisma.user.update({
          where: {
            id: session?.user?.id,
          },
          data: {
            hashedPassword: hashedPassword,
          },
          select: {
            id: true,
            name: true,
            isActived: true,
          },
        });

        return res.status(200).json({ user });
      } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
      }
    }

    const resetPasswordToken = await prisma.resetPassword.findUnique({
      where: { token },
      select: {
        expiresAt: true,
        user: {
          select: {
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
      const user = await prisma.user.update({
        where: {
          id: resetPasswordToken.user?.id,
        },
        data: {
          hashedPassword: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          isActived: true,
        },
      });

      return res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
