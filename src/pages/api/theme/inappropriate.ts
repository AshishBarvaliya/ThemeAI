import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/db";
import { usersToInappropriateThemes } from "@/db/schema";

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
          .insert(usersToInappropriateThemes)
          .values({
            userId: session.user.id,
            themeId,
          })
          .onConflictDoNothing();

        res.status(201).json({
          markAsInappropriate: true,
          themeId,
          userId: session.user.id,
        });
      } catch (error) {
        res.status(500).json({
          error: "Failed to mark the theme as inappropriate",
        });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
