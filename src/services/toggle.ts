import axios from "axios";

export const setMarkAsInappropriate = async (themeId: string) => {
  const response = await axios.post("/api/theme/inappropriate", {
    themeId,
  });
  return response.data;
};

export const themeLike = async (themeId: string) => {
  const response = await axios.post("/api/theme/like", {
    themeId,
  });
  return response.data;
};

export const themeDislike = async (themeId: string) => {
  const response = await axios.post("/api/theme/dislike", {
    themeId,
  });
  return response.data;
};

export const themeSave = async (themeId: string) => {
  const response = await axios.post("/api/theme/save", {
    themeId,
  });
  return response.data;
};

export const themeUnsave = async (themeId: string) => {
  const response = await axios.post("/api/theme/unsave", {
    themeId,
  });
  return response.data;
};
