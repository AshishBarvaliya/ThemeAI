import axios from "axios";

export const setMarkAsInappropriate = async (themeId: string) => {
  if (!themeId) return;

  try {
    const response = await axios.post("/api/theme-inappropriate", {
      themeId,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to toggle save", error);
  }
};

export const themeLike = async (themeId: string) => {
  if (!themeId) return;

  const response = await axios.post("/api/theme/like", {
    themeId,
  });
  return response.data;
};

export const themeDislike = async (themeId: string) => {
  if (!themeId) return;

  const response = await axios.post("/api/theme/dislike", {
    themeId,
  });
  return response.data;
};

export const themeSave = async (themeId: string) => {
  if (!themeId) return;

  const response = await axios.post("/api/theme/save", {
    themeId,
  });
  return response.data;
};

export const themeUnsave = async (themeId: string) => {
  if (!themeId) return;

  const response = await axios.post("/api/theme/unsave", {
    themeId,
  });
  return response.data;
};
