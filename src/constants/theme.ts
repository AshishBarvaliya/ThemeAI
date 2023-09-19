export const tileThemeProps = {
  id: true,
  name: true,
  color_1: true,
  color_2: true,
  color_3: true,
  color_4: true,
  font_1: true,
  font_2: true,
  createdAt: true,
  isAIGenerated: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
  tags: {
    select: {
      tag: true,
    },
  },
  _count: {
    select: {
      savedBy: true,
      likedBy: true,
    },
  },
};

export const themeProps = {
  id: true,
  name: true,
  description: true,
  color_1: true,
  color_1_reason: true,
  color_2: true,
  color_2_reason: true,
  color_3: true,
  color_3_reason: true,
  color_4: true,
  color_4_reason: true,
  font_1: true,
  font_1_reason: true,
  font_2: true,
  font_2_reason: true,
  createdAt: true,
  isAIGenerated: true,
  isPrivate: true,
  prompt: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
  tags: {
    select: {
      tag: true,
    },
  },
  _count: {
    select: {
      savedBy: true,
      likedBy: true,
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
