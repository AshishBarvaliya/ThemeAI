import { ThemeView } from "@/components/theme-view";
import { useHelpers } from "@/hooks/useHelpers";

const defaultFonts = {
  font_1: "Inter",
  font_2: "Inter",
};

export default function GeneratedTheme() {
  const { generatedTheme } = useHelpers();

  return generatedTheme ? (
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
        ...{ likedBy: [], savedBy: [] },
      }}
      prompt={generatedTheme.prompt}
      isDark={generatedTheme.isDark}
      type="generated"
    />
  ) : (
    <div>No generated theme available</div>
  );
}
