import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/config/db";
import { createId } from "@paralleldrive/cuid2";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { tileThemeProps } from "@/constants/theme";
import { eq, sql } from "drizzle-orm";
import { TagProps } from "@/interfaces/theme";
import { tags as tagsSchema, themes, themesToTags } from "@/db/schema";
import db from "@/db";

interface ThemeProps {
  id: string;
  name: string;
  color_1: string;
  color_1_reason: string;
  color_2: string;
  color_2_reason: string;
  color_3: string;
  color_3_reason: string;
  color_4: string;
  color_4_reason: string;
  font_1: string;
  font_1_reason: string;
  font_2: string;
  font_2_reason: string;
  prompt: string;
  isPrivate: boolean;
  isAIGenerated: boolean;
  tags: TagProps[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    const themeId = req.query.id as string;
    if (themeId) {
      try {
        const theme = await db.query.themes.findFirst({
          where: eq(themes.id, themeId),
          columns: {
            id: true,
            name: true,
            color_1: true,
            color_1_reason: true,
            color_2: true,
            color_2_reason: true,
            color_3: true,
            color_3_reason: true,
            color_4: true,
            color_4_reason: true,
            font_1: true,
            font_1_reason: true,
            font_2: true,
            font_2_reason: true,
            createdAt: true,
            isAIGenerated: true,
            isPrivate: true,
            prompt: true,
          },
          with: {
            user: {
              columns: {
                id: true,
                name: true,
              },
            },
            tags: {
              columns: {
                themeId: true,
              },
            },
            likedBy: {
              columns: {
                userId: true,
              },
            },
            savedBy: {
              columns: {
                userId: true,
              },
            },
          },
        });

        if (!theme) {
          return res.status(404).json({ error: "Theme not found" });
        }
        res.status(200).json(theme);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch theme" });
      }
    } else {
      const { userId, type } = req.query;
      if (userId && type) {
        if (!["created", "liked", "saved"].includes(type as string)) {
          return res.status(400).json({ error: "Invalid type" });
        }
        try {
          if (type === "created") {
            if (session?.user?.id === userId) {
              const user: any = await prisma.user.findUnique({
                where: { id: userId as string },
                select: {
                  createdThemes: {
                    select: tileThemeProps,
                  },
                },
              });
              return res.status(200).json(user.createdThemes);
            } else {
              const user: any = await prisma.user.findUnique({
                where: { id: userId as string },
                select: {
                  createdThemes: {
                    where: { isPrivate: false },
                    select: tileThemeProps,
                  },
                },
              });
              return res.status(200).json(user.createdThemes);
            }
          }
          if (type === "saved") {
            if (session?.user?.id !== userId) {
              return res.status(401).json({ error: "Not authenticated" });
            }
            const savedThemes: any = await prisma.userSaveTheme.findMany({
              where: { userId: userId as string },
              select: {
                theme: {
                  select: tileThemeProps,
                },
              },
              orderBy: {
                theme: {
                  createdAt: "desc",
                },
              },
            });
            return res
              .status(200)
              .json(savedThemes?.map((theme: any) => theme.theme));
          }
          if (type === "liked") {
            if (!session) {
              return res.status(401).json({ error: "Not authenticated" });
            }
            const likedThemes = await prisma.userLikeTheme.findMany({
              where: { userId: userId as string },
              select: {
                theme: {
                  select: tileThemeProps,
                },
              },
              orderBy: {
                theme: {
                  createdAt: "desc",
                },
              },
            });
            return res
              .status(200)
              .json(likedThemes?.map((theme: any) => theme.theme));
          }
        } catch (error) {
          return res.status(500).json({ error: "Failed to fetch themes" });
        }
      }
      try {
        const themes = await prisma.theme.findMany({
          where: { isPrivate: false },
          select: tileThemeProps,
          orderBy: {
            createdAt: "desc",
          },
        });
        return res.status(200).json(themes);
      } catch (error) {
        return res.status(500).json({ error: "Failed to fetch themes" });
      }
    }
  }

  if (req.method === "POST") {
    if (session) {
      const {
        name,
        color_1,
        color_1_reason,
        color_2,
        color_2_reason,
        color_3,
        color_3_reason,
        color_4,
        color_4_reason,
        font_1,
        font_1_reason,
        font_2,
        font_2_reason,
        prompt = "",
        isPrivate,
        isAIGenerated = false,
        tags = [],
      }: ThemeProps = req.body;

      const tagPromises = tags.map(async (tagObject: TagProps) => {
        if (tagObject.id) {
          return tagObject;
        } else {
          const smallcaseTagName = tagObject.name.toLowerCase();
          let tag = await db
            .insert(tagsSchema)
            .values({
              id: createId(),
              name: smallcaseTagName,
            })
            .returning({ id: tagsSchema.id });
          return tag[0];
        }
      });
      const resolvedTags = await Promise.all(tagPromises);

      try {
        const createdTheme = await db
          .insert(themes)
          .values({
            id: createId(),
            name,
            color_1,
            color_1_reason,
            color_2,
            color_2_reason,
            color_3,
            color_3_reason,
            color_4,
            color_4_reason,
            font_1,
            font_1_reason,
            font_2,
            font_2_reason,
            prompt,
            isPrivate,
            isAIGenerated,
            userId: session.user.id,
          })
          .returning({ id: themes.id });

        if (resolvedTags.length) {
          await db.insert(themesToTags).values(
            resolvedTags.map((tag) => ({
              themeId: createdTheme[0].id,
              tagId: tag.id as string,
            }))
          );
        }

        return res
          .status(201)
          .json({ message: "Theme have been created", theme: createdTheme[0] });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to create theme" });
      }
    } else {
      return res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
