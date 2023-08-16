import { prisma } from '@/config/db';
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    const body = await request.body;
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing Fields' })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (exist) {
        return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    return res.status(201).json({ user });
}