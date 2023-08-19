import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, themeId } = req.body;
    if (!userId || !themeId) {
      return res.status(400).json({ error: "userId and themeId are required" });
    }
    try {
      const existingLike = await prisma.userLikeTheme.findUnique({
        where: { userId_themeId: { userId, themeId } },
      });

      if (existingLike) {
        await prisma.userLikeTheme.delete({
          where: { userId_themeId: { userId, themeId } },
        });
        res.status(202).json({ like: existingLike });
      } else {
        const like = await prisma.userLikeTheme.create({
          data: { userId, themeId },
        });
        res.status(201).json({ like });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred when liking the theme." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
