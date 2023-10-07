import { GetThemeTileProps, GetTagProps } from "@/interfaces/theme";
import axios from "axios";

export const postTheme = async () => {
  const apiUrl = "/api/themes";

  const requestBody = {
    name: "private -- vitamin water selling website",
    color_1: "hsl(180, 20%, 10%)",
    color_1_reason:
      "Creates a sleek and professional background for the website.",
    color_2: "hsl(0, 0%, 95%)",
    color_2_reason:
      "High contrast against the background, enhancing readability.",
    color_3: "hsl(210, 70%, 50%)",
    color_3_reason:
      "Adds vibrancy and draws attention to interactive elements.",
    color_4: "hsl(30, 70%, 50%)",
    color_4_reason: "Complementary color creates visual interest and balance.",
    font_1: "Inter",
    font_1_reason: "Font used for headings and body text.",
    font_2: "Sans Serif",
    font_2_reason: "Font used for body text.",
    prompt: "vitamin water selling website",
    isPrivate: true,
    isAIGenerated: true,
    tags: [
      { id: "clli817wc0000t74srezi922b", name: "tag1" },
      { id: "clli818p10001t74shi3sozrj", name: "tag2" },
    ],
  };

  try {
    const response = await axios.post(apiUrl, requestBody);

    console.log(response);
  } catch (error) {
    console.log("Failed to create theme");
  }
};

export const getThemes = async (
  page: number,
  themeSearchQuery: string,
  type: "explore" | "foryou" | "popular",
  tags: string[]
): Promise<GetThemeTileProps[]> => {
  const apiUrl = `/api/themes?page=${page}&search=${themeSearchQuery}&type=${type}${
    tags ? `&tags=${tags.join(",")}` : ""
  }`;
  const response = await axios.get(apiUrl);

  return response.data as GetThemeTileProps[];
};

export const getThemeById = async (themeId: string) => {
  if (!themeId) return;

  const apiUrl = `/api/themes?id=${themeId}`;

  try {
    const response = await axios.get(apiUrl);

    console.log(response);
  } catch (error) {
    console.log("Failed to fetch theme");
  }
};

export const getThemesByUserAndType = async (
  userId: string,
  type: "saved" | "liked" | "created"
) => {
  if (!userId || !type) return;
  const apiUrl = `/api/themes?userId=${userId}&type=${type}`;
  const response = await axios.get(apiUrl);

  return response.data as GetThemeTileProps[];
};

export const getTags = async (): Promise<GetTagProps[]> => {
  const apiUrl = "/api/tags";
  const response = await axios.get(apiUrl);

  return response.data as GetTagProps[];
};
