import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db";
import { createId } from "@paralleldrive/cuid2";
import { deactivationRequests } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    const { reason } = req.body;
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const entry = await db
        .insert(deactivationRequests)
        .values({
          id: createId(),
          userId: session.user.id,
          reason: reason || "No reason provided",
        })
        .returning({ id: deactivationRequests.id });

      return res.status(201).json({
        ...entry,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to create deactivation request" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
