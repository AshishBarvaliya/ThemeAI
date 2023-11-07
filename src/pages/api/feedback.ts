import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db";
import { createId } from "@paralleldrive/cuid2";
import { feedbackTheme } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const {
      color_1,
      color_1_reason,
      color_2,
      color_2_reason,
      color_3,
      color_3_reason,
      color_4,
      color_4_reason,
      prompt,
      isDark,
      feedback,
    } = req.body;
    if (
      !color_1 ||
      !color_1_reason ||
      !color_2 ||
      !color_2_reason ||
      !color_3 ||
      !color_3_reason ||
      !color_4 ||
      !color_4_reason ||
      !prompt ||
      !feedback
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const entry = await db
        .insert(feedbackTheme)
        .values({
          id: createId(),
          color_1,
          color_1_reason,
          color_2,
          color_2_reason,
          color_3,
          color_3_reason,
          color_4,
          color_4_reason,
          prompt,
          isDark,
          userId: session.user.id,
          feedbackType: feedback,
        })
        .returning({ id: feedbackTheme.id });

      res.status(201).json({
        ...entry,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
