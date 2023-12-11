import { GetThemeTileProps, MappedThemeProps } from "@/interfaces/theme";

export const getMappedTheme = (theme: GetThemeTileProps): MappedThemeProps => ({
  id: theme.id,
  name: theme.name,
  user: {
    id: theme.user_id,
    name: theme.user_name,
    avatar: theme.user_avatar,
    image: theme.user_image,
    level: theme.user_level,
  },
  template: theme.template,
  isAIGenerated: theme.isAIGenerated,
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
  tags: theme.tags || [],
  createdAt: theme.createdAt,
  likes: theme.likedBy?.length || 0,
  saves: theme.savedBy?.length || 0,
  likedBy: theme.likedBy || [],
  savedBy: theme.savedBy || [],
});
