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
    const { details, isDark } = req.body;
    if (!details) {
      return res.status(400).json({ error: "Details are required" });
    }
    const moderation = await openai.moderations.create({
      input: details,
    });
    if (moderation.results[0].flagged) {
      return res.status(400).json({ error: "Flagged content" });
    }

    try {
      const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: getPrompt({
              isDark,
              description: details,
            }),
          },
        ],
        temperature: 1,
        functions: [
          {
            name: "get_colors_with_reasons",
            description:
              "Get colors and reasons of color for the theme of the design of website from the given description fo the website",
            parameters: {
              type: "object",
              properties: {
                color_1: {
                  type: "string",
                },
                color_1_reason: {
                  type: "string",
                },
                color_2: {
                  type: "string",
                },
                color_2_reason: {
                  type: "string",
                },
                color_3: {
                  type: "string",
                },
                color_3_reason: {
                  type: "string",
                },
                color_4: {
                  type: "string",
                },
                color_4_reason: {
                  type: "string",
                },
              },
              required: [
                "color_1",
                "color_1_reason",
                "color_2",
                "color_2_reason",
                "color_3",
                "color_3_reason",
                "color_4",
                "color_4_reason",
              ],
            },
          },
        ],
        function_call: { name: "get_colors_with_reasons" },
      });

      const function_call = gptResponse.choices[0].message.function_call;

      if (function_call) {
        const colors = JSON.parse(function_call.arguments);
        return res.status(200).json({ ...colors });
      } else {
        return res.status(500).json({ error: "Error generating colors" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
