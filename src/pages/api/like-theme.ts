import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (session) {
      const { themeId } = req.body;
      if (!themeId) {
        return res.status(400).json({ error: "themeId is required" });
      }
      try {
        const existingLike = await prisma.userLikeTheme.findUnique({
          where: { userId_themeId: { userId: session.user.id, themeId } },
        });

        if (existingLike) {
          await prisma.userLikeTheme.delete({
            where: { userId_themeId: { userId: session.user.id, themeId } },
          });
          res.status(202).json({ like: existingLike });
        } else {
          const like = await prisma.userLikeTheme.create({
            data: { userId: session.user.id, themeId },
          });
          res.status(201).json({ like });
        }
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred when liking the theme." });
      }
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}