import { GeneratedThemeProps } from "@/interfaces/theme";

export const getPrompt = ({
  mode,
  description,
}: {
  mode: GeneratedThemeProps["mode"];
  description: string;
}) => `Design a color scheme for a website based on the provided description. The color choices must be justified based on relevance to the website's content and the cultural context of the color. Adhere to the following guidelines:

- Follow the 60-30-10 rule for color distribution.
- Ensure color combinations comply with WCAG 2 Level AAA standards for contrast.
${
  mode === "Default"
    ? `- Represent colors in HEX code format (ex. #FFFFFF).
- Reason should at least 20 words and not have more than 30 words.`
    : `- Design for ${mode === "Dark" ? "Dark" : "Light"} theme mode.
- Represent colors in HEX code format (ex. #FFFFFF).
- Reason should at least 20 words and not have more than 30 words.`
}

Description: ${description}

Colors:

1. Background color (60%)
2. Primary/Font color (30%)
3. Accent color (for buttons & actions, 10%)
4. Complementary color

output format: JSON with keys: bg, primary, accent, complementary and their reasons bg_reason, primary_reason, accent_reason, complementary_reason`;
