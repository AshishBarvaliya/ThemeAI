import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { tileThemeProps } from "@/constants/theme";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({ error: "Missing Fields" });
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
                username: true,
                pupa: true,
                purchaseHistory: {
                  select: {
                    id: true,
                    createdAt: true,
                  },
                },
                title: true,
                organization: true,
                location: true,
                likedThemes: {
                  select: {
                    theme: {
                      select: tileThemeProps,
                    },
                  },
                },
                savedThemes: {
                  select: {
                    theme: {
                      select: tileThemeProps,
                    },
                  },
                },
                createdThemes: {
                  select: tileThemeProps,
                },
                following: {
                  select: {
                    following: {
                      select: {
                        id: true,
                        name: true,
                        username: true,
                      },
                    },
                  },
                },
                followers: {
                  select: {
                    follower: {
                      select: {
                        id: true,
                        name: true,
                        username: true,
                      },
                    },
                  },
                },
              },
            });

            res.status(200).json({ user });
          } catch (error) {
            res
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
                username: true,
                organization: true,
                location: true,
                likedThemes: {
                  select: {
                    theme: {
                      select: tileThemeProps,
                    },
                  },
                },
                createdThemes: {
                  where: {
                    isPrivate: false,
                  },
                  select: tileThemeProps,
                },
                following: {
                  select: {
                    following: {
                      select: {
                        id: true,
                        name: true,
                        username: true,
                      },
                    },
                  },
                },
                followers: {
                  select: {
                    follower: {
                      select: {
                        id: true,
                        name: true,
                        username: true,
                      },
                    },
                  },
                },
              },
            });

            res.status(200).json({ user });
          } catch (error) {
            res
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
              title: true,
              username: true,
              organization: true,
              location: true,
              createdThemes: {
                where: {
                  isPrivate: false,
                },
                select: tileThemeProps,
              },
              _count: {
                select: {
                  followers: true,
                  following: true,
                  likedThemes: true,
                },
              },
            },
          });

          res.status(200).json({ user });
        } catch (error) {
          res
            .status(500)
            .json({ error: "An error occurred while fetching user data" });
        }
      }
    }
  }
  if (req.method === "POST") {
    const body = await req.body;
    const { username, name, title, organization, location, email, password } =
      body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing Fields" });
    }

    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        title,
        organization,
        location,
        hashedPassword,
      },
    });

    return res.status(201).json({ user });
  }
}
