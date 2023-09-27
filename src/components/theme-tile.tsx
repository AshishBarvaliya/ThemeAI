import HeartIcon from "@/assets/icons/heart";
import LearningTemplate from "@/assets/templates/learning/learning-mini";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";
import { useHelpers } from "@/hooks/useHelpers";
import { ColorsProps, GetThemeTileProps } from "@/interfaces/theme";
import { getMappedTheme } from "@/lib/theme";
import { cn, generateAllShades, getLuminance } from "@/lib/utils";
import {
  setMarkAsInappropriate,
  toggleThemeLike,
  toggleThemeSave,
} from "@/services/toggle";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DotsVerticalIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import NiceAvatar from "react-nice-avatar";

interface ThemeTileProps {
  theme: GetThemeTileProps;
  checkLiked: (id: string) => boolean | undefined;
  checkSaved: (id: string) => boolean | undefined;
}

export const ThemeTile: React.FC<ThemeTileProps> = ({
  theme,
  checkLiked,
  checkSaved,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: mutateLikeTheme } = useMutation({
    mutationFn: () => toggleThemeLike(theme.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["home", "userlikedthemesstatus"]);
      queryClient.invalidateQueries(["home", "themes"]);
    },
  });
  const { mutate: mutateSaveTheme } = useMutation({
    mutationFn: () => toggleThemeSave(theme.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["home", "usersavedthemesstatus"]);
      queryClient.invalidateQueries(["home", "themes"]);
    },
  });
  const { mutate: mutateMarkAsInappropriateTheme } = useMutation({
    mutationFn: () => setMarkAsInappropriate(theme.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["home", "themes"]);
    },
  });
  const { runIfLoggedInElseOpenLoginDialog } = useHelpers();
  const [copied, setCopied] = useState<null | string>(null);
  const [openMore, setOpenMore] = useState(false);

  const mappedTheme = getMappedTheme(theme);
  const isLiked = checkLiked(theme.id);
  const isSaved = checkSaved(theme.id);

  return (
    <div className="w-[270px] h-fit border-[0.5px] border-border flex flex-col shadow-lg bg-white fade-in-0 animate-in slide-in-from-right-2">
      <div className="flex gap-1 items-center p-1 border-b-[0.5px] border-border ">
        <div className="flex flex-1 gap-2 items-center">
          <Avatar
            className="h-6 w-6 border-[0.5px] border-border cursor-pointer hover:shadow-normal hover:-translate-x-px hover:-translate-y-px"
            onClick={() => router.push(`/user/${theme.user.id}`)}
          >
            {mappedTheme.user.avatar ? (
              <NiceAvatar
                className="h-6 w-6"
                {...JSON.parse(theme.user.avatar)}
              />
            ) : (
              <>
                <AvatarImage src={mappedTheme.user.image} alt="profile image" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {mappedTheme.user.name.split(" ")[0][0]}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <p className="text-xs">{mappedTheme.user.name}</p>
        </div>
        <div className="flex items-center">
          <div className="py-1 cursor-pointer">
            <DotsVerticalIcon
              className="h-4 w-4 hover:stroke-primary-foreground"
              onClick={() => setOpenMore(!openMore)}
            />
            {openMore ? (
              <>
                <div
                  className="fixed top-0 left-0 bottom-0 right-0 z-10"
                  onClick={() => {
                    setOpenMore(false);
                  }}
                />
                <div
                  data-state={openMore ? "open" : "closed"}
                  className="absolute mt-1 gap-1 flex z-20 flex-col p-2 w-[160px] -ml-[20px] bg-white border-[0.5px] border-border shadow-dropshadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2"
                >
                  <p
                    className="text-xs cursor-pointer flex items-center p-1 hover:bg-primary/20"
                    onClick={() => {
                      runIfLoggedInElseOpenLoginDialog(() => mutateSaveTheme());
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
                      runIfLoggedInElseOpenLoginDialog(() =>
                        mutateMarkAsInappropriateTheme()
                      );
                    }}
                  >
                    Mark as inappropriate
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className=" cursor-pointer">
        <LearningTemplate
          colors={mappedTheme.colors}
          shades={generateAllShades(mappedTheme.colors)}
          fonts={mappedTheme.fonts}
        />
      </div>
      <div
        className="flex flex-col border-t-[0.5px] p-1.5 gap-2"
        style={{ borderColor: mappedTheme.colors.primary }}
      >
        <Typography element={"p"} as="p" className="text-lg">
          {mappedTheme.name}
        </Typography>
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
        <div className="flex gap-1">
          {mappedTheme.tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center border-[0.5px] border-border px-2 py-0.5 rounded-[45px] text-xs"
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex flex-1 gap-2 items-center">
            <HeartIcon
              className={cn("h-5 w-5 cursor-pointer hover:text-[red]", {
                "text-[red]": isLiked,
              })}
              active={isLiked}
              onClick={() => {
                runIfLoggedInElseOpenLoginDialog(() => mutateLikeTheme());
              }}
            />
            {mappedTheme.likes}
            {isSaved && (
              <StarFilledIcon className="h-5 w-5 ml-1 text-warning" />
            )}
          </div>
          <p className="text-[10px] text-secondary-foreground">
            {moment(mappedTheme.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};
