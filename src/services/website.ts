import { GeneratedThemeProps } from "@/interfaces/theme";
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

export const sendFeedback = async (
  generatedTheme: GeneratedThemeProps,
  feedback: "POSITIVE" | "NEGATIVE"
) => {
  const response = await axios.post("/api/feedback", {
    ...generatedTheme,
    feedback,
  });
  return response.data;
};
