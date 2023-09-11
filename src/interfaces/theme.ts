export type IColor = "bg" | "primary" | "accent" | "extra";

export type ColorsProps = {
  [key in IColor]: string;
};

export type ShadesProps = {
  [key: string]: string;
};
