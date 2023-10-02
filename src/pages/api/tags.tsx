import db from "@/db";
import { tags as tagsSchema } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tags = await db.query.tags.findMany({
        orderBy: [asc(tagsSchema.name)],
      });
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
