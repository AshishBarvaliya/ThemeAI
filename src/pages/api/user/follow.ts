import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/db";
import { usersToFollows, usersTonotifications } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { and, desc, eq } from "drizzle-orm";
import { isOlderThan24Hours } from "@/lib/api-helpers";

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
          .insert(usersToFollows)
          .values({ followerId: session.user.id, followingId: userId });

        res.status(201).json({
          follow: true,
          followerId: session.user.id,
          followingId: userId,
        });

        setTimeout(async () => {
          const oldData = await db.query.usersTonotifications.findMany({
            where: and(
              eq(usersTonotifications.recipientId, userId),
              eq(usersTonotifications.type, "FOLLOW")
            ),
            columns: {
              id: true,
              createdAt: true,
            },
            orderBy: [desc(usersTonotifications.createdAt)],
          });
          if (
            oldData.length === 0 ||
            (oldData.length > 0 && isOlderThan24Hours(oldData[0].createdAt))
          ) {
            await db.insert(usersTonotifications).values({
              id: createId(),
              recipientId: userId,
              read: false,
              type: "FOLLOW",
              notifierId: session.user.id,
            });
          }
        }, 0);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred when following the user." });
      }
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
