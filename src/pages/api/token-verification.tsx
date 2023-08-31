import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = (await req.query.token) as string;

    if (!token) {
      return res.status(400).json({ error: "token required" });
    }
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      select: {
        token: true,
        expiresAt: true,
        user: {
          select: {
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
      await prisma.user.update({
        where: { id: verificationToken.user.id },
        data: {
          isActived: new Date(),
        },
      });

      return res.redirect("/themes?verify=1");
    } catch (error) {
      res.status(500).json({ error: "Failed to verify token" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
