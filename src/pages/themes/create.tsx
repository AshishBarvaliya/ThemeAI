import ColorPicker from "@/components/color-picker";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { ExportThemeDialog } from "@/components/export-theme-dialog";
import FontPicker from "@/components/font-picker";
import { SaveThemeDialog } from "@/components/save-theme-dialog";
import { templates } from "@/components/template-list";
import { Button } from "@/components/ui/button";
import { FontProps, GOOGLE_FONTS } from "@/constants/fonts";
import { DEAFULT_THEMES } from "@/constants/templates";
import { useHelpers } from "@/hooks/useHelpers";
import { ColorsProps, FontObjProps } from "@/interfaces/theme";
import { getTemplate } from "@/lib/templates";
import { cn, generateAllShades } from "@/lib/utils";
import { getThemeById } from "@/services/theme";
import { ArrowLeftIcon, DownloadIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronUpIcon, RotateCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const templatesDefaultColors = {
  bg: "#FFFFFF",
  primary: "#1C1C1C",
  accent: "#1B1AFF",
  extra: "#FFBB37",
};

const defaultFonts = {
  primary: {
    fontFamily: "Roboto",
    weights: ["100", "300", "400", "500", "700", "900"],
  },
  secondary: GOOGLE_FONTS[1],
};

const CreateTheme = () => {
  const router = useRouter();
  const { status } = useSession();
  const {
    template,
    generatedTheme,
    setTemplate,
    runIfLoggedInElseOpenLoginDialog,
  } = useHelpers();
  const [openColorPicker, setOpenColorPicker] = useState<string | null>(null);
  const [openSaveThemeDialog, setOpenSaveThemeDialog] = useState(false);
  const [openExportThemeDialog, setOpenExportThemeDialog] = useState(false);
  const [openSure, setOpenSure] = useState(false);
  const [defaultColors, setDefaultColors] = useState<ColorsProps>(
    templatesDefaultColors
  );
  const [fonts, setFonts] = useState<FontObjProps>(defaultFonts);
  const [colors, setColors] = useState<ColorsProps>(defaultColors);
  const [isLocked, setIsLocked] = useState({
    bg: false,
    primary: false,
    accent: false,
    extra: false,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [openTemplates, setOpenTemplates] = useState(false);

  const { data: theme } = useQuery(
    ["theme", router.query.theme],
    () => getThemeById(router.query.theme as string),
    {
      enabled: !!router.query.theme,
    }
  );

  useEffect(() => {
    if (router.query.generated !== "1" && !theme) {
      if (!isDirty) {
        setColors(DEAFULT_THEMES[template].colors);
      }
      setDefaultColors(DEAFULT_THEMES[template].colors);
    }
  }, [template]);

  useEffect(() => {
    if (router.query.generated === "1") {
      if (generatedTheme && status === "authenticated") {
        setDefaultColors({
          bg: generatedTheme.color_1,
          primary: generatedTheme.color_2,
          accent: generatedTheme.color_3,
          extra: generatedTheme.color_4,
        });
        setColors({
          bg: generatedTheme.color_1,
          primary: generatedTheme.color_2,
          accent: generatedTheme.color_3,
          extra: generatedTheme.color_4,
        });
      } else {
        router.push("/themes/create", undefined, { shallow: true });
      }
    } else if (router.query.theme) {
    } else {
      setDefaultColors(templatesDefaultColors);
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
    if (theme) {
      setColors({
        bg: theme.color_1,
        primary: theme.color_2,
        accent: theme.color_3,
        extra: theme.color_4,
      });
      setFonts({
        primary: GOOGLE_FONTS.find(
          (font) => font.fontFamily === theme?.font_1
        ) as FontProps,
        secondary: GOOGLE_FONTS.find(
          (font) => font.fontFamily === theme?.font_2
        ) as FontProps,
      });
      setDefaultColors({
        bg: theme.color_1,
        primary: theme.color_2,
        accent: theme.color_3,
        extra: theme.color_4,
      });
      setIsDirty(true);
    }
  }, [theme]);

  useEffect(() => {
    setIsDirty(
      (!isLocked.bg && colors.bg !== defaultColors.bg) ||
        (!isLocked.primary && colors.primary !== defaultColors.primary) ||
        (!isLocked.accent && colors.accent !== defaultColors.accent) ||
        (!isLocked.extra && colors.extra !== defaultColors.extra)
    );
  }, [colors, isLocked, defaultColors]);

  const isGenerated = generatedTheme && router.query.generated == "1";

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title property="og:title">Create theme - ThemeAI</title>
        <meta
          name="description"
          property="og:description"
          content="Create your theme with ThemeAI"
        />
        <meta property="og:image" content="/og/create.png" />
      </Head>
      <div className="flex flex-1 flex-col">
        <div
          className="flex fixed flex-col md:flex-row justify-between border-b-[0.5px] border-border bg-background gap-4 p-3 px-5 items-center z-40 shadow-md md:shadow-md"
          style={{
            maxWidth: "calc(1536px - 250px)",
            width: isMobileView ? "100%" : "calc(100vw - 250px)",
          }}
        >
          <div className="flex gap-2.5 md:gap-3.5">
            <div className="flex gap-2.5 md:gap-3.5 items-center w-[140px]">
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
                aria-label="Go back"
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
                      extra: isLocked.extra
                        ? colors.extra
                        : defaultColors.extra,
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
            <div className="flex gap-2.5 md:gap-3.5">
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
                setIsLocked={(val) =>
                  setIsLocked({ ...isLocked, primary: val })
                }
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
          </div>
          <div className="flex flex-1 gap-2.5 md:gap-3.5 md:ml-5">
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
              setSelectedFont={(font) =>
                setFonts({ ...fonts, secondary: font })
              }
            />
          </div>
          <div className="hidden md:flex gap-4">
            <Button
              variant={"outline"}
              onClick={() => setOpenExportThemeDialog(true)}
            >
              <DownloadIcon className="h-4 w-4 mr-1.5" /> Export
            </Button>
            <Button
              onClick={() => {
                runIfLoggedInElseOpenLoginDialog(() =>
                  setOpenSaveThemeDialog(true)
                );
              }}
            >
              Save
            </Button>
          </div>
          <div className="flex md:hidden items-center gap-4 bottom-0 fixed bg-background w-full justify-between py-3 border-border border-t-[0.5px]">
            {openTemplates ? (
              <div className="flex bg-background absolute -mt-[190px] w-full flex-row gap-4 px-4 py-3 border-t-[0.5px] border-border flex-1 overflow-y-auto">
                {templates.map((item) => (
                  <div
                    key={item.name}
                    className={cn(
                      "min-w-[150px] border-border border-[0.5px] shadow-md cursor-pointer hover:ring-1",
                      item.name === template ? "ring-1 ring-primary" : ""
                    )}
                    onClick={() => setTemplate(item.name)}
                  >
                    {item.component}
                    <div className="text-base text-center bg-primary text-primary-foreground border-border border-t-[0.5px]">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <div
              className="flex ml-4 text-sm items-center text-primary-foreground bg-white px-2 py-1 border-[0.5px] border-border shadow-sm"
              onClick={() => setOpenTemplates(!openTemplates)}
            >
              Templates
              {openTemplates ? (
                <ChevronUpIcon className="h-4 w-4 ml-1.5" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 ml-1.5" />
              )}
            </div>
            <div className="flex gap-4 pr-4">
              <Button
                variant={"outline"}
                onClick={() => setOpenExportThemeDialog(true)}
              >
                <DownloadIcon className="h-4 w-4 mr-1.5" /> Export
              </Button>
              <Button
                onClick={() => {
                  runIfLoggedInElseOpenLoginDialog(() =>
                    setOpenSaveThemeDialog(true)
                  );
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="flex mt-[135px] md:mt-[72px] mb-[55px] md:mb-0">
          {getTemplate(template, {
            id: template + "-create",
            fonts,
            colors,
            shades: generateAllShades(colors),
          })}
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
          <div className="text-base">
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
    </>
  );
};

export default CreateTheme;
