import openai from '@/config/openai';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;
        const gpt4Response = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 100
        });

        return res.status(200).json({ text: gpt4Response.data });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
