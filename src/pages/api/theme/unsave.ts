import { NextApiRequest, NextApiResponse } from "next";
import { eq, and } from "drizzle-orm";
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
          .update(usersToSavedThemes)
          .set({
            status: "N",
          })
          .where(
            and(
              eq(usersToSavedThemes.themeId, themeId),
              eq(usersToSavedThemes.userId, session.user.id)
            )
          );

        return res
          .status(202)
          .json({ unsaved: true, themeId, userId: session.user.id });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred when unsaving the theme." });
      }
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
