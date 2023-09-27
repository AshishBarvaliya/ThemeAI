import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    const infoType = req.query.type as string;

    if (!session) {
      return res.status(400).json({ error: "Not authenticated" });
    }
    if (
      ["likedthemes", "followers", "following", "savedthemes"].includes(
        infoType
      )
    ) {
      if (infoType === "followers") {
        try {
          const followers = await prisma.user.findUnique({
            where: { id: session.user.id as string },
            select: {
              followers: {
                select: {
                  follower: {
                    select: {
                      id: true,
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
            .json({ error: "An error occurred when fetching followers" });
        }
      }
      if (infoType === "following") {
        try {
          const followings = await prisma.user.findUnique({
            where: { id: session.user.id as string },
            select: {
              following: {
                select: {
                  following: {
                    select: {
                      id: true,
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
            .json({ error: "An error occurred when fetching followings" });
        }
      }
      if (infoType === "likedthemes") {
        try {
          const likedThemes = await prisma.userLikeTheme.findMany({
            where: { userId: session?.user?.id as string },
            select: {
              theme: {
                select: {
                  id: true,
                },
              },
            },
          });
          return res
            .status(200)
            .json(likedThemes?.map((theme: any) => theme.theme.id) || []);
        } catch (error) {
          return res
            .status(500)
            .json({ error: "An error occurred when fetching liked themes" });
        }
      }
      if (infoType === "savedthemes") {
        try {
          const savedThemes = await prisma.userSaveTheme.findMany({
            where: { userId: session?.user?.id as string },
            select: {
              theme: {
                select: {
                  id: true,
                },
              },
            },
          });
          return res
            .status(200)
            .json(savedThemes?.map((theme: any) => theme.theme.id) || []);
        } catch (error) {
          return res
            .status(500)
            .json({ error: "An error occurred when fetching saved themes" });
        }
      }
    } else {
      return res.status(400).json({ error: "incorrect infoType" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
