import { prisma } from '@/config/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (session) {
        try {
            const user = await prisma.user.findUnique({
                where: { email: session.user?.email as string },
            });

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching user data' });
        }
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
};
