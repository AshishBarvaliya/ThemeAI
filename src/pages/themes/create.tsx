import MarketingTemplate from "@/assets/templates/marketing/marketing";
import ColorPicker from "@/components/color-picker";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { ExportThemeDialog } from "@/components/export-theme-dialog";
import FontPicker from "@/components/font-picker";
import { SaveThemeDialog } from "@/components/save-theme-dialog";
import { Button } from "@/components/ui/button";
import { GOOGLE_FONTS } from "@/constants/fonts";
import { useHelpers } from "@/hooks/useHelpers";
import { ColorsProps, FontObjProps } from "@/interfaces/theme";
import { generateAllShades } from "@/lib/utils";
import { ArrowLeftIcon, DownloadIcon } from "@radix-ui/react-icons";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const templatesDefaultColors = [
  {
    bg: "#FFFFFF",
    primary: "#1C1C1C",
    accent: "#1B1AFF",
    extra: "#FFBB37",
  },
  {
    bg: "#FFFFFF",
    primary: "#000000",
    accent: "#B9FF66",
    extra: "#FFBB37",
  },
];

const defaultFonts = [
  {
    primary: GOOGLE_FONTS[0],
    secondary: GOOGLE_FONTS[1],
  },
  {
    primary: {
      fontFamily: "Space Grotesk",
      weights: ["300", "400", "500", "600", "700"],
    },
    secondary: GOOGLE_FONTS[1],
  },
];

const CreateTheme = () => {
  const router = useRouter();
  const { generatedTheme } = useHelpers();
  const [openColorPicker, setOpenColorPicker] = useState<string | null>(null);
  const [openSaveThemeDialog, setOpenSaveThemeDialog] = useState(false);
  const [openExportThemeDialog, setOpenExportThemeDialog] = useState(false);
  const [openSure, setOpenSure] = useState(false);
  const [defaultColors, setDefaultColors] = useState<ColorsProps>(
    templatesDefaultColors[0]
  );
  const [fonts, setFonts] = useState<FontObjProps>(defaultFonts[0]);
  const [colors, setColors] = useState<ColorsProps>(defaultColors);
  const [isLocked, setIsLocked] = useState({
    bg: false,
    primary: false,
    accent: false,
    extra: false,
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setColors(defaultColors);
  }, [defaultColors]);

  useEffect(() => {
    if (router.query.generated == "1") {
      if (generatedTheme) {
        setDefaultColors({
          bg: generatedTheme.color_1,
          primary: generatedTheme.color_2,
          accent: generatedTheme.color_3,
          extra: generatedTheme.color_4,
        });
      } else {
        router.push("/themes/create", undefined, { shallow: true });
      }
    } else {
      setDefaultColors(templatesDefaultColors[0]);
    }
    setIsLocked({
      bg: false,
      primary: false,
      accent: false,
      extra: false,
    });
    setIsDirty(false);
  }, [router]);

  useEffect(() => {
    setIsDirty(
      (!isLocked.bg && colors.bg !== defaultColors.bg) ||
        (!isLocked.primary && colors.primary !== defaultColors.primary) ||
        (!isLocked.accent && colors.accent !== defaultColors.accent) ||
        (!isLocked.extra && colors.extra !== defaultColors.extra)
    );
  }, [colors, isLocked, defaultColors]);

  const isGenerated = generatedTheme && router.query.generated == "1";

  return (
    <div className="flex flex-1 flex-col">
      <div
        className="flex fixed justify-between border-b-[0.5px] border-border bg-background gap-4 p-3 px-5 items-center z-40 shadow-md"
        style={{
          maxWidth: "calc(1536px - 250px)",
          width: "calc(100vw - 250px)",
        }}
      >
        <div className="flex gap-3.5 items-center w-[140px]">
          <Button
            onClick={() => {
              if (isDirty) {
                setOpenSure(true);
              } else {
                history.back();
              }
            }}
            variant="circle"
            size={"circle"}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          {isDirty ? (
            <Button
              onClick={() => {
                setColors({
                  bg: isLocked.bg ? colors.bg : defaultColors.bg,
                  primary: isLocked.primary
                    ? colors.primary
                    : defaultColors.primary,
                  accent: isLocked.accent
                    ? colors.accent
                    : defaultColors.accent,
                  extra: isLocked.extra ? colors.extra : defaultColors.extra,
                });
                setIsDirty(false);
              }}
              size={"md"}
            >
              <RotateCcw className="h-3 w-3 mr-1.5" />
              Reset
            </Button>
          ) : null}
        </div>
        <div className="flex gap-3.5">
          <ColorPicker
            id="bgcolor"
            name="Background Color"
            color={colors.bg}
            setColor={(color) => setColors({ ...colors, bg: color })}
            open={openColorPicker}
            setOpen={setOpenColorPicker}
            isLocked={isLocked.bg}
            setIsLocked={(val) => setIsLocked({ ...isLocked, bg: val })}
          />
          <ColorPicker
            id="primarycolor"
            name="Font Color"
            color={colors.primary}
            setColor={(color) => setColors({ ...colors, primary: color })}
            open={openColorPicker}
            setOpen={setOpenColorPicker}
            isLocked={isLocked.primary}
            setIsLocked={(val) => setIsLocked({ ...isLocked, primary: val })}
          />
          <ColorPicker
            id="accentcolor"
            name="Accent Color"
            color={colors.accent}
            setColor={(color) => setColors({ ...colors, accent: color })}
            open={openColorPicker}
            setOpen={setOpenColorPicker}
            isLocked={isLocked.accent}
            setIsLocked={(val) => setIsLocked({ ...isLocked, accent: val })}
          />
          <ColorPicker
            id="complementarycolor"
            name="Complementry Color"
            color={colors.extra}
            setColor={(color) => setColors({ ...colors, extra: color })}
            open={openColorPicker}
            setOpen={setOpenColorPicker}
            isLocked={isLocked.extra}
            setIsLocked={(val) => setIsLocked({ ...isLocked, extra: val })}
          />
        </div>
        <div className="flex flex-1 gap-3.5 ml-5">
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
            <DownloadIcon className="h-4 w-4 mr-1.5" /> Export
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
      <div className="flex mt-[72px]">
        <MarketingTemplate
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
        isDirty={isDirty}
        defaultData={
          isGenerated
            ? {
                color_1_reason: generatedTheme?.color_1_reason,
                color_2_reason: generatedTheme?.color_2_reason,
                color_3_reason: generatedTheme?.color_3_reason,
                color_4_reason: generatedTheme?.color_4_reason,
                isDark: generatedTheme?.isDark,
                prompt: generatedTheme?.prompt,
              }
            : undefined
        }
      />
      <ConfirmationDialog
        open={openSure}
        setOpen={setOpenSure}
        onYes={() => {
          history.back();
          setOpenSure(false);
        }}
      >
        <div className="text-md">
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
