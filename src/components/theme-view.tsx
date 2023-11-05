import LearningTemplate from "@/assets/templates/learning/learning-mini";
import MarketingTemplate from "@/assets/templates/marketing/marketing-mini";
import { AwardIcon } from "@/components/award-icon";
import { ExportThemeDialog } from "@/components/export-theme-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { FontProps, GOOGLE_FONTS } from "@/constants/fonts";
import { USER_LEVELS } from "@/constants/user";
import { ColorsProps, FontObjProps, ShadesProps } from "@/interfaces/theme";
import { generateAllShades } from "@/lib/utils";
import NiceAvatar from "react-nice-avatar";
import { DownloadIcon, Pen, RefreshCcw } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useHelpers } from "@/hooks/useHelpers";
import { SaveGeneratedThemeDialog } from "./save-generated-theme-dialog";

interface ThemeVeiwProps {
  theme: {
    name?: string;
    color_1: string;
    color_1_reason: string;
    color_2: string;
    color_2_reason: string;
    color_3: string;
    color_3_reason: string;
    color_4: string;
    color_4_reason: string;
    font_1: string;
    font_2: string;
    template?: string;
    user?: {
      id: string;
      name: string;
      avatar: string;
      image: string;
      level: number;
      experience: number;
      createdThemes: any[];
    };
  };
  type?: "view" | "generated";
  prompt?: string;
  isDark?: boolean;
}

export const ThemeView: React.FC<ThemeVeiwProps> = ({
  theme,
  type = "view",
  prompt = "",
  isDark = false,
}) => {
  const router = useRouter();
  const { setGenerateThemeDialog } = useHelpers();
  const [openExportThemeDialog, setOpenExportThemeDialog] = useState(false);
  const [openSaveThemeDialog, setOpenSaveThemeDialog] = useState(false);

  const colorsList = [
    {
      name: "Background Color",
      color: theme?.color_1 ?? "",
      reason: theme?.color_1_reason ?? "",
    },
    {
      name: "Primary Color",
      color: theme?.color_2 ?? "",
      reason: theme?.color_2_reason ?? "",
    },
    {
      name: "Accent Color",
      color: theme?.color_3 ?? "",
      reason: theme?.color_3_reason ?? "",
    },
    {
      name: "Complementary Color",
      color: theme?.color_4 ?? "",
      reason: theme?.color_4_reason ?? "",
    },
  ];

  const colors: ColorsProps = {
    bg: theme?.color_1 ?? "",
    primary: theme?.color_2 ?? "",
    accent: theme?.color_3 ?? "",
    extra: theme?.color_4 ?? "",
  };

  const fonts: FontObjProps = {
    primary: GOOGLE_FONTS.find(
      (font) => font.fontFamily === theme?.font_1
    ) as FontProps,
    secondary: GOOGLE_FONTS.find(
      (font) => font.fontFamily === theme?.font_2
    ) as FontProps,
  };

  const shades = theme ? generateAllShades(colors) : ({} as ShadesProps);

  const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadHandler);
    return window.removeEventListener("beforeunload", beforeUnloadHandler);
  }, []);

  return theme ? (
    <div className="flex flex-col w-full my-6 border-[0.5px] border-border bg-white mx-36 p-[30px] px-[40px]">
      <div className="flex justify-between items-center">
        <Typography element="h2" as="h2">
          {type === "view" ? theme.name : "Untitled"}
          {type === "generated" && (
            <span className="italic text-sm font-normal px-2">
              {"[Unsaved]"}
            </span>
          )}
        </Typography>
        {type === "view" ? (
          <div className="flex gap-3">
            <Button
              variant={"outline"}
              size={"md"}
              onClick={() => setOpenExportThemeDialog(true)}
            >
              <DownloadIcon className="h-4 w-4 mr-1.5" /> Export
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button
              variant={"outline"}
              size={"md"}
              onClick={() => setGenerateThemeDialog(true)}
            >
              <RefreshCcw className="h-3 w-3 mr-1.5" /> Regenerate new
            </Button>
            <Button
              size={"md"}
              onClick={() => router.push(`/themes/create?generated=1`)}
            >
              <Pen className="h-3 w-3 mr-1.5" />
              Edit
            </Button>
            <Button size={"md"} onClick={() => setOpenSaveThemeDialog(true)}>
              Save theme
            </Button>
          </div>
        )}
      </div>
      <div className="flex gap-4 py-4">
        <div className="w-1/2 flex flex-col gap-4">
          {theme.template === "marketing" ? (
            <MarketingTemplate colors={colors} shades={shades} fonts={fonts} />
          ) : (
            <LearningTemplate colors={colors} shades={shades} fonts={fonts} />
          )}
          {type === "view" && theme.user ? (
            <div className="flex gap-3 border-[0.5px] border-border p-2">
              <Avatar
                className="flex rounded-[6px] h-12 w-12 border-[0.5px] bg-primary border-border"
                onClick={() => router.push(`/user/${theme.user?.id}`)}
              >
                {theme.user.avatar ? (
                  <NiceAvatar
                    className="h-12 w-12 rounded-md"
                    shape="square"
                    {...JSON.parse(theme.user.avatar)}
                  />
                ) : (
                  <>
                    <AvatarImage src={theme.user.image} alt="profile image" />
                    <AvatarFallback className="flex bg-primary text-primary-foreground text-xl">
                      {theme.user.name.split(" ")[0][0]}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div className="flex flex-col justify-between flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg">{theme.user.name}</p>
                  <AwardIcon
                    level={theme.user.level}
                    className="h-5 w-5"
                    info={USER_LEVELS[theme.user.level].name}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Typography element={"p"} as="p" className="text-xs">
                      {theme.user.createdThemes?.length}
                      <span className="text-primary-foreground/70 ml-1">
                        Themes
                      </span>
                    </Typography>
                    <DotFilledIcon className="h-3 w-3" />
                    <Typography element={"p"} as="p" className="text-xs">
                      {theme.user.experience}
                      <span className="text-primary-foreground/70 ml-1">
                        Experiences
                      </span>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  size="md"
                  onClick={() => router.push("/user/" + theme.user?.id)}
                  variant={"outline"}
                >
                  View
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          {colorsList.map((clr) => (
            <div className="flex flex-1 gap-4" key={clr.name}>
              <Typography element="p" as="p" className="italic flex-1">
                {`"${clr.reason}"`}
              </Typography>
              <div
                className="h-24 w-10 shadow-md"
                style={{ backgroundColor: clr.color }}
              />
            </div>
          ))}
        </div>
      </div>
      {type === "view" && (
        <ExportThemeDialog
          open={openExportThemeDialog}
          setOpen={setOpenExportThemeDialog}
          fonts={fonts}
          colors={colors}
        />
      )}
      <SaveGeneratedThemeDialog
        open={openSaveThemeDialog}
        setOpen={setOpenSaveThemeDialog}
        generatedTheme={{
          color_1: theme.color_1,
          color_2: theme.color_2,
          color_3: theme.color_3,
          color_4: theme.color_4,
          primary: theme.font_1,
          secondary: theme.font_2,
          color_1_reason: theme.color_1_reason,
          color_2_reason: theme.color_2_reason,
          color_3_reason: theme.color_3_reason,
          color_4_reason: theme.color_4_reason,
          isDark: isDark,
          prompt: prompt,
        }}
      />
    </div>
  ) : null;
};
