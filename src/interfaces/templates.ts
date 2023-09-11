import { FontProps } from "@/constants/fonts";
import { ColorsProps, ShadesProps } from "./theme";

export interface TemplateProps {
  colors: ColorsProps;
  shades: ShadesProps;
  fonts: {
    primary: FontProps;
    secondary: FontProps;
  };
  svgProps?: any;
}
