import { ColorsProps, IColor, ShadesProps } from "@/interfaces/theme";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const debounce = (func: Function, timeout = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

type HSL = [number, number, number];

const hexToHSL = (hex: string): HSL => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        throw new Error("Unexpected condition");
    }

    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

export const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const generateShades = (hexColor: string): { light: string; dark: string } => {
  let [h, s, l] = hexToHSL(hexColor);
  return {
    light: hslToHex(h, s, Math.min(100, l + 5)),
    dark: hslToHex(h, s, Math.max(0, l - 5)),
  };
};

export const generateAllShades = (colors: ColorsProps): ShadesProps => {
  const shades: ShadesProps = {};
  for (const key in colors) {
    const { light, dark } = generateShades(colors[key as IColor]);
    shades[`${key}Light`] = light;
    shades[`${key}Dark`] = dark;
  }
  return shades;
};
