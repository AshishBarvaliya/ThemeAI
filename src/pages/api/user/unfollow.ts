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
        return res.status(400).json({ error: "userId is required" });
      }
      if (userId === session.user.id) {
        return res.status(400).json({ error: "Cannot follow yourself" });
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

        res.status(201).json({
          follow: true,
          followerId: session.user.id,
          followingId: userId,
        });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred when unfollowing the user." });
      }
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}