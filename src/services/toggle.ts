import axios from "axios";

export const toggleThemeLike = async (themeId: string) => {
  try {
    const response = await axios.post("/api/like-theme", {
      themeId,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to toggle like", error);
  }
};

export const toggleThemeSave = async (themeId: string) => {
  try {
    const response = await axios.post("/api/save-theme", {
      themeId,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to toggle save", error);
  }
};

export const setMarkAsUnappropriate = async (themeId: string) => {
  try {
    const response = await axios.post("/api/theme-unappropriate", {
      themeId,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to toggle save", error);
  }
};
