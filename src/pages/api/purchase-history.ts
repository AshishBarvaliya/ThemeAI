import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import db from "@/db";
import { eq, desc } from "drizzle-orm";
import { purchases } from "@/db/schema";

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
      const purchaseHistory = await db.query.purchases.findMany({
        where: eq(purchases.userId, session.user.id),
        columns: {
          id: true,
          createdAt: true,
          pupa: true,
        },
        orderBy: [desc(purchases.createdAt)],
      });
      return res.status(200).json(purchaseHistory);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch purchase history" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
