import { FontProps } from "@/constants/fonts";

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
  font_1_reason: string;
  font_2: string;
  font_2_reason: string;
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
  tags: { tag: TagProps }[];
  createdAt?: Date;
  user: {
    id: string;
    name: string;
    avatar: string;
    image: string;
  };
  _count: {
    likedBy: number;
    savedBy: number;
  };
}
