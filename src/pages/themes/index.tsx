import { ThemeTile } from "@/components/theme-tile";
import { useToast } from "@/hooks/useToast";
import { getThemes } from "@/services/theme";
import {
  setMarkAsInappropriate,
  themeDislike,
  themeLike,
  themeSave,
  themeUnsave,
} from "@/services/toggle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Themes() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [likeLoading, setLikeLoading] = useState<string | null>(null);
  const { data: themes } = useQuery(["home", "themes"], getThemes);
  const { mutate: mutateMarkAsInappropriateTheme } = useMutation({
    mutationFn: (themeId: string) => setMarkAsInappropriate(themeId),
    onSuccess: () => {
      addToast({
        title: "Mark as inappropriated successfully",
        type: "success",
      });
    },
  });

  const { mutate: mutateLikeTheme, isLoading: isLoadingLikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeLike(themeId),
      onSuccess: (data) => {
        if (themes?.length) {
          queryClient.setQueryData(
            ["home", "themes"],
            themes.map((theme) => {
              if (theme.id === data.themeId) {
                return {
                  ...theme,
                  likedBy: [...theme.likedBy, { userId: data.userId }],
                };
              }
              return theme;
            })
          );
        }
      },
    });
  const { mutate: mutateDislikeTheme, isLoading: isLoadingDislikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeDislike(themeId),
      onSuccess: (data) => {
        if (themes?.length) {
          queryClient.setQueryData(
            ["home", "themes"],
            themes.map((theme) => {
              if (theme.id === data.themeId) {
                return {
                  ...theme,
                  likedBy: theme.likedBy.filter(
                    (user) => user.userId !== data.userId
                  ),
                };
              }
              return theme;
            })
          );
        }
      },
    });

  const { mutate: mutateSaveTheme } = useMutation({
    mutationFn: (themeId: string) => themeSave(themeId),
    onSuccess: (data) => {
      if (themes?.length) {
        queryClient.setQueryData(
          ["home", "themes"],
          themes.map((theme) => {
            if (theme.id === data.themeId) {
              return {
                ...theme,
                savedBy: [...theme.savedBy, { userId: data.userId }],
              };
            }
            return theme;
          })
        );
      }
    },
  });
  const { mutate: mutateUnsaveTheme } = useMutation({
    mutationFn: (themeId: string) => themeUnsave(themeId),
    onSuccess: (data) => {
      if (themes?.length) {
        queryClient.setQueryData(
          ["home", "themes"],
          themes.map((theme) => {
            if (theme.id === data.themeId) {
              return {
                ...theme,
                savedBy: theme.savedBy.filter(
                  (user) => user.userId !== data.userId
                ),
              };
            }
            return theme;
          })
        );
      }
    },
  });

  return (
    <div className="flex flex-wrap p-5 px-10 gap-6">
      {themes?.map((theme, index) => (
        <ThemeTile
          key={index}
          theme={theme}
          mutateLikeTheme={mutateLikeTheme}
          mutateSaveTheme={mutateSaveTheme}
          mutateDislikeTheme={mutateDislikeTheme}
          mutateUnsaveTheme={mutateUnsaveTheme}
          mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
          setLikeLoading={setLikeLoading}
          loading={
            likeLoading === theme.id &&
            (isLoadingDislikeTheme || isLoadingLikeTheme)
          }
        />
      ))}
    </div>
  );
}
