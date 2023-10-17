import { NextApiRequest, NextApiResponse } from "next";
import { createId } from "@paralleldrive/cuid2";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { tileThemeProps } from "@/constants/theme";
import { eq, desc, ne, and, or, ilike, asc } from "drizzle-orm";
import { TagProps } from "@/interfaces/theme";
import {
  tags as tagsSchema,
  themes as themesSchema,
  themesToTags as themesToTagsSchema,
  users as usersSchema,
  usersToLikedThemes,
  usersToSavedThemes,
} from "@/db/schema";
import db from "@/db";

const THEMES_PER_PAGE = Number(process.env.THEMES_PER_PAGE || 10);

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
  template: string;
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
          where: eq(themesSchema.id, themeId),
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
            template: true,
            isAIGenerated: true,
            prompt: true,
          },
          with: {
            user: {
              columns: {
                id: true,
                name: true,
                avatar: true,
                image: true,
                title: true,
                experience: true,
                level: true,
              },
              with: {
                createdThemes: {
                  columns: {
                    id: true,
                  },
                },
              },
            },
            tags: {
              columns: {
                tagId: true,
              },
            },
            likedBy: {
              columns: {
                userId: true,
              },
              where: ne(usersToLikedThemes.status, "N"),
            },
            savedBy: {
              columns: {
                userId: true,
              },
              where: ne(usersToSavedThemes.status, "N"),
            },
          },
        });

        if (!theme) {
          return res.status(404).json({ error: "Theme not found" });
        }
        return res.status(200).json(theme);
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
              const user: any = await db.query.users.findFirst({
                where: eq(usersSchema.id, userId),
                with: {
                  createdThemes: {
                    columns: tileThemeProps.columns,
                    with: tileThemeProps.with,
                    orderBy: [
                      desc(themesSchema.createdAt),
                      asc(themesSchema.name),
                    ],
                  },
                },
              });
              return res.status(200).json(user.createdThemes);
            } else {
              const user: any = await db.query.users.findFirst({
                where: eq(usersSchema.id, userId as string),
                with: {
                  createdThemes: {
                    where: eq(themesSchema.isPrivate, false),
                    columns: tileThemeProps.columns,
                    with: tileThemeProps.with,
                    orderBy: [
                      desc(themesSchema.createdAt),
                      asc(themesSchema.name),
                    ],
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

            const savedThemes = await db.query.usersToSavedThemes.findMany({
              where: and(
                eq(usersToSavedThemes.userId, userId as string),
                ne(usersToSavedThemes.status, "N")
              ),
              with: {
                theme: {
                  columns: tileThemeProps.columns,
                  with: tileThemeProps.with,
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
            const likedThemes = await db.query.usersToLikedThemes.findMany({
              where: and(
                eq(usersToLikedThemes.userId, userId as string),
                ne(usersToLikedThemes.status, "N")
              ),
              with: {
                theme: {
                  columns: tileThemeProps.columns,
                  with: tileThemeProps.with,
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
        const query = req.query.search as string;
        const page = Number((req.query.page as string) || 1);
        const type = req.query.type as string;
        const tags = req.query.tags as string;
        if (tags) {
          const tagsArray = tags.split(",");
          const themes = await db.query.themesToTags.findMany({
            where: or(
              ...tagsArray.map((tag) => eq(themesToTagsSchema.tagId, tag))
            ),
            with: {
              theme: {
                columns: {
                  ...tileThemeProps.columns,
                  popularity: true,
                  isPrivate: true,
                },
                with: tileThemeProps.with,
              },
            },
          });

          return res.status(200).json(
            themes
              .sort((a: any, b: any) => {
                return type === "popular"
                  ? b.theme.popularity - a.theme.popularity
                  : // @ts-ignore
                    new Date(b.theme.createdAt) - new Date(a.theme.createdAt);
              })
              .filter((theme) => {
                return theme.theme.isPrivate === false;
              })
              .map((theme) => {
                const { popularity, ...rest } = theme.theme;
                return { ...rest };
              })
          );
        }

        const themes = await db.query.themes.findMany({
          where: and(
            eq(themesSchema.isPrivate, false),
            or(
              ilike(themesSchema.name, `%${query}%`),
              ilike(themesSchema.color_1_reason, `%${query}%`),
              ilike(themesSchema.color_2_reason, `%${query}%`),
              ilike(themesSchema.color_3_reason, `%${query}%`),
              ilike(themesSchema.color_4_reason, `%${query}%`),
              ilike(themesSchema.font_1, `%${query}%`),
              ilike(themesSchema.font_1_reason, `%${query}%`),
              ilike(themesSchema.font_2, `%${query}%`),
              ilike(themesSchema.font_2_reason, `%${query}%`),
              ilike(themesSchema.prompt, `%${query}%`)
            )
          ),
          columns: tileThemeProps.columns,
          with: tileThemeProps.with,
          orderBy: [
            type === "popular"
              ? desc(themesSchema.popularity)
              : desc(themesSchema.createdAt),
            asc(themesSchema.name),
          ],
          limit: THEMES_PER_PAGE,
          offset: (page - 1) * THEMES_PER_PAGE,
        });

        return res.status(200).json(themes);
      } catch (error) {
        console.log(error);
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
        template = "learning",
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
          .insert(themesSchema)
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
            template,
            isAIGenerated,
            userId: session.user.id,
          })
          .returning({ id: themesSchema.id });

        if (resolvedTags.length) {
          await db.insert(themesToTagsSchema).values(
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
