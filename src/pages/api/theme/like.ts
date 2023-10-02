import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/db";
import { usersToLikedThemes } from "@/db/schema";
import { sendLikeSaveNotification } from "@/lib/api-helpers";

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
        const upsertLike = await db
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
          })
          .returning({
            themeId: usersToLikedThemes.themeId,
            status: usersToLikedThemes.status,
          });

        res.status(201).json({ liked: true, themeId, userId: session.user.id });

        setTimeout(async () => {
          await sendLikeSaveNotification({
            upsertItem: upsertLike,
            sessionId: session.user.id,
            type: "LIKE",
          });
        }, 0);
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
