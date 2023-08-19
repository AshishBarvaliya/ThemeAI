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
