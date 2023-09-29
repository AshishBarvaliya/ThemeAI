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
      avatar: true,
      image: true,
    },
  },
  tags: {
    select: {
      tag: {
        select: {
          id: true,
          name: true,
        },
      },
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
