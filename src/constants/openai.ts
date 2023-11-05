export const getPrompt = ({
  isDark,
  description,
}: {
  isDark: boolean;
  description: string;
}) => `Design a color scheme for a website based on the provided description. The color choices must be justified based on relevance to the website's content and the cultural context of the color. Adhere to the following guidelines:

- Follow the 60-30-10 rule for color distribution.
- Ensure color combinations comply with WCAG 2 Level AAA standards for contrast.
- Design for ${isDark ? "Dark" : "Light"} mode.
- Represent colors in HEX format.
- Reason should at least 10 words and not have more than 20 words.

Description: ${description}

Colors:

1. Background color (60%)
2. Primary/Font color (30%)
3. Accent color (for buttons & actions, 10%)
4. Complementary color
`;
