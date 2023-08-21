import axios from "axios";

export const getUser = async (id: string) => {
  const apiUrl = `/api/user?id=${id}`;

  try {
    const response = await axios.get(apiUrl);

    console.log(response);
  } catch (error) {
    console.log("Failed to fetch user");
  }
};

export const toggleFollowing = async (userId: string) => {
  const apiUrl = `/api/follow-user`;

  try {
    const response = await axios.post(apiUrl, {
      userId,
    });

    console.log(response);
  } catch (error) {
    console.log("Failed to toggle follow user");
  }
};
