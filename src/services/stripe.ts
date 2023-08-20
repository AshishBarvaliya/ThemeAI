import axios from "axios";

export const managePurchase = async (sessionId: string) => {
  const apiUrl = "/api/manage-purchases";

  try {
    const response = await axios.post(apiUrl, {
      sessionId: sessionId,
    });

    console.log(response);
  } catch (error) {
    console.log("Failed to manage stripe session");
  }
};

export const buyPupa = async () => {
  const apiUrl = "/api/checkout";

  try {
    const response = await axios.post(apiUrl);

    console.log(response);
  } catch (error) {
    console.log("Failed to create stripe session");
  }
};
