import axios from "axios";

export const toggleThemeLike = async (userId: string, themeId: string) => {
  try {
    const response = await axios.post("/api/likeTheme", {
      userId,
      themeId,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to toggle like", error);
  }
};

export const toggleThemeSave = async (userId: string, themeId: string) => {
  try {
    const response = await axios.post("/api/saveTheme", {
      userId,
      themeId,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to toggle save", error);
  }
};
