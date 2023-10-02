import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/db";
import { usersToSavedThemes } from "@/db/schema";

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
        await db
          .insert(usersToSavedThemes)
          .values({
            userId: session.user.id,
            themeId,
            status: "F",
          })
          .onConflictDoUpdate({
            target: [usersToSavedThemes.userId, usersToSavedThemes.themeId],
            set: {
              status: "P",
            },
          });

        res.status(201).json({ saved: true, themeId, userId: session.user.id });

        // setTimeout(async () => {
        //   if (
        //     session.user.id !== upsertSave.theme.userId &&
        //     upsertSave.status === "F"
        //   ) {
        //     await prisma.user.update({
        //       where: { id: upsertSave.theme.userId },
        //       data: {
        //         experience: { increment: 15 },
        //       },
        //     });
        //     await prisma.notification.create({
        //       data: {
        //         recipientId: upsertSave.theme.userId,
        //         read: false,
        //         type: "SAVE",
        //         notifierId: session.user.id,
        //         themeId,
        //       },
        //     });
        //   }
        // }, 0);
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
