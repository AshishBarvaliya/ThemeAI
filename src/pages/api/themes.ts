import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/config/db";
import { getSession } from 'next-auth/react';

interface TagProps {
    id?: string;
    name: string;
}

interface ThemeProps {
    id: string;
    name: string;
    color_1: string;
    color_2: string;
    color_3: string;
    color_4: string;
    font_1: string;
    font_2: string;
    prompt: string;
    isPrivate: boolean;
    tags: TagProps[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (req.method === 'GET') {
        const themeId = req.query.id;
        if (themeId) {
            try {
                const theme = await prisma.theme.findUnique({ where: { id: themeId as string } });
                if (!theme) {
                    return res.status(404).json({ error: 'Theme not found' });
                }
                res.status(200).json(theme);
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch theme' });
            }
        } else {
            try {
                const themes = await prisma.theme.findMany({ where: { isPrivate: false } });
                res.status(200).json(themes);
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch themes' });
            }
        }
    }

    if (req.method === 'POST') {
        if (session) {
            const {
                color_1, color_2, color_3, color_4, font_1, font_2, prompt, isPrivate, tags
            }: ThemeProps = req.body;

            const tagPromises = tags.map(async (tagObject: TagProps) => {
                if (tagObject.id) {
                    return tagObject
                } else {
                    const smallcaseTagName = tagObject.name.toLowerCase();
                    let tag = await prisma.tag.create({
                        data: {
                            name: smallcaseTagName,
                        },
                    });

                    return tag;
                }
            });
            const resolvedTags = await Promise.all(tagPromises);

            try {
                const theme = await prisma.theme.create({
                    data: {
                        userId: session.user.id,
                        color_1,
                        color_2,
                        color_3,
                        color_4,
                        font_1,
                        font_2,
                        prompt,
                        isPrivate,
                        tags: {
                            create: resolvedTags.map(tag => ({ tag: { connect: { id: tag.id } } })),
                        },
                    },
                    include: {
                        tags: true,
                    },
                });
                res.status(201).json(theme);
            } catch (error) {
                res.status(500).json({ error: 'Failed to create theme' });
            }
        } else {
            res.status(401).json({ error: 'Not authenticated' });
        }
    }
}

