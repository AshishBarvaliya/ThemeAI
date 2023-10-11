import { GetThemeTileProps, MappedThemeProps } from "@/interfaces/theme";

export const getMappedTheme = (theme: GetThemeTileProps): MappedThemeProps => ({
  id: theme.id,
  name: theme.name,
  user: theme.user,
  template: theme.template,
  colors: {
    bg: theme.color_1,
    primary: theme.color_2,
    accent: theme.color_3,
    extra: theme.color_4,
  },
  fonts: {
    primary: {
      fontFamily: theme.font_1,
      weights: [],
    },
    secondary: {
      fontFamily: theme.font_2,
      weights: [],
    },
  },
  tags: theme.tags.map((tag) => tag.tagId),
  createdAt: theme.createdAt,
  likes: theme.likedBy.length,
  saves: theme.savedBy.length,
});
