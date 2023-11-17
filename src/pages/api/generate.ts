import openai from "@/config/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { getPrompt } from "@/constants/openai";
import { eq } from "drizzle-orm";
import { users as usersSchema } from "@/db/schema";
import db from "@/db";
import { USER_LEVELS } from "@/constants/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { details, isDark } = req.body;
    if (!details) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await db.query.users.findFirst({
      where: eq(usersSchema.id, session.user.id),
      columns: {
        id: true,
        experience: true,
        level: true,
        pupa: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const experience = Number(user.experience || 0) + 10;
    const level = Number(user.level || 0);
    const pupa = Number(user.pupa || 0);

    if (pupa < 1) {
      return res.status(400).json({
        error:
          "You don't have enough prompt to generate colors. please purchase prompts!",
      });
    }

    const moderation = await openai.moderations.create({
      input: details,
    });
    if (moderation.results[0].flagged) {
      return res
        .status(400)
        .json({ error: "Flagged content as violating OpenAI terms" });
    }

    try {
      const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        // model: "gpt-4-1106-preview",
        messages: [
          {
            role: "user",
            content: getPrompt({
              isDark,
              description: details,
            }),
          },
        ],
        temperature: 1,
        response_format: { type: "json_object" },
      });
      if (!gptResponse.choices[0].message.content) {
        return res.status(500).json({ error: "Error generating colors" });
      }

      try {
        const colors = JSON.parse(gptResponse.choices[0].message.content);
        res.status(200).json({
          color_1: colors.bg,
          color_2: colors.primary,
          color_3: colors.accent,
          color_4: colors.complementary,
          color_1_reason: colors.bg_reason,
          color_2_reason: colors.primary_reason,
          color_3_reason: colors.accent_reason,
          color_4_reason: colors.complementary_reason,
        });

        setTimeout(async () => {
          if (
            level < 5 &&
            USER_LEVELS[level + 1].requiredExperience <= experience
          ) {
            await db
              .update(usersSchema)
              .set({
                level: level + 1,
                experience,
                pupa: pupa + USER_LEVELS[level + 1].prompts - 1,
              })
              .where(eq(usersSchema.id, user.id));
          } else {
            await db
              .update(usersSchema)
              .set({
                experience,
                pupa: pupa - 1,
              })
              .where(eq(usersSchema.id, user.id));
          }
        }, 0);
      } catch {
        return res.status(500).json({ error: "Error generating colors" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
