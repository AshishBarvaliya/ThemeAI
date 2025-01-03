import { NextApiRequest, NextApiResponse } from "next";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { usersToLikedThemes } from "@/db/schema";
import db from "@/db";

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
        await db
          .update(usersToLikedThemes)
          .set({
            status: "N",
          })
          .where(
            and(
              eq(usersToLikedThemes.themeId, themeId),
              eq(usersToLikedThemes.userId, session.user.id)
            )
          );

        return res
          .status(202)
          .json({ disliked: true, themeId, userId: session.user.id });
      } catch (error) {
        res.status(500).json({ error: "Failed to dislike theme" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
