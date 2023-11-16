import axios from "axios";

export const buyPupa = async () => {
  const apiUrl = "/api/checkout";
  const response = await axios.post(apiUrl);

  return response.data;
};
