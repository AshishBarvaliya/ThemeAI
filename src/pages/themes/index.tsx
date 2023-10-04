import { ThemeTile } from "@/components/theme-tile";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useHelpers } from "@/hooks/useHelpers";
import { useToast } from "@/hooks/useToast";
import { getTags, getThemes } from "@/services/theme";
import {
  setMarkAsInappropriate,
  themeDislike,
  themeLike,
  themeSave,
  themeUnsave,
} from "@/services/toggle";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

export default function Themes() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addToast } = useToast();
  const { themeSearchQuery, setThemeSearchQuery } = useHelpers();
  const [likeLoading, setLikeLoading] = useState<string | null>(null);
  const { data: tags } = useQuery(["tags"], getTags);
  const {
    data: themes,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["home", "themes", themeSearchQuery],
    queryFn: ({ pageParam = 1 }) => getThemes(pageParam, themeSearchQuery),
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
  });
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
        if (themes?.pages?.length) {
          queryClient.setQueryData(["home", "themes", themeSearchQuery], {
            ...themes,
            pages: themes.pages.map((page) =>
              page.map((theme) => {
                if (theme.id === data.themeId) {
                  return {
                    ...theme,
                    likedBy: [...theme.likedBy, { userId: data.userId }],
                  };
                }
                return theme;
              })
            ),
          });
        }
      },
    });
  const { mutate: mutateDislikeTheme, isLoading: isLoadingDislikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeDislike(themeId),
      onSuccess: (data) => {
        if (themes?.pages?.length) {
          queryClient.setQueryData(["home", "themes", themeSearchQuery], {
            ...themes,
            pages: themes.pages.map((page) =>
              page.map((theme) => {
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
            ),
          });
        }
      },
    });

  const { mutate: mutateSaveTheme } = useMutation({
    mutationFn: (themeId: string) => themeSave(themeId),
    onSuccess: (data) => {
      if (themes?.pages?.length) {
        queryClient.setQueryData(["home", "themes", themeSearchQuery], {
          ...themes,
          pages: themes.pages.map((page) =>
            page.map((theme) => {
              if (theme.id === data.themeId) {
                return {
                  ...theme,
                  savedBy: [...theme.savedBy, { userId: data.userId }],
                };
              }
              return theme;
            })
          ),
        });
      }
    },
  });
  const { mutate: mutateUnsaveTheme } = useMutation({
    mutationFn: (themeId: string) => themeUnsave(themeId),
    onSuccess: (data) => {
      if (themes?.pages?.length) {
        queryClient.setQueryData(["home", "themes", themeSearchQuery], {
          ...themes,
          pages: themes.pages.map((page) =>
            page.map((theme) => {
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
          ),
        });
      }
    },
  });

  const handleScroll = (e: any) => {
    const threshold = 500;
    const distanceFromBottom = e.target.scrollHeight - e.target.scrollTop;

    if (
      distanceFromBottom <= e.target.clientHeight + threshold &&
      !isFetchingNextPage &&
      themes?.pages?.length &&
      themes?.pages[themes?.pages?.length - 1]?.length
    ) {
      fetchNextPage();
    }
  };

  return (
    <div className="flex bg-black/5 w-full">
      {themes?.pages[0]?.length ? (
        <div
          className="flex flex-wrap p-5 overflow-y-auto px-10 gap-6"
          onScroll={handleScroll}
        >
          {themes?.pages?.map((page, index) =>
            page.length ? (
              <Fragment key={index}>
                {page.map((theme) => (
                  <ThemeTile
                    key={theme.id}
                    theme={theme}
                    mutateLikeTheme={mutateLikeTheme}
                    mutateSaveTheme={mutateSaveTheme}
                    mutateDislikeTheme={mutateDislikeTheme}
                    mutateUnsaveTheme={mutateUnsaveTheme}
                    mutateMarkAsInappropriateTheme={
                      mutateMarkAsInappropriateTheme
                    }
                    setLikeLoading={setLikeLoading}
                    allTags={tags}
                    loading={
                      likeLoading === theme.id &&
                      (isLoadingDislikeTheme || isLoadingLikeTheme)
                    }
                  />
                ))}
              </Fragment>
            ) : null
          )}
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col justify-center items-center">
          <Typography
            as={"p"}
            element="p"
          >{`No themes found by searching "${themeSearchQuery}"`}</Typography>
          <Button
            className="mt-4"
            onClick={() => {
              router.push("/themes/create");
              queryClient.invalidateQueries([
                "home",
                "themes",
                themeSearchQuery,
              ]);
              setThemeSearchQuery("");
            }}
          >
            Create a theme
          </Button>
        </div>
      )}
    </div>
  );
}
