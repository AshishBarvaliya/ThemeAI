import db from "@/db";
import { themes as themesSchema, users as usersSchema } from "@/db/schema";
import { asc, desc } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const themes = await db.query.themes.findMany({
        columns: {
          id: true,
        },
        orderBy: [desc(themesSchema.createdAt)],
      });
      const users = await db.query.users.findMany({
        columns: {
          id: true,
        },
        orderBy: [asc(usersSchema.createdAt)],
      });

      const data: { id: string; type: string }[] = [];
      themes.forEach((theme) => {
        data.push({
          id: theme.id,
          type: "themes",
        });
      });

      users.forEach((user) => {
        data.push({
          id: user.id,
          type: "user",
        });
      });

      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sitemap details" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
