import { usersToLikedThemes, usersToSavedThemes } from "@/db/schema";
import { ne, sql } from "drizzle-orm";

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

export const themeSelectProps = sql`
  theme.id, 
  theme.name, 
  theme."createdAt",
  theme."isAIGenerated",
  theme.color_1,
  theme.color_2,
  theme.color_3,
  theme.color_4,
  theme.font_1,
  theme.font_2,
  theme.template,
  "user".id AS user_id, 
  "user".name AS user_name,
  "user".avatar AS user_avatar,
  "user".image AS user_image,
  "user".level AS user_level,
  array_agg(DISTINCT tag.name) FILTER (WHERE tag.name IS NOT NULL) AS tags,
  array_agg(DISTINCT liked_users.id) FILTER (WHERE liked_users.id IS NOT NULL) AS "likedBy",
  array_agg(DISTINCT saved_users.id) FILTER (WHERE saved_users.id IS NOT NULL) AS "savedBy"
`;

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
