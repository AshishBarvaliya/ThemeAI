import { NextApiRequest, NextApiResponse } from "next";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/db";
import { usersToFollows } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (session) {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if (userId === session.user.id) {
        return res.status(400).json({ error: "You cannot follow yourself" });
      }
      try {
        await db
          .delete(usersToFollows)
          .where(
            and(
              eq(usersToFollows.followerId, session.user.id),
              eq(usersToFollows.followingId, userId)
            )
          );

        res.status(202).json({
          unfollow: true,
          followerId: session.user.id,
          followingId: userId,
        });
      } catch (error) {
        res.status(500).json({ error: "Failed to unfollow user" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
