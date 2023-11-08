import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AwardIcon } from "@/components/award-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_LEVELS } from "@/constants/user";
import { DotFilledIcon } from "@radix-ui/react-icons";
import HeartIcon from "@/assets/icons/heart";
import NiceAvatar from "react-nice-avatar";
import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  themeDislike,
  themeLike,
  themeSave,
  themeUnsave,
} from "@/services/toggle";
import Typography from "./ui/typography";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ThemeVeiwProps } from "./theme-view";
import { useHelpers } from "@/hooks/useHelpers";
import { StarIcon } from "lucide-react";

export const ThemeViewUser: React.FC<{ theme: ThemeVeiwProps["theme"] }> = ({
  theme,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { runIfLoggedInElseOpenLoginDialog } = useHelpers();

  const { mutate: mutateLikeTheme, isLoading: isLoadingLikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeLike(themeId),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["theme", data.themeId]);
      },
    });
  const { mutate: mutateDislikeTheme, isLoading: isLoadingDislikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeDislike(themeId),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["theme", data.themeId]);
      },
    });
  const { mutate: mutateSaveTheme, isLoading: isLoadingSaveTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeSave(themeId),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["theme", data.themeId]);
      },
    });
  const { mutate: mutateUnsaveTheme, isLoading: isLoadingUnsaveTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeUnsave(themeId),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["theme", data.themeId]);
      },
    });

  const isLiked = theme.likedBy.find(
    (user) => user.userId === session?.user.id
  );
  const isSaved = theme.savedBy.find(
    (user) => user.userId === session?.user.id
  );

  return (
    <>
      <div className="flex gap-2 items-center">
        <HeartIcon
          className={cn("h-5 w-5 cursor-pointer hover:text-[red]", {
            "text-[red]": isLiked,
            "opacity-70": isLoadingLikeTheme || isLoadingDislikeTheme,
          })}
          active={!!isLiked}
          onClick={() => {
            if (!(isLoadingLikeTheme || isLoadingDislikeTheme)) {
              runIfLoggedInElseOpenLoginDialog(() => {
                if (theme?.id) {
                  isLiked
                    ? mutateDislikeTheme(theme.id)
                    : mutateLikeTheme(theme.id);
                }
              });
            }
          }}
        />
        {theme.likedBy?.length}
        {isSaved ? (
          <StarFilledIcon
            className={cn("h-5 w-5 ml-1 text-warning cursor-pointer")}
            onClick={() => {
              if (!(isLoadingUnsaveTheme || isLoadingSaveTheme)) {
                runIfLoggedInElseOpenLoginDialog(() => {
                  if (theme?.id) {
                    isSaved
                      ? mutateUnsaveTheme(theme.id)
                      : mutateSaveTheme(theme.id);
                  }
                });
              }
            }}
          />
        ) : (
          <StarIcon
            className={cn("h-5 w-5 ml-1 cursor-pointer")}
            onClick={() => {
              if (!(isLoadingUnsaveTheme || isLoadingSaveTheme)) {
                runIfLoggedInElseOpenLoginDialog(() => {
                  if (theme?.id) {
                    isSaved
                      ? mutateUnsaveTheme(theme.id)
                      : mutateSaveTheme(theme.id);
                  }
                });
              }
            }}
          />
        )}
        {theme.savedBy?.length}
      </div>
      {theme.user ? (
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
    </>
  );
};
