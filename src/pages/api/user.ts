import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { and, eq, ne } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import db from "@/db";
import {
  themes as themesSchema,
  users as usersSchema,
  usersToLikedThemes,
  usersToSavedThemes,
  userViews as userViewsSchema,
} from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    const userId = req.query?.id as string;
    const type = req.query?.type as string;
    if (!userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (type) {
      if (type === "following") {
        if (!session) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        try {
          const followings = await db.query.users.findFirst({
            where: eq(usersSchema.id, userId),
            with: {
              following: {
                with: {
                  following: {
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
                },
              },
            },
          });
          return res.status(200).json({
            followings:
              followings?.following?.map((following) => ({
                following: {
                  ...following.following,
                  createdThemes: (following.following?.createdThemes ?? [])
                    .length,
                },
              })) || [],
          });
        } catch (error) {
          return res.status(500).json({ error: "Failed to fetch followings" });
        }
      }
      if (type === "followers") {
        if (!session) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        try {
          const followers = await db.query.users.findFirst({
            where: eq(usersSchema.id, userId),
            with: {
              followers: {
                with: {
                  follower: {
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
                },
              },
            },
          });
          return res.status(200).json({
            followers:
              followers?.followers?.map((follower) => ({
                follower: {
                  ...follower.follower,
                  createdThemes: (follower.follower?.createdThemes ?? [])
                    .length,
                },
              })) || [],
          });
        } catch (error) {
          return res.status(500).json({ error: "Failed to fetch followers" });
        }
      }
      if (type === "stats") {
        try {
          const stats: any = await db.query.users.findFirst({
            where: eq(usersSchema.id, userId),
            columns: {
              id: true,
            },
            with: {
              createdThemes: {
                columns: {
                  id: true,
                },
                with: {
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
              },
            },
          });
          return res.status(200).json({
            likes: stats?.createdThemes?.reduce(
              (a: any, b: any) => a + b?.likedBy?.length,
              0
            ),
            saves: stats?.createdThemes?.reduce(
              (a: any, b: any) => a + b?.savedBy?.length,
              0
            ),
          });
        } catch (error) {
          return res.status(500).json({ error: "Failed to fetch user stats" });
        }
      }

      return res.status(400).json({ error: "Invalid type" });
    } else {
      const ip = (req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress) as string;
      setTimeout(async () => {
        const view = await db.query.userViews.findFirst({
          where: and(
            eq(userViewsSchema.userId, userId),
            eq(userViewsSchema.userIp, ip)
          ),
          columns: {
            id: true,
          },
        });
        if (!view) {
          await db.insert(userViewsSchema).values({
            id: createId(),
            userId,
            userIp: ip,
          });
        }
      }, 0);
      if (session) {
        if (session?.user?.id === userId) {
          try {
            const user = await db.query.users.findFirst({
              where: eq(usersSchema.id, userId),
              columns: {
                id: true,
                name: true,
                email: true,
                image: true,
                experience: true,
                level: true,
                avatar: true,
                pupa: true,
                title: true,
                organization: true,
                location: true,
              },
              with: {
                followers: {
                  columns: {
                    followerId: true,
                  },
                },
                following: {
                  columns: {
                    followingId: true,
                  },
                },
                likedThemes: {
                  columns: {
                    themeId: true,
                  },
                  where: ne(usersToLikedThemes.status, "N"),
                },
                savedThemes: {
                  columns: {
                    themeId: true,
                  },
                  where: ne(usersToSavedThemes.status, "N"),
                },
                createdThemes: {
                  columns: {
                    id: true,
                  },
                },
              },
            });
            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json(user);
          } catch (error) {
            return res.status(500).json({ error: "Failed to fetch user" });
          }
        } else {
          try {
            const user = await db.query.users.findFirst({
              where: eq(usersSchema.id, userId),
              columns: {
                id: true,
                name: true,
                email: true,
                image: true,
                experience: true,
                level: true,
                avatar: true,
                title: true,
                organization: true,
                location: true,
              },
              with: {
                followers: {
                  columns: {
                    followerId: true,
                  },
                },
                following: {
                  columns: {
                    followingId: true,
                  },
                },
                likedThemes: {
                  columns: {
                    themeId: true,
                  },
                  where: ne(usersToLikedThemes.status, "N"),
                },
                createdThemes: {
                  where: eq(themesSchema.isPrivate, false),
                  columns: {
                    id: true,
                  },
                },
              },
            });
            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json(user);
          } catch (error) {
            return res.status(500).json({ error: "Failed to fetch user" });
          }
        }
      } else {
        try {
          const user = await db.query.users.findFirst({
            where: eq(usersSchema.id, userId),
            columns: {
              id: true,
              name: true,
              email: true,
              image: true,
              experience: true,
              avatar: true,
              title: true,
              organization: true,
              location: true,
              level: true,
            },
            with: {
              followers: {
                columns: {
                  followerId: true,
                },
              },
              following: {
                columns: {
                  followingId: true,
                },
              },
              likedThemes: {
                columns: {
                  themeId: true,
                },
                where: ne(usersToLikedThemes.status, "N"),
              },
              createdThemes: {
                where: eq(themesSchema.isPrivate, false),
                columns: {
                  id: true,
                },
              },
            },
          });
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.status(200).json(user);
        } catch (error) {
          return res.status(500).json({ error: "Failed to fetch user" });
        }
      }
    }
  }
  if (req.method === "POST") {
    const body = await req.body;
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exist = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email));
    if (exist.length) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await db
        .insert(usersSchema)
        .values({
          id: createId(),
          name,
          email,
          hashedPassword,
          isActived: false,
        })
        .returning({ id: usersSchema.id });

      return res.status(201).json({ id: user[0].id });
    } catch (error) {
      return res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
