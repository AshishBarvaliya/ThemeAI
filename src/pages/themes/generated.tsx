import { RestrictedPage } from "@/components/restricted-page";
import { ThemeView } from "@/components/theme-view";
import { useHelpers } from "@/hooks/useHelpers";
import Head from "next/head";

const defaultFonts = {
  font_1: "Roboto",
  font_2: "Poppins",
};

export default function GeneratedTheme() {
  const { generatedTheme } = useHelpers();

  return generatedTheme ? (
    <>
      <Head>
        <title property="og:title">Generated theme - ThemeAI</title>
        <meta
          name="description"
          property="og:description"
          content="Your theme has been generated! Share it with others!"
        />
        <meta property="og:image" content="/og/hero.png" />
      </Head>
      <ThemeView
        theme={{
          ...{
            color_1: generatedTheme.color_1,
            color_1_reason: generatedTheme.color_1_reason,
            color_2: generatedTheme.color_2,
            color_2_reason: generatedTheme.color_2_reason,
            color_3: generatedTheme.color_3,
            color_3_reason: generatedTheme.color_3_reason,
            color_4: generatedTheme.color_4,
            color_4_reason: generatedTheme.color_4_reason,
          },
          ...defaultFonts,
          ...{ likedBy: [], savedBy: [], views: [], tags: [] },
        }}
        prompt={generatedTheme.prompt}
        isDark={generatedTheme.isDark}
        type="generated"
      />
    </>
  ) : (
    <RestrictedPage title={"Generated theme not found"} errorCode={404} />
  );
}
