import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import db from "@/db";
import { eq, desc } from "drizzle-orm";
import { usersTonotifications } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const notifications = await db.query.usersTonotifications.findMany({
        where: eq(usersTonotifications.recipientId, session.user.id),
        columns: {
          id: true,
          createdAt: true,
          read: true,
          type: true,
          pupa: true,
        },
        with: {
          theme: {
            columns: {
              id: true,
              name: true,
            },
          },
          notifier: {
            columns: {
              id: true,
              name: true,
              avatar: true,
              image: true,
            },
          },
        },
        orderBy: [desc(usersTonotifications.createdAt)],
      });
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch notifications" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
