import { GetThemeTileProps, GetTagProps } from "@/interfaces/theme";
import axios from "axios";

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
  const response = await axios.get(apiUrl);

  return response.data;
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
