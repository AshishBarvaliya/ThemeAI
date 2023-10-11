import { usersToLikedThemes, usersToSavedThemes } from "@/db/schema";
import { ne } from "drizzle-orm";

export const tileThemeProps = {
  columns: {
    id: true,
    name: true,
    color_1: true,
    color_2: true,
    color_3: true,
    color_4: true,
    font_1: true,
    font_2: true,
    template: true,
    createdAt: true,
    isAIGenerated: true,
  },
  with: {
    user: {
      columns: {
        id: true,
        name: true,
        avatar: true,
        image: true,
        level: true,
      },
    },
    tags: {
      columns: {
        tagId: true,
      },
    },
    likedBy: {
      columns: {
        userId: true,
      },
      where: ne(usersToLikedThemes.status, "N"),
    },
    savedBy: {
      columns: {
        userId: true,
      },
      where: ne(usersToSavedThemes.status, "N"),
    },
  },
};

export const COLORS_FORMAT = {
  CSS: "CSS",
  SCSS: "SCSS",
  TAILWIND: "Tailwind CSS",
  IMAGE: "Image",
};

export const COLORS_TYPE = {
  HEX: "HEX",
  RGB: "RGB",
  HSL: "HSL",
};
