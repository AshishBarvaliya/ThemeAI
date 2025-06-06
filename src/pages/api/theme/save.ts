import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/db";
import { usersToSavedThemes } from "@/db/schema";
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
        return res.status(400).json({ error: "Missing required fields" });
      }
      try {
        const upsertSave = await db
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
          })
          .returning({
            themeId: usersToSavedThemes.themeId,
            status: usersToSavedThemes.status,
          });

        res.status(201).json({ saved: true, themeId, userId: session.user.id });

        setTimeout(async () => {
          await sendLikeSaveNotification({
            upsertItem: upsertSave,
            sessionId: session.user.id,
            type: "SAVE",
          });
        }, 0);
      } catch (error) {
        res.status(500).json({ error: "Failed to save theme" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
