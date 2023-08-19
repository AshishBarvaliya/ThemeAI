import { prisma } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (req.method === "GET") {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({ error: "Missing Fields" });
    } else {
      if (session && session?.user?.id === userId) {
        try {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              likedThemes: true,
              savedThemes: true,
              createdThemes: true,
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
              likedThemes: true,
              savedThemes: true,
              createdThemes: {
                where: {
                  isPrivate: false,
                },
                select: {
                  id: true,
                  color_1: true,
                  color_2: true,
                  color_3: true,
                  color_4: true,
                  font_1: true,
                  font_2: true,
                  prompt: true,
                  tags: true,
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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return res.status(201).json({ user });
  }
}
