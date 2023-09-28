import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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
        const existingFollower = await prisma.follow.findUnique({
          where: {
            followerId_followingId: {
              followerId: session.user.id,
              followingId: userId,
            },
          },
        });

        if (existingFollower) {
          await prisma.follow.delete({
            where: {
              followerId_followingId: {
                followerId: session.user.id,
                followingId: userId,
              },
            },
          });

          res.status(202).json({ follow: false, userId });
        } else {
          await prisma.follow.create({
            data: { followerId: session.user.id, followingId: userId },
          });
          res.status(201).json({ follow: true, userId });

          setTimeout(async () => {
            await prisma.notification.create({
              data: {
                recipientId: userId,
                read: false,
                type: "FOLLOW",
                notifierId: session.user.id,
              },
            });
          }, 0);
        }
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
