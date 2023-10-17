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
import { getThemeById } from "@/services/theme";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NiceAvatar from "react-nice-avatar";
import { DownloadIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";

export default function Theme() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const [openExportThemeDialog, setOpenExportThemeDialog] = useState(false);

  const { data: theme } = useQuery(["theme", router.query.id], () =>
    getThemeById(router.query.id as string)
  );
  console.log(theme);

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

  return theme ? (
    <div className="flex flex-col w-full my-6 border-[0.5px] border-border bg-white mx-36 p-[30px] px-[40px]">
      <div className="flex justify-between items-center">
        <Typography element="h2" as="h2">
          {theme?.name}
        </Typography>
        <div className="flex gap-4">
          <Button
            variant={"outline"}
            onClick={() => setOpenExportThemeDialog(true)}
          >
            <DownloadIcon className="h-4 w-4 mr-1.5" /> Export
          </Button>
        </div>
      </div>
      <div className="flex gap-4 py-4">
        <div className="w-1/2 flex flex-col gap-4">
          {theme.template === "marketing" ? (
            <MarketingTemplate colors={colors} shades={shades} fonts={fonts} />
          ) : (
            <LearningTemplate colors={colors} shades={shades} fonts={fonts} />
          )}
          <div className="flex gap-3 border-[0.5px] border-border p-2">
            <Avatar
              className="flex rounded-[6px] h-12 w-12 border-[0.5px] bg-primary border-border"
              onClick={() => router.push(`/user/${theme.user.id}`)}
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
                onClick={() => router.push("/user/" + theme.user.id)}
                variant={"outline"}
              >
                View
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          {colorsList.map((clr) => (
            <div className="flex flex-1 gap-4" key={clr.name}>
              <Typography element="p" as="p" className="italic flex-1">
                {`"${clr.reason}"`}
              </Typography>
              <div
                className="h-24 w-10"
                style={{ backgroundColor: clr.color }}
              />
            </div>
          ))}
        </div>
      </div>
      {theme && (
        <ExportThemeDialog
          open={openExportThemeDialog}
          setOpen={setOpenExportThemeDialog}
          fonts={fonts}
          colors={colors}
        />
      )}
    </div>
  ) : null;
}
