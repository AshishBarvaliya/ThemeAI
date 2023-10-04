import db from "@/db";
import {
  tags as tagsSchema,
  themes as themesSchema,
  themesToTags,
} from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { NextApiRequest, NextApiResponse } from "next";
import { LoremIpsum } from "lorem-ipsum";
import { GOOGLE_FONTS } from "@/constants/fonts";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const genRanHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const type = req.query.type as string;
    if (type === "tags") {
      try {
        const line = lorem.generateParagraphs(4).replaceAll("\n", " ");
        const newTags = [...new Set(line.split(" "))].map((tag) => ({
          id: createId(),
          name: tag,
        }));

        await db.insert(tagsSchema).values(newTags);

        return res.status(200).json({ message: "success" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to generate tags" });
      }
    }
    if (type === "themes") {
      try {
        const newThemes = new Array(10).fill(1).map(() => ({
          id: createId(),
          name: lorem.generateWords(3),
          color_1: "#" + genRanHex(6),
          color_1_reason: lorem.generateWords(8),
          color_2: "#" + genRanHex(6),
          color_2_reason: lorem.generateWords(9),
          color_3: "#" + genRanHex(6),
          color_3_reason: lorem.generateWords(7),
          color_4: "#" + genRanHex(6),
          color_4_reason: lorem.generateWords(10),
          font_1:
            GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]
              .fontFamily,
          font_1_reason: lorem.generateWords(8),
          font_2:
            GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)]
              .fontFamily,
          font_2_reason: lorem.generateWords(7),
          prompt: lorem.generateWords(15),
          isPrivate: [false, true][Math.floor(Math.random() * 2)],
          isAIGenerated: [false, true][Math.floor(Math.random() * 2)],
          userId: [
            "payikqhn4fdveyhd6u3s5af1",
            "ts1gb3wynj7w3ku4dyfxjrss",
            "st1fakkn96guwxccgyojp4tp",
            "iyukgfe4m2qgzpczjfxf0ohq",
          ][Math.floor(Math.random() * 4)],
        }));

        await db.insert(themesSchema).values(newThemes);

        return res.status(200).json({ message: "success" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to generate tags" });
      }
    }
    if (type === "connect-tags") {
      try {
        const tags = await db.select({ id: tagsSchema.id }).from(tagsSchema);
        const themes = await db
          .select({ id: themesSchema.id })
          .from(themesSchema);

        await db.insert(themesToTags).values(
          themes.map((theme) => ({
            themeId: theme.id,
            tagId: tags[Math.floor(Math.random() * tags.length)].id,
          }))
        );

        return res.status(200).json({ message: "success" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to generate tags" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
