import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    if (!session) {
      res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const notifications = await prisma.notification.findMany({
        where: { recipientId: session?.user.id },
        select: {
          id: true,
          createdAt: true,
          read: true,
          type: true,
          pupa: true,
          theme: {
            select: {
              id: true,
              name: true,
            },
          },
          notifier: {
            select: {
              id: true,
              name: true,
              avatar: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch notifications" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
