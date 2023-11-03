import axios from "axios";

export const createSupportTicket = async (
  name: string,
  email: string,
  topic: string,
  description: string
) => {
  const response = await axios.post("/api/contact-us", {
    name,
    email,
    topic,
    description,
  });
  return response.data;
};
