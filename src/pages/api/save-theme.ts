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
        const existingSave = await prisma.userSaveTheme.findUnique({
          where: { userId_themeId: { userId: session.user.id, themeId } },
        });

        if (existingSave) {
          await prisma.userSaveTheme.delete({
            where: { userId_themeId: { userId: session.user.id, themeId } },
          });
          res.status(202).json({ save: existingSave });
        } else {
          const theme = await prisma.theme.findUnique({
            where: { id: themeId as string },
            select: {
              id: true,
              userId: true,
            },
          });

          if (!theme) {
            return res.status(404).json({ error: "Theme not found" });
          }

          const save = await prisma.userSaveTheme.create({
            data: { userId: session.user.id, themeId },
          });

          if (session.user.id !== theme.userId) {
            await prisma.notification.create({
              data: {
                recipientId: theme.userId,
                read: false,
                type: "SAVE",
                notifierId: session.user.id,
                themeId,
              },
            });
          }

          res.status(201).json({ save });
        }
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred when saving the theme." });
      }
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
