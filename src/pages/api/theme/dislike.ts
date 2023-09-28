import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (session) {
      const { themeId } = req.body;
      if (!themeId) {
        return res.status(400).json({ error: "themeId is required" });
      }
      try {
        // await prisma.userLikeTheme.update({
        //   where: {
        //     userId_themeId: { userId: session.user.id, themeId },
        //   },
        //   data: {
        //     status: "N",
        //   },
        // });
        console.log("---------------------------------------");
        const dislikedTheme = await prisma.$executeRaw`
          UPDATE UserLikeTheme 
          SET status = 'N' 
          WHERE themeId = ${themeId} AND userId = ${session.user.id};
        `;

        return res.status(202).json({ disliked: true, themeId, dislikedTheme });
      } catch (error) {
        // if (
        //   error instanceof Prisma.PrismaClientKnownRequestError &&
        //   error.code === "P2025"
        // ) {
        //   return res
        //     .status(202)
        //     .json({ disliked: true, themeId, isError: true });
        // }
        res
          .status(500)
          .json({ error: "An error occurred when disliking the theme." });
      }
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
