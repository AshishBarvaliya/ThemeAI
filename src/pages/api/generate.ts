import openai from "@/config/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { getPrompt } from "@/constants/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { details, isDark, sameSaturation } = req.body;
    if (!details) {
      return res.status(400).json({ error: "Details are required" });
    }
    const moderation = await openai.createModeration({
      input: details,
    });
    if (moderation.data.results[0].flagged) {
      return res.status(400).json({ error: "Flagged as inappropriate by AI" });
    }

    try {
      const gptResponse = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: getPrompt({ isDark, sameSaturation, description: details }),
        temperature: 1,
        max_tokens: 500,
      });

      return res.status(200).json({ text: gptResponse.data.choices[0].text });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
