import axios from "axios";

export const managePurchase = async (sessionId: string) => {
  const apiUrl = "/api/manage-purchases";
  const response = await axios.post(apiUrl, {
    sessionId: sessionId,
  });

  return response.data;
};

export const buyPupa = async () => {
  const apiUrl = "/api/checkout";
  const response = await axios.post(apiUrl);

  return response.data;
};
