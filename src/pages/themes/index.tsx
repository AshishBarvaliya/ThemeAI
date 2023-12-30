import { ThemeTile } from "@/components/theme-tile";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { useHelpers } from "@/hooks/useHelpers";
import { useToast } from "@/hooks/useToast";
import { getThemes } from "@/services/theme";
import {
  setMarkAsInappropriate,
  themeDislike,
  themeLike,
  themeSave,
  themeUnsave,
} from "@/services/toggle";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

export default function Themes() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addToast } = useToast();
  const { themeType, filterTags, isAIOnly } = useHelpers();
  const { themeSearchQuery, setThemeSearchQuery, setFilterTags } = useHelpers();
  const [likeLoading, setLikeLoading] = useState<string | null>(null);
  const {
    data: themes,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "home",
      "themes",
      themeSearchQuery,
      themeType,
      filterTags,
      isAIOnly,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getThemes(pageParam, themeSearchQuery, themeType, filterTags, isAIOnly),
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
    onError: ({ response }) => {
      addToast({
        title: response.data?.error || "Something went wrong",
        type: "error",
        errorCode: response.status,
      });
    },
  });

  const { mutate: mutateLikeTheme, isLoading: isLoadingLikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeLike(themeId),
      onSuccess: (data) => {
        if (themes?.pages?.length) {
          queryClient.setQueryData(
            [
              "home",
              "themes",
              themeSearchQuery,
              themeType,
              filterTags,
              isAIOnly,
            ],
            {
              ...themes,
              pages: themes.pages.map((page) =>
                page.map((theme) => {
                  if (theme.id === data.themeId) {
                    return {
                      ...theme,
                      likedBy: [...theme.likedBy, data.userId],
                    };
                  }
                  return theme;
                })
              ),
            }
          );
        }
      },
    });
  const { mutate: mutateDislikeTheme, isLoading: isLoadingDislikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeDislike(themeId),
      onSuccess: (data) => {
        if (themes?.pages?.length) {
          queryClient.setQueryData(
            [
              "home",
              "themes",
              themeSearchQuery,
              themeType,
              filterTags,
              isAIOnly,
            ],
            {
              ...themes,
              pages: themes.pages.map((page) =>
                page.map((theme) => {
                  if (theme.id === data.themeId) {
                    return {
                      ...theme,
                      likedBy: theme.likedBy.filter(
                        (user) => user !== data.userId
                      ),
                    };
                  }
                  return theme;
                })
              ),
            }
          );
        }
      },
    });

  const { mutate: mutateSaveTheme } = useMutation({
    mutationFn: (themeId: string) => themeSave(themeId),
    onSuccess: (data) => {
      if (themes?.pages?.length) {
        queryClient.setQueryData(
          ["home", "themes", themeSearchQuery, themeType, filterTags, isAIOnly],
          {
            ...themes,
            pages: themes.pages.map((page) =>
              page.map((theme) => {
                if (theme.id === data.themeId) {
                  return {
                    ...theme,
                    savedBy: [...theme.savedBy, data.userId],
                  };
                }
                return theme;
              })
            ),
          }
        );
      }
    },
  });
  const { mutate: mutateUnsaveTheme } = useMutation({
    mutationFn: (themeId: string) => themeUnsave(themeId),
    onSuccess: (data) => {
      if (themes?.pages?.length) {
        queryClient.setQueryData(
          ["home", "themes", themeSearchQuery, themeType, filterTags, isAIOnly],
          {
            ...themes,
            pages: themes.pages.map((page) =>
              page.map((theme) => {
                if (theme.id === data.themeId) {
                  return {
                    ...theme,
                    savedBy: theme.savedBy.filter(
                      (user) => user !== data.userId
                    ),
                  };
                }
                return theme;
              })
            ),
          }
        );
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
      themes?.pages[themes?.pages?.length - 1]?.length &&
      filterTags.length === 0
    ) {
      fetchNextPage();
    }
  };

  return (
    <>
      <Head>
        <title property="og:title">Themes - ThemeAI</title>
        <meta
          name="description"
          property="og:description"
          content="Explore the themes that are trending on ThemeAI."
        />
        <meta property="og:image" content="/og/themes.png" />
      </Head>
      <div className="flex bg-black/5 w-full">
        {isLoading ? null : themes?.pages[0]?.length ? (
          <div
            className="flex flex-col md:flex-row h-full md:flex-wrap p-5 overflow-y-auto lg:px-10 gap-6 w-full items-center md:items-start"
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
                setFilterTags([]);
              }}
            >
              Create a theme
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
