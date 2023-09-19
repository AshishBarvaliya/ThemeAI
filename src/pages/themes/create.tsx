import LearningTemplate from "@/assets/templates/learning/learning";
import ColorPicker from "@/components/color-picker";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { ExportThemeDialog } from "@/components/export-theme-dialog";
import FontPicker from "@/components/font-picker";
import { SaveThemeDialog } from "@/components/save-theme-dialog";
import { Button } from "@/components/ui/button";
import { GOOGLE_FONTS } from "@/constants/fonts";
import { ColorsProps, FontObjProps } from "@/interfaces/theme";
import { generateAllShades } from "@/lib/utils";
import { ArrowLeftIcon, DownloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const defaultColors = {
  bg: "#FFFFFF",
  primary: "#1C1C1C",
  accent: "#1B1AFF",
  extra: "#FFBB37",
};

const CreateTheme = () => {
  const [openColorPicker, setOpenColorPicker] = useState<string | null>(null);
  const [openSaveThemeDialog, setOpenSaveThemeDialog] = useState(false);
  const [openExportThemeDialog, setOpenExportThemeDialog] = useState(false);
  const [openSure, setOpenSure] = useState(false);
  const [fonts, setFonts] = useState<FontObjProps>({
    primary: GOOGLE_FONTS[0],
    secondary: GOOGLE_FONTS[1],
  });
  const [colors, setColors] = useState<ColorsProps>(defaultColors);

  return (
    <div className="flex flex-1 flex-col">
      <div
        className="flex fixed justify-between border-b border-border bg-background gap-4 p-4 items-center w-full"
        style={{ maxWidth: "calc(1536px - 300px)" }}
      >
        <Button
          onClick={() => {
            const unsaved = Object.keys(colors).some(
              (key) =>
                colors[key as keyof ColorsProps] !==
                defaultColors[key as keyof ColorsProps]
            );
            if (unsaved) {
              setOpenSure(true);
            } else {
              history.back();
            }
          }}
          variant="circle"
          size={"circle"}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <div className="flex flex-1 gap-4 pl-8">
          <ColorPicker
            id="bgcolor"
            name="Background Color"
            color={colors.bg}
            setColor={(color) => setColors({ ...colors, bg: color })}
            open={openColorPicker}
            setOpen={setOpenColorPicker}
          />
          <ColorPicker
            id="primarycolor"
            name="Font Color"
            color={colors.primary}
            setColor={(color) => setColors({ ...colors, primary: color })}
            open={openColorPicker}
            setOpen={setOpenColorPicker}
          />
          <ColorPicker
            id="accentcolor"
            name="Accent Color"
            color={colors.accent}
            setColor={(color) => setColors({ ...colors, accent: color })}
            open={openColorPicker}
            setOpen={setOpenColorPicker}
          />
          <ColorPicker
            id="complementarycolor"
            name="Complementry Color"
            color={colors.extra}
            setColor={(color) => setColors({ ...colors, extra: color })}
            open={openColorPicker}
            setOpen={setOpenColorPicker}
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
        </div>
        <div className="flex gap-4">
          <Button
            variant={"outline"}
            onClick={() => setOpenExportThemeDialog(true)}
          >
            <DownloadIcon className="h-5 w-5 mr-2" /> Export
          </Button>
          <Button
            onClick={() => {
              setOpenSaveThemeDialog(true);
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="flex mt-24">
        <LearningTemplate
          colors={colors}
          shades={generateAllShades(colors)}
          fonts={fonts}
        />
      </div>
      <SaveThemeDialog
        open={openSaveThemeDialog}
        fonts={fonts}
        colors={colors}
        setOpen={setOpenSaveThemeDialog}
      />
      <ConfirmationDialog
        open={openSure}
        setOpen={setOpenSure}
        onYes={() => {
          history.back();
          setOpenSure(false);
        }}
      >
        <div className="text-lg">
          You have unsaved changes. are you sure want to leave?
        </div>
      </ConfirmationDialog>
      <ExportThemeDialog
        open={openExportThemeDialog}
        setOpen={setOpenExportThemeDialog}
        fonts={fonts}
        colors={colors}
      />
    </div>
  );
};

export default CreateTheme;
