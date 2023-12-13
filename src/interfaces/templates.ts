import { ColorsProps, FontObjProps, ShadesProps } from "./theme";

export interface TemplateProps {
  id: string;
  colors: ColorsProps;
  shades: ShadesProps;
  fonts: FontObjProps;
  svgProps?: any;
}

export type TemplateType =
  | "Learning"
  | "Marketing"
  | "Foodie"
  | "Dashboard"
  | "Editor";
