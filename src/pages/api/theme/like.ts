import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/db";
import { usersToLikedThemes } from "@/db/schema";

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
          .insert(usersToLikedThemes)
          .values({
            userId: session.user.id,
            themeId,
            status: "F",
          })
          .onConflictDoUpdate({
            target: [usersToLikedThemes.userId, usersToLikedThemes.themeId],
            set: {
              status: "P",
            },
          });

        res.status(201).json({ liked: true, themeId, userId: session.user.id });

        // setTimeout(async () => {
        //   const upsertLike = await prisma.userLikeTheme.findUnique({
        //     where: {
        //       userId_themeId: { userId: session.user.id, themeId },
        //     },
        //     select: {
        //       status: true,
        //       theme: {
        //         select: {
        //           userId: true,
        //         },
        //       },
        //     },
        //   });
        //   if (
        //     session.user.id !== upsertLike?.theme.userId &&
        //     upsertLike?.status === "F"
        //   ) {
        //     await prisma.user.update({
        //       where: { id: upsertLike.theme.userId },
        //       data: {
        //         experience: { increment: 15 },
        //       },
        //     });
        //     await prisma.notification.create({
        //       data: {
        //         recipientId: upsertLike.theme.userId,
        //         read: false,
        //         type: "LIKE",
        //         notifierId: session.user.id,
        //         themeId,
        //       },
        //     });
        //   }
        // }, 0);
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
