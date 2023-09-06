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
    if (!userId && !session) {
      return res.status(400).json({ error: "Missing Fields" });
    } else {
      if (session) {
        if (!userId || session?.user?.id === userId) {
          const infoType = req.query.type;
          console.log({ infoType });
          if (infoType) {
            if (infoType === "following") {
              try {
                const followings = await prisma.user.findUnique({
                  where: { id: session?.user?.id },
                  select: {
                    following: {
                      select: {
                        following: {
                          select: {
                            id: true,
                            name: true,
                            avatar: true,
                            image: true,
                          },
                        },
                      },
                    },
                  },
                });
                res
                  .status(200)
                  .json({ followings: followings?.following || [] });
              } catch (error) {
                res.status(500).json({ error: "An error occurred" });
              }
            } else {
              return res.status(400).json({ error: "Invalid Fields" });
            }
          } else {
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
                          avatar: true,
                          image: true,
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
                          avatar: true,
                          image: true,
                        },
                      },
                    },
                  },
                  notifications: true,
                  activities: true,
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
                avatar: true,
                organization: true,
                experience: true,
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
                        avatar: true,
                        image: true,
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
                        avatar: true,
                        image: true,
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
              avatar: true,
              title: true,
              organization: true,
              experience: true,
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
    const { name, email, password } = body;

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
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
          isActived: false,
        },
      });
      return res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
