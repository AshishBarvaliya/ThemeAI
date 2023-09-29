import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import db from "@/db";
import { users } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    const userId = req.query.id as string;
    const type = req.query.type as string;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    if (type) {
      if (type === "following") {
        if (!session) {
          return res.status(400).json({ error: "Not authenticated" });
        }
        try {
          const followings = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              following: {
                select: {
                  following: {
                    select: {
                      id: true,
                      name: true,
                      avatar: true,
                      image: true,
                      title: true,
                    },
                  },
                },
              },
            },
          });
          return res
            .status(200)
            .json({ followings: followings?.following || [] });
        } catch (error) {
          return res
            .status(500)
            .json({ error: "An error occurred while fetching followings" });
        }
      }
      if (type === "followers") {
        if (!session) {
          return res.status(400).json({ error: "Not authenticated" });
        }
        try {
          const followers = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              followers: {
                select: {
                  follower: {
                    select: {
                      id: true,
                      name: true,
                      avatar: true,
                      image: true,
                      title: true,
                    },
                  },
                },
              },
            },
          });
          return res
            .status(200)
            .json({ followers: followers?.followers || [] });
        } catch (error) {
          return res
            .status(500)
            .json({ error: "An error occurred while fetching followers" });
        }
      }

      return res.status(400).json({ error: "invalid type" });
    } else {
      if (session) {
        if (session?.user?.id === userId) {
          try {
            const user = await prisma.user.findUnique({
              where: { id: userId },
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                experience: true,
                avatar: true,
                pupa: true,
                title: true,
                organization: true,
                location: true,
                _count: {
                  select: {
                    followers: true,
                    following: true,
                    likedThemes: true,
                    savedThemes: true,
                    createdThemes: true,
                  },
                },
              },
            });

            return res.status(200).json(user);
          } catch (error) {
            return res
              .status(500)
              .json({ error: "An error occurred while fetching user data" });
          }
        } else {
          try {
            const user = await prisma.user.findUnique({
              where: { id: userId as string },
              select: {
                id: true,
                name: true,
                image: true,
                title: true,
                avatar: true,
                organization: true,
                experience: true,
                location: true,
                _count: {
                  select: {
                    followers: true,
                    following: true,
                    likedThemes: true,
                    createdThemes: {
                      where: {
                        isPrivate: false,
                      },
                    },
                  },
                },
              },
            });

            return res.status(200).json(user);
          } catch (error) {
            return res
              .status(500)
              .json({ error: "An error occurred while fetching user data" });
          }
        }
      } else {
        try {
          const user = await prisma.user.findUnique({
            where: { id: userId as string },
            select: {
              id: true,
              name: true,
              image: true,
              avatar: true,
              title: true,
              organization: true,
              experience: true,
              location: true,
              _count: {
                select: {
                  followers: true,
                  following: true,
                  likedThemes: true,
                  createdThemes: {
                    where: {
                      isPrivate: false,
                    },
                  },
                },
              },
            },
          });

          return res.status(200).json(user);
        } catch (error) {
          return res
            .status(500)
            .json({ error: "An error occurred while fetching user data" });
        }
      }
    }
  }
  if (req.method === "POST") {
    const body = await req.body;
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing Fields" });
    }

    const exist = await db.select().from(users).where(eq(users.email, email));
    if (exist.length) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await db
        .insert(users)
        .values({
          id: createId(),
          name,
          email,
          hashedPassword,
          isActived: false,
        })
        .returning({ id: users.id });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
