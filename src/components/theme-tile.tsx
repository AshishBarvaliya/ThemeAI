import HeartIcon from "@/assets/icons/heart";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import { useHelpers } from "@/hooks/useHelpers";
import { ColorsProps, GetThemeTileProps } from "@/interfaces/theme";
import { getMappedTheme } from "@/lib/theme";
import { cn, generateAllShades, getLuminance } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DotsVerticalIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import NiceAvatar from "react-nice-avatar";
import { AwardIcon } from "./award-icon";
import { USER_LEVELS } from "@/constants/user";
import { Button } from "./ui/button";
import MagicWand from "@/assets/svgs/magic-wand";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { getMiniTemplate } from "@/lib/templates";

interface ThemeTileProps {
  theme: GetThemeTileProps;
  mutateLikeTheme: (themeId: string) => void;
  mutateSaveTheme: (themeId: string) => void;
  mutateDislikeTheme: (themeId: string) => void;
  mutateUnsaveTheme: (themeId: string) => void;
  mutateMarkAsInappropriateTheme: (themeId: string) => void;
  setLikeLoading: (themeId: string) => void;
  loading: boolean;
}

export const ThemeTile: React.FC<ThemeTileProps> = ({
  theme,
  mutateLikeTheme,
  mutateSaveTheme,
  mutateDislikeTheme,
  mutateUnsaveTheme,
  mutateMarkAsInappropriateTheme,
  setLikeLoading,
  loading,
}) => {
  const router = useRouter();
  const moreMenuContainerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { runIfLoggedInElseOpenLoginDialog } = useHelpers();
  const [copied, setCopied] = useState<null | string>(null);
  const [openMore, setOpenMore] = useState(false);

  const mappedTheme = getMappedTheme(theme);
  const isLiked = mappedTheme.likedBy.includes(session?.user.id as string);
  const isSaved = mappedTheme.savedBy.includes(session?.user.id as string);

  const handleOutsideClick = (event: any) => {
    if (
      moreMenuContainerRef.current &&
      !moreMenuContainerRef.current.contains(event.target)
    ) {
      setOpenMore(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-[270px] h-fit border-[0.5px] border-border flex flex-col shadow-lg bg-white fade-in-0 animate-in slide-in-from-right-2",
        theme.isAIGenerated && "border-none"
      )}
    >
      <div className="flex gap-1 items-center p-1 border-b-[0.5px] border-border bg-white">
        <div className="flex flex-1 gap-2 items-center">
          <Avatar
            className="flex h-6 w-6 border-[0.5px] items-center justify-center bg-primary border-border cursor-pointer hover:shadow-normal hover:-translate-x-px hover:-translate-y-px"
            onClick={() => router.push(`/user/${mappedTheme.user.id}`)}
          >
            {mappedTheme.user.avatar ? (
              <NiceAvatar
                className="h-6 w-6"
                {...JSON.parse(mappedTheme.user.avatar)}
              />
            ) : (
              <>
                <AvatarImage src={mappedTheme.user.image} alt="profile image" />
                <AvatarFallback className="flex bg-primary text-primary-foreground text-xs">
                  {mappedTheme.user.name.split(" ")[0][0]}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <div>
                <p className="max-w-[160px] text-xs truncate">
                  {mappedTheme.user.name}
                </p>
              </div>
            </TooltipTrigger>
            {mappedTheme.user.name.length > 20 ? (
              <TooltipContent>
                <p className="text-xs">{mappedTheme.user.name}</p>
              </TooltipContent>
            ) : null}
          </Tooltip>
          <AwardIcon
            level={mappedTheme.user.level}
            className="h-3 w-3"
            info={USER_LEVELS[mappedTheme.user.level].name}
          />
        </div>
        <div className="flex items-center gap-2">
          {mappedTheme.isAIGenerated ? (
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <div>
                  <MagicWand className="h-3 w-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>{"AI Generated"}</TooltipContent>
            </Tooltip>
          ) : null}
          <div
            className="relative py-1 cursor-pointer"
            ref={moreMenuContainerRef}
          >
            <DotsVerticalIcon
              className="h-4 w-4 hover:stroke-primary-foreground"
              onClick={() => setOpenMore(!openMore)}
            />
            {openMore ? (
              <div
                data-state={openMore ? "open" : "closed"}
                className="absolute mt-1 gap-1 flex z-20 flex-col p-2 w-[160px] -ml-[20px] bg-white border-[0.5px] border-border shadow-dropshadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2"
              >
                <p
                  className="text-xs cursor-pointer flex items-center p-1 hover:bg-primary/20"
                  onClick={() => {
                    runIfLoggedInElseOpenLoginDialog(() => {
                      isSaved
                        ? mutateUnsaveTheme(mappedTheme.id)
                        : mutateSaveTheme(mappedTheme.id);
                      setTimeout(() => {
                        setOpenMore(false);
                      }, 200);
                    });
                  }}
                >
                  {isSaved ? "Saved" : "Save"}
                  {isSaved ? (
                    <StarFilledIcon className="h-3.5 w-3.5 ml-1 text-warning" />
                  ) : (
                    <StarIcon className="h-3.5 w-3.5 ml-1" />
                  )}
                </p>
                <p
                  className="text-xs cursor-pointer p-1 hover:bg-primary/20"
                  onClick={() => {
                    runIfLoggedInElseOpenLoginDialog(() => {
                      mutateMarkAsInappropriateTheme(mappedTheme.id);
                      setTimeout(() => {
                        setOpenMore(false);
                      }, 100);
                    });
                  }}
                >
                  Mark as inappropriate
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="relative parent_hover bg-white">
        {getMiniTemplate(mappedTheme.template, {
          id: mappedTheme.id,
          colors: mappedTheme.colors,
          shades: generateAllShades(mappedTheme.colors),
          fonts: mappedTheme.fonts,
        })}
        <div className="hidden_child absolute top-0 bg-black/30 w-full h-full items-center justify-center flex">
          <Button
            size={"md"}
            onClick={() => router.push(`/themes/${mappedTheme.id}`)}
          >
            Preview
          </Button>
        </div>
      </div>
      <div
        className="flex flex-col border-t-[0.5px] p-1.5 gap-2 bg-white"
        style={{ borderColor: mappedTheme.colors.primary }}
      >
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <div>
              <Typography element={"p"} as="p" className="text-lg truncate">
                {mappedTheme.name}
              </Typography>
            </div>
          </TooltipTrigger>
          {mappedTheme.name.length > 15 ? (
            <TooltipContent>{mappedTheme.name}</TooltipContent>
          ) : null}
        </Tooltip>
        <div className="flex gap-2">
          {Object.keys(mappedTheme.colors).map((key) => {
            const clr = mappedTheme.colors[key as keyof ColorsProps];
            const { color: textColor, shade } = getLuminance(clr);
            return (
              <div
                key={key}
                style={{
                  backgroundColor: clr,
                }}
                className="h-6 parent_hover w-full border-[0.5px] border-border flex items-center justify-center"
              >
                <p
                  className="text-xs hidden_child cursor-pointer"
                  style={{ color: textColor, backgroundColor: shade }}
                  onClick={() => {
                    navigator.clipboard.writeText(clr);
                    setCopied(mappedTheme.id + clr);
                    setTimeout(() => {
                      setCopied(null);
                    }, 1000);
                  }}
                >
                  {copied === mappedTheme.id + clr ? "Copied!" : clr}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {mappedTheme.tags.length ? (
            mappedTheme.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center border-[0.5px] border-border px-2 py-0.5 rounded-[45px] text-xs whitespace-nowrap"
              >
                {tag}
              </div>
            ))
          ) : (
            <p className="text-xs italic h-[21px] items-center flex">No tags</p>
          )}
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex flex-1 gap-2 items-center">
            <HeartIcon
              className={cn("h-5 w-5 cursor-pointer hover:text-[red]", {
                "text-[red]": isLiked,
                "opacity-70": loading,
              })}
              active={!!isLiked}
              onClick={() => {
                if (!loading) {
                  runIfLoggedInElseOpenLoginDialog(() => {
                    setLikeLoading(mappedTheme.id);
                    isLiked
                      ? mutateDislikeTheme(mappedTheme.id)
                      : mutateLikeTheme(mappedTheme.id);
                  });
                }
              }}
            />
            {mappedTheme.likes}
            {isSaved && (
              <StarFilledIcon className="h-5 w-5 ml-1 text-warning" />
            )}
          </div>
          <p className="text-[10px] text-secondary-foreground">
            {moment.utc(mappedTheme.createdAt).local().fromNow()}
          </p>
        </div>
      </div>
      {theme.isAIGenerated ? (
        <div className="absolute gradient-border -top-[1px] -right-[1px] -left-[1px] -bottom-[1px]" />
      ) : null}
    </div>
  );
};
