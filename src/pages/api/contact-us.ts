import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db";
import { createId } from "@paralleldrive/cuid2";
import { supportTickets } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, topic, description } = req.body;
    if (!name || !email || !topic || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const entry = await db
        .insert(supportTickets)
        .values({
          id: createId(),
          name,
          email,
          topic,
          description,
        })
        .returning({ id: supportTickets.id });

      return res.status(201).json({
        ...entry,
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to create support ticket" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
