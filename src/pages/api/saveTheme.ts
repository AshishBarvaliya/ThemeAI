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
      const existingSave = await prisma.userSaveTheme.findUnique({
        where: { userId_themeId: { userId, themeId } },
      });

      if (existingSave) {
        await prisma.userSaveTheme.delete({
          where: { userId_themeId: { userId, themeId } },
        });
        res.status(202).json({ save: existingSave });
      } else {
        const save = await prisma.userSaveTheme.create({
          data: { userId, themeId },
        });
        res.status(201).json({ save });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred when saving the theme." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
