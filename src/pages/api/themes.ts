import { NextApiRequest, NextApiResponse } from "next";
import { createId } from "@paralleldrive/cuid2";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { themeSelectProps } from "@/constants/theme";
import { eq, ne, and, sql } from "drizzle-orm";
import { TagProps } from "@/interfaces/theme";
import {
  tags as tagsSchema,
  themes as themesSchema,
  themesToTags as themesToTagsSchema,
  users as usersSchema,
  usersToLikedThemes,
  usersToSavedThemes,
  themeViews as themeViewsSchema,
} from "@/db/schema";
import db from "@/db";
import { USER_LEVELS } from "@/constants/user";
import { TemplateType } from "@/interfaces/templates";

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
  font_2: string;
  template: TemplateType;
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
      const ip = (req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress) as string;
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
            font_2: true,
            createdAt: true,
            template: true,
            isAIGenerated: true,
            prompt: true,
            isPrivate: true,
            popularity: true,
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
            views: {
              columns: {
                id: true,
              },
            },
          },
        });

        if (theme) {
          if (!theme.isPrivate) {
            res.status(200).json(theme);

            setTimeout(async () => {
              const view = await db.query.themeViews.findFirst({
                where: and(
                  eq(themeViewsSchema.themeId, themeId),
                  eq(themeViewsSchema.userIp, ip)
                ),
                columns: {
                  id: true,
                },
              });
              if (!view) {
                await db.insert(themeViewsSchema).values({
                  id: createId(),
                  themeId,
                  userIp: ip,
                });
                await db
                  .update(themesSchema)
                  .set({
                    popularity: Number(theme?.popularity || 0) + 1,
                  })
                  .where(eq(themesSchema.id, themeId));
              }
            }, 0);
            return;
          } else {
            if (session?.user.id === theme.user.id) {
              return res.status(200).json(theme);
            } else {
              return res.status(403).json({ error: "Unauthorized" });
            }
          }
        }
        return res.status(404).json({ error: "Theme not found" });
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
              const statement = sql`
                SELECT 
                    ${themeSelectProps}
                    ,theme."isPrivate"
                FROM 
                    theme
                INNER JOIN
                    "user" ON "user"."id" = theme."userId"
                LEFT JOIN 
                    themes_to_tags ON themes_to_tags."themeId" = theme.id
                LEFT JOIN
                    users_to_liked_themes ON users_to_liked_themes."themeId" = theme.id AND users_to_liked_themes.status <> 'N'
                LEFT JOIN
                    users_to_saved_themes ON users_to_saved_themes."themeId" = theme.id AND users_to_saved_themes.status <> 'N'
                LEFT JOIN
                    "user" AS liked_users ON liked_users.id = users_to_liked_themes."userId"
                LEFT JOIN
                    "user" AS saved_users ON saved_users.id = users_to_saved_themes."userId"
                LEFT JOIN 
                    tag ON tag.id = themes_to_tags."tagId"
                WHERE 
                    theme."isPrivate" = false
                  AND
                    theme."userId" = ${userId}
                GROUP BY 
                    theme.id, "user".id
                ORDER BY 
                    theme."createdAt" DESC, theme.name ASC;
              `;

              const createdThemes = await db.execute(statement);

              return res.status(200).json(
                createdThemes?.rows.map((theme: any) => ({
                  ...theme,
                  likedBy: theme.likedBy || [],
                  savedBy: theme.savedBy || [],
                  tags: theme.tags || [],
                }))
              );
            } else {
              const statement = sql`
                SELECT 
                    ${themeSelectProps}
                FROM 
                    theme
                INNER JOIN
                    "user" ON "user"."id" = theme."userId"
                LEFT JOIN 
                    themes_to_tags ON themes_to_tags."themeId" = theme.id
                LEFT JOIN
                    users_to_liked_themes ON users_to_liked_themes."themeId" = theme.id AND users_to_liked_themes.status <> 'N'
                LEFT JOIN
                    users_to_saved_themes ON users_to_saved_themes."themeId" = theme.id AND users_to_saved_themes.status <> 'N'
                LEFT JOIN
                    "user" AS liked_users ON liked_users.id = users_to_liked_themes."userId"
                LEFT JOIN
                    "user" AS saved_users ON saved_users.id = users_to_saved_themes."userId"
                LEFT JOIN 
                    tag ON tag.id = themes_to_tags."tagId"
                WHERE 
                    theme."userId" = ${userId}
                GROUP BY 
                    theme.id, "user".id
                ORDER BY 
                    theme."createdAt" DESC, theme.name ASC;
              `;

              const createdThemes = await db.execute(statement);

              return res.status(200).json(
                createdThemes?.rows.map((theme: any) => ({
                  ...theme,
                  likedBy: theme.likedBy || [],
                  savedBy: theme.savedBy || [],
                  tags: theme.tags || [],
                }))
              );
            }
          }
          if (type === "saved") {
            if (session?.user?.id !== userId) {
              return res.status(403).json({ error: "Unauthorized" });
            }

            const statement = sql`
              SELECT 
                  ${themeSelectProps}
              FROM 
                  theme
              INNER JOIN
                  "user" ON "user"."id" = theme."userId"
              LEFT JOIN 
                  themes_to_tags ON themes_to_tags."themeId" = theme.id
              LEFT JOIN
                  users_to_liked_themes ON users_to_liked_themes."themeId" = theme.id AND users_to_liked_themes.status <> 'N'
              LEFT JOIN
                  users_to_saved_themes ON users_to_saved_themes."themeId" = theme.id AND users_to_saved_themes.status <> 'N'
              LEFT JOIN
                  "user" AS liked_users ON liked_users.id = users_to_liked_themes."userId"
              LEFT JOIN
                  "user" AS saved_users ON saved_users.id = users_to_saved_themes."userId"
              LEFT JOIN 
                  tag ON tag.id = themes_to_tags."tagId"
              WHERE 
                  users_to_saved_themes."userId" = ${userId}
              GROUP BY 
                  theme.id, "user".id
              ORDER BY 
                  theme."createdAt" DESC, theme.name ASC;
            `;

            const savedThemes = await db.execute(statement);

            return res.status(200).json(
              savedThemes?.rows.map((theme: any) => ({
                ...theme,
                likedBy: theme.likedBy || [],
                savedBy: theme.savedBy || [],
                tags: theme.tags || [],
              }))
            );
          }
          if (type === "liked") {
            if (!session) {
              return res.status(401).json({ error: "Unauthorized" });
            }
            const statement = sql`
              SELECT 
                  ${themeSelectProps}
              FROM 
                  theme
              INNER JOIN
                  "user" ON "user"."id" = theme."userId"
              LEFT JOIN 
                  themes_to_tags ON themes_to_tags."themeId" = theme.id
              LEFT JOIN
                  users_to_liked_themes ON users_to_liked_themes."themeId" = theme.id AND users_to_liked_themes.status <> 'N'
              LEFT JOIN
                  users_to_saved_themes ON users_to_saved_themes."themeId" = theme.id AND users_to_saved_themes.status <> 'N'
              LEFT JOIN
                  "user" AS liked_users ON liked_users.id = users_to_liked_themes."userId"
              LEFT JOIN
                  "user" AS saved_users ON saved_users.id = users_to_saved_themes."userId"
              LEFT JOIN 
                  tag ON tag.id = themes_to_tags."tagId"
              WHERE 
                  users_to_liked_themes."userId" = ${userId}
              GROUP BY 
                  theme.id, "user".id
              ORDER BY 
                  theme."createdAt" DESC, theme.name ASC;
            `;

            const likedThemes = await db.execute(statement);

            return res.status(200).json(
              likedThemes?.rows.map((theme: any) => ({
                ...theme,
                likedBy: theme.likedBy || [],
                savedBy: theme.savedBy || [],
                tags: theme.tags || [],
              }))
            );
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
        const aiOnly = req.query.aiOnly as string;
        const statement = sql`
          SELECT 
              ${themeSelectProps}
          FROM 
              theme
          INNER JOIN
              "user" ON "user"."id" = theme."userId"
          ${
            type === "foryou"
              ? sql`INNER JOIN
              users_to_follows ON users_to_follows."followingId" = theme."userId"`
              : sql``
          }
          LEFT JOIN 
              themes_to_tags ON themes_to_tags."themeId" = theme.id
          LEFT JOIN
              users_to_liked_themes ON users_to_liked_themes."themeId" = theme.id AND users_to_liked_themes.status <> 'N'
          LEFT JOIN
              users_to_saved_themes ON users_to_saved_themes."themeId" = theme.id AND users_to_saved_themes.status <> 'N'
          LEFT JOIN
              "user" AS liked_users ON liked_users.id = users_to_liked_themes."userId"
          LEFT JOIN
              "user" AS saved_users ON saved_users.id = users_to_saved_themes."userId"
          LEFT JOIN 
              tag ON tag.id = themes_to_tags."tagId"
          WHERE 
              theme."isPrivate" = false
            AND
              (theme.name ILIKE ${`%${query}%`} 
                OR "user".name ILIKE ${`%${query}%`} 
                OR theme.color_1_reason ILIKE ${`%${query}%`}
                OR theme.color_2_reason ILIKE ${`%${query}%`}
                OR theme.color_3_reason ILIKE ${`%${query}%`}
                OR theme.color_4_reason ILIKE ${`%${query}%`}
                OR theme.font_1 ILIKE ${`%${query}%`}
                OR theme.font_2 ILIKE ${`%${query}%`}
                OR theme.prompt ILIKE ${`%${query}%`}
                OR tag.name ILIKE ${`%${query}%`})
            ${
              type === "foryou"
                ? sql`AND users_to_follows."followerId" = ${session?.user.id}`
                : sql``
            }
            ${aiOnly === "true" ? sql`AND theme."isAIGenerated" = true` : sql``}
            ${
              tags
                ? sql`AND
              theme.id IN (
                  SELECT "themeId" 
                  FROM themes_to_tags
                  INNER JOIN tag ON tag.id = themes_to_tags."tagId"
                  WHERE tag.name = ANY (${`{${tags}}`})
              )`
                : sql``
            }
          GROUP BY 
              theme.id, "user".id
          ORDER BY 
              ${
                type === "popular"
                  ? sql`theme.popularity::int DESC, theme."createdAt" DESC`
                  : sql`theme."createdAt" DESC, theme.name ASC`
              }
          LIMIT ${THEMES_PER_PAGE}
          OFFSET ${(page - 1) * THEMES_PER_PAGE};
        `;

        const themes = await db.execute(statement);

        return res.status(200).json(
          themes?.rows.map((theme: any) => ({
            ...theme,
            likedBy: theme.likedBy || [],
            savedBy: theme.savedBy || [],
            tags: theme.tags || [],
          }))
        );
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch themes" });
      }
    }
  } else if (req.method === "POST") {
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
        font_2,
        prompt = "",
        isPrivate,
        isAIGenerated = false,
        template = "Learning",
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
            font_2,
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

        res.status(201).json(createdTheme[0]);

        setTimeout(async () => {
          const user = await db.query.users.findFirst({
            where: eq(usersSchema.id, session.user.id),
            columns: {
              id: true,
              experience: true,
              level: true,
              pupa: true,
            },
          });
          if (user) {
            const experience = Number(user.experience || 0) + 10;
            const level = Number(user.level || 0);

            if (
              level < 5 &&
              USER_LEVELS[level + 1].requiredExperience <= experience
            ) {
              await db
                .update(usersSchema)
                .set({
                  level: level + 1,
                  experience,
                  pupa: Number(user.pupa || 0) + USER_LEVELS[level + 1].prompts,
                })
                .where(eq(usersSchema.id, user.id));
            } else {
              await db
                .update(usersSchema)
                .set({
                  experience,
                })
                .where(eq(usersSchema.id, user.id));
            }
          }
        }, 0);

        return;
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to create theme" });
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
