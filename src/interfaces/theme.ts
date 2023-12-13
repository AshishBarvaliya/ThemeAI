import { FontProps } from "@/constants/fonts";
import { TemplateType } from "./templates";

export type IColor = "bg" | "primary" | "accent" | "extra";

export type ColorsProps = {
  [key in IColor]: string;
};

export type ShadesProps = {
  [key: string]: string;
};

export type FontObjProps = {
  primary: FontProps;
  secondary: FontProps;
};

export interface TagProps {
  id?: string;
  name: string;
}

export interface GetTagProps {
  id: string;
  name: string;
}

export interface ThemeProps {
  id: string;
  name: string;
  color_1: string;
  color_1_reason: string;
  color_2: string;
  color_2_reason: string;
  color_3: string;
  color_3_reason: string;
  color_4: string;
  color_4_reason: string;
  font_1: string;
  font_2: string;
  prompt: string;
  isPrivate: boolean;
  isAIGenerated: boolean;
  tags: { tag: TagProps }[];
  createdAt?: Date;
}

export interface GetThemeTileProps {
  id: string;
  name: string;
  color_1: string;
  color_2: string;
  color_3: string;
  color_4: string;
  font_1: string;
  font_2: string;
  isAIGenerated: boolean;
  isPrivate?: boolean;
  template: TemplateType;
  tags: string[];
  createdAt?: Date;
  user_id: string;
  user_name: string;
  user_avatar: string;
  user_image: string;
  user_level: number;
  likedBy: string[];
  savedBy: string[];
}

export interface MappedThemeProps {
  id: string;
  name: string;
  colors: ColorsProps;
  fonts: FontObjProps;
  tags: string[];
  createdAt?: Date;
  template: TemplateType;
  user: {
    id: string;
    name: string;
    avatar: string;
    image: string;
    level: number;
  };
  likes: number;
  saves: number;
  isAIGenerated: boolean;
  likedBy: string[];
  savedBy: string[];
}

export interface GeneratedThemeProps {
  color_1: string;
  color_1_reason: string;
  color_2: string;
  color_2_reason: string;
  color_3: string;
  color_3_reason: string;
  color_4: string;
  color_4_reason: string;
  prompt: string;
  isDark: boolean;
}
