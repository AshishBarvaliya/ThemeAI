import { useMutation, useQueryClient } from "@tanstack/react-query";
import HeartIcon from "@/assets/icons/heart";
import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  themeDislike,
  themeLike,
  themeSave,
  themeUnsave,
} from "@/services/toggle";
import { useSession } from "next-auth/react";
import { ThemeVeiwProps } from "./theme-view";
import { useHelpers } from "@/hooks/useHelpers";
import { EyeIcon, StarIcon } from "lucide-react";

export const ThemeViewStats: React.FC<{ theme: ThemeVeiwProps["theme"] }> = ({
  theme,
}) => {
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
      <div className="flex justify-between">
        <div className="flex flex-1 gap-2 items-center">
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
        <div className="flex items-center gap-2">
          <EyeIcon className="h-5 w-5" />
          {theme.views?.length}
        </div>
      </div>
    </>
  );
};
