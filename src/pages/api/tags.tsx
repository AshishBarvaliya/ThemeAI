import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/config/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tags = await prisma.tag.findMany({
        select: { id: true, name: true },
      });
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
