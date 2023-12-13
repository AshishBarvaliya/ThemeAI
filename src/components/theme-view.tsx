import LearningTemplate from "@/assets/templates/learning/learning-mini";
import MarketingTemplate from "@/assets/templates/marketing/marketing-mini";
import { ExportThemeDialog } from "@/components/export-theme-dialog";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { FontProps, GOOGLE_FONTS } from "@/constants/fonts";
import { ColorsProps, FontObjProps, ShadesProps } from "@/interfaces/theme";
import { cn, generateAllShades, getLuminance } from "@/lib/utils";
import {
  ArrowLeftIcon,
  Copy,
  CopyCheck,
  DownloadIcon,
  Flag,
  Pen,
  RefreshCcw,
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHelpers } from "@/hooks/useHelpers";
import { SaveGeneratedThemeDialog } from "./save-generated-theme-dialog";
import { Feedback } from "./feedback";

import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { setMarkAsInappropriate } from "@/services/toggle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { ThemeViewUser } from "./theme-view-user";
import { getTags } from "@/services/theme";
import { ThemeViewStats } from "./theme-view-stats";
import Carousel from "./ui/carousel";
import DashboardTemplate from "@/assets/templates/dashboard/dashboard-mini";
import MagicWand from "@/assets/svgs/magic-wand";
import EditorTemplate from "@/assets/templates/editor/editor-mini";
import FoodieTemplate from "@/assets/templates/foodie/foodie-mini";
import { ConfirmationDialog } from "./confirmation-dialog";

