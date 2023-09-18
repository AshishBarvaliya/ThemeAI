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
    if (session) {
      try {
        const tags = await prisma.tag.findMany({
          select: { id: true, name: true },
        });
        res.status(200).json(tags);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch tags" });
      }
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
