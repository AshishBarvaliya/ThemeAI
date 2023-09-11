import LearningTemplate from "@/assets/templates/learning/learning";
import ColorPicker from "@/components/color-picker";
import FontPicker from "@/components/font-picker";
import { Button } from "@/components/ui/button";
import { FontProps, GOOGLE_FONTS } from "@/constants/fonts";
import { ColorsProps } from "@/interfaces/theme";
import { generateAllShades } from "@/lib/utils";
import { useState } from "react";

const CreateTheme = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [fonts, setFonts] = useState<{
    primary: FontProps;
    secondary: FontProps;
  }>({
    primary: GOOGLE_FONTS[0],
    secondary: GOOGLE_FONTS[1],
  });
  const [colors, setColors] = useState<ColorsProps>({
    bg: "#ffffff",
    primary: "#1C1C1C",
    accent: "#1B1AFF",
    extra: "#FFBB37",
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-end border-b border-border bg-background gap-4 p-4 items-center">
        <ColorPicker
          id="bgcolor"
          name="Background Color"
          color={colors.bg}
          setColor={(color) => setColors({ ...colors, bg: color })}
          open={open}
          setOpen={setOpen}
        />
        <ColorPicker
          id="primarycolor"
          name="Font Color"
          color={colors.primary}
          setColor={(color) => setColors({ ...colors, primary: color })}
          open={open}
          setOpen={setOpen}
        />
        <ColorPicker
          id="accentcolor"
          name="Accent Color"
          color={colors.accent}
          setColor={(color) => setColors({ ...colors, accent: color })}
          open={open}
          setOpen={setOpen}
        />
        <ColorPicker
          id="complementarycolor"
          name="Complementry Color"
          color={colors.extra}
          setColor={(color) => setColors({ ...colors, extra: color })}
          open={open}
          setOpen={setOpen}
        />
        <FontPicker
          id="primaryfont"
          name="Primary Font"
          selectedFont={fonts.primary}
          setSelectedFont={(font) => setFonts({ ...fonts, primary: font })}
        />
        <FontPicker
          id="secondaryfont"
          name="Secondary Font"
          selectedFont={fonts.secondary}
          setSelectedFont={(font) => setFonts({ ...fonts, secondary: font })}
        />
        <div className="flex gap-4 ml-20">
          <Button onClick={() => {}}>Save</Button>
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>
        </div>
      </div>
      <div className="flex">
        <LearningTemplate
          colors={colors}
          shades={generateAllShades(colors)}
          fonts={fonts}
        />
      </div>
    </div>
  );
};

export default CreateTheme;
