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
