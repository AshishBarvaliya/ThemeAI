import axios from "axios";

export const toggleThemeLike = async (themeId: string) => {
  try {
    const response = await axios.post("/api/likeTheme", {
      themeId,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to toggle like", error);
  }
};

export const toggleThemeSave = async (themeId: string) => {
  try {
    const response = await axios.post("/api/saveTheme", {
      themeId,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to toggle save", error);
  }
};
