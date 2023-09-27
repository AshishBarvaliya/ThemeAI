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
        const existingItem = await prisma.userUnappropriateTheme.findUnique({
          where: { userId_themeId: { userId: session.user.id, themeId } },
        });

        if (existingItem) {
          res.status(200).json({ item: existingItem });
        } else {
          const item = await prisma.userUnappropriateTheme.create({
            data: { userId: session.user.id, themeId },
          });

          res.status(201).json({ item });
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