export interface ThemeVeiwProps {
  theme: {
    id?: string;
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
    isAIGenerated?: boolean;
    template?: string;
    prompt?: string;
    createdAt?: Date;
    likedBy: { userId: string }[];
    savedBy: { userId: string }[];
    views: { id: string }[];
    tags: { tagId: string }[];
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
  const { addToast } = useToast();
  const {
    setGenerateThemeDialog,
    runIfLoggedInElseOpenLoginDialog,
    setGenerateDialogDefaultValues,
  } = useHelpers();
  const [openExportThemeDialog, setOpenExportThemeDialog] = useState(false);
  const [openSaveThemeDialog, setOpenSaveThemeDialog] = useState(false);
  const [openSure, setOpenSure] = useState(false);
  const [copied, setCopied] = useState<null | string>(null);
  const { data: tags } = useQuery(["tags"], getTags);

  const { mutate: mutateMarkAsInappropriateTheme } = useMutation({
    mutationFn: (themeId: string) => setMarkAsInappropriate(themeId),
    onSuccess: () => {
      addToast({
        title: "Mark as inappropriated successfully",
        type: "success",
      });
    },
  });

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
    <div
      className="lg:divWithDotsBackground flex w-full bg-white/50"
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="rgb(73, 73, 73)" /></svg>')`,
      }}
    >
      <div className="flex w-full mx-auto flex-col overflow-y-scroll pt-10 xl:pt-7">
        <div className="relative w-full">
          <Button
            onClick={() => {
              if (type === "generated") {
                setOpenSure(true);
              } else {
                router.back();
              }
            }}
            size="md"
            className="bg-background absolute ml-5 -mt-9 xl:mt-0"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
            Back
          </Button>
        </div>
        <div
          className="flex relative flex-col h-fit w-full mb-6 mx-auto p-[20px] bg-background px-[30px] max-w-[1000px] rounded-[8px]"
          style={{
            boxShadow:
              "6px 0 15px -3px rgb(0 0 0 / 0.1), -6px 0 15px -3px rgb(0 0 0 / 0.1), 0 6px 15px -3px rgb(0 0 0 / 0.1), 0 -6px 15px -3px rgb(0 0 0 / 0.1)",
          }}
        >
          <div
            className={cn(
              "flex justify-between gap-3",
              type === "generated" && "flex-col md:flex-row"
            )}
          >
            <Typography element="h1" as="h1" className="text-2xl md:text-4xl">
              {type === "view" ? theme.name : "Untitled"}
              {type === "generated" && (
                <span className="italic text-sm font-normal px-2">
                  {"[Unsaved]"}
                </span>
              )}
            </Typography>
            {type === "view" ? (
              <div className="flex gap-3 h-12 items-center">
                {theme?.isAIGenerated ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div>
                          <MagicWand className="h-4 w-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{"AI Generated"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
                <Button
                  variant={"outline"}
                  size={"md"}
                  onClick={() => setOpenExportThemeDialog(true)}
                >
                  <DownloadIcon className="h-4 w-4 mr-1.5" /> Export
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 h-12 items-center">
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div>
                        <MagicWand className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{"AI Generated"}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant={"outline"}
                  size={"md"}
                  onClick={() => {
                    setGenerateDialogDefaultValues({
                      prompt,
                      isDark,
                    });
                    setGenerateThemeDialog(true);
                  }}
                >
                  <RefreshCcw className="h-3 w-3 mr-1.5" /> Regenerate
                </Button>
                <Button
                  size={"md"}
                  onClick={() => router.push(`/themes/create?generated=1`)}
                >
                  <Pen className="h-3 w-3 mr-1.5" />
                  Edit
                </Button>
                <Button
                  size={"md"}
                  onClick={() => setOpenSaveThemeDialog(true)}
                >
                  Save theme
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5 py-4 flex-1">
            <div className="flex flex-col gap-2">
              {theme?.prompt ? (
                <Typography element="p" as="p" className="text-lg my-3">
                  <span className="font-bold pr-1 text-xl">Prompt:</span>
                  {theme.prompt}
                </Typography>
              ) : null}
              <Carousel autoSlide={false} bgColor={colors.bg}>
                <EditorTemplate
                  id="editor"
                  colors={colors}
                  shades={shades}
                  fonts={fonts}
                />
                <MarketingTemplate
                  id="marketing"
                  colors={colors}
                  shades={shades}
                  fonts={fonts}
                />
                <LearningTemplate
                  id="learning"
                  colors={colors}
                  shades={shades}
                  fonts={fonts}
                />
                <DashboardTemplate
                  id="dashboard"
                  colors={colors}
                  shades={shades}
                  fonts={fonts}
                />
                <FoodieTemplate
                  id="foodie"
                  colors={colors}
                  shades={shades}
                  fonts={fonts}
                />
              </Carousel>
              {type === "view" ? <ThemeViewStats theme={theme} /> : null}
            </div>
            <div className="flex flex-col gap-4">
              {colorsList.map((clr) => {
                const { color: lockColor, shade } = getLuminance(clr.color);

                return (
                  <div
                    className="flex flex-1 gap-4 border-[0.5px] border-border p-2 px-3 shadow-md bg-white/25"
                    key={clr.name}
                  >
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between">
                        <Typography
                          element="h4"
                          as="h4"
                          className="text-md md:text-lg"
                        >
                          {clr.name}
                        </Typography>
                        <TooltipProvider>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <div
                                className="h-8 w-24 shadow-md parent_hover"
                                style={{ backgroundColor: clr.color }}
                              >
                                <div
                                  className="m-0.5 flex items-center justify-center w-[18px] h-[18px] hidden_child cursor-pointer"
                                  style={{
                                    backgroundColor: shade,
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    navigator.clipboard.writeText(clr.color);
                                    setCopied(clr.color);
                                    setTimeout(() => {
                                      setCopied(null);
                                    }, 2000);
                                  }}
                                >
                                  {copied === clr.color ? (
                                    <CopyCheck
                                      className="w-4 h-4"
                                      style={{ color: lockColor }}
                                    />
                                  ) : (
                                    <Copy
                                      className="w-4 h-4"
                                      style={{ color: lockColor }}
                                    />
                                  )}
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>{clr.color}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Typography
                        element="p"
                        as="p"
                        className="italic text-sm md:text-md"
                      >
                        {clr.reason ? `"${clr.reason}"` : "Not specified"}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 flex-1 flex-col md:flex-row">
              {Object.keys(fonts).map((key) => (
                <div
                  key={key}
                  className="flex flex-1 border-[0.5px] border-border p-2 flex-col gap-2 shadow-md bg-white/25"
                >
                  <div className="flex items-center">
                    <Typography
                      element="h4"
                      as="h4"
                      className="text-md md:text-lg"
                    >
                      {key === "primary" ? "Primary Font" : "Secondary Font"}
                    </Typography>
                  </div>
                  <div
                    style={{
                      fontFamily: fonts[key as keyof FontObjProps].fontFamily,
                      backgroundColor:
                        key === "primary" ? "#f5dc98" : "#9ceeff",
                      wordBreak: "break-word",
                    }}
                    className="flex flex-col gap-1 relative p-1 h-[85px] w-full font-normal text-xl md:text-3xl text-center items-center justify-center border-[0.5px] border-border"
                  >
                    {fonts[key as keyof FontObjProps].fontFamily}
                    <p className="text-sm md:text-md">
                      The quick brown fox jumps over a lazy dog.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {theme.tags && theme.tags.length > 0 ? (
            <div className="flex gap-2 my-4">
              <span className="font-bold">Tags:</span>
              <div className="flex flex-wrap overflow-y-auto gap-2 w-full">
                {theme.tags?.map((itag) => (
                  <div
                    key={itag.tagId}
                    className="flex items-center border-[0.5px] border-border px-3 py-0.5 rounded-[45px] text-sm whitespace-nowrap shadow-sm"
                  >
                    {tags?.find((tag) => tag.id === itag.tagId)?.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {type === "view" && theme.user ? (
            <ThemeViewUser theme={theme} />
          ) : null}
          <div className="flex justify-between">
            {type === "view" && theme.createdAt ? (
              <Typography element="p" as="p" className="text-xs">
                <span className="font-bold pr-1">Created at:</span>
                {moment(theme.createdAt).format("LLL")}
              </Typography>
            ) : null}
            {type === "generated" ? (
              <Feedback />
            ) : (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div
                      className="cursor-pointer p-1"
                      onClick={() => {
                        if (theme.id) {
                          runIfLoggedInElseOpenLoginDialog(() => {
                            if (theme.id)
                              mutateMarkAsInappropriateTheme(theme.id);
                          });
                        }
                      }}
                    >
                      <Flag className="h-3 w-3 hover:text-destructive" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Mark this theme as inappropriate
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
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
          {theme.isAIGenerated ? (
            <div className="absolute gradient-border -top-[1.5px] -right-[1.5px] -left-[1.5px] -bottom-[1.5px] rounded-[8px]" />
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};
