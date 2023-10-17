import { SortByThemesProps, cn, getSortedThemes } from "@/lib/utils";
import { getUser } from "@/services/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTags, getThemesByUserAndType } from "@/services/theme";
import { GetThemeTileProps, TagProps } from "@/interfaces/theme";
import { ThemeTile } from "@/components/theme-tile";
import { useSession } from "next-auth/react";
import { useHelpers } from "@/hooks/useHelpers";
import {
  setMarkAsInappropriate,
  themeDislike,
  themeLike,
  themeSave,
  themeUnsave,
} from "@/services/toggle";
import { useToast } from "@/hooks/useToast";
import { FiterTags } from "./filter-tags";
import { SortThemes } from "./sort-themes";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface TabsProps {
  id: "createdThemes" | "likedThemes" | "savedThemes";
  name: string;
  count: number;
  getThemes: () => JSX.Element;
}

export default function ProfileThemes() {
  const router = useRouter();
  const { addToast } = useToast();
  const { data: session } = useSession();
  const { runIfLoggedInElseOpenLoginDialog } = useHelpers();
  const [privateOnly, setPrivateOnly] = useState(false);
  const { data: tags } = useQuery(["tags"], getTags);
  const { data: user } = useQuery(["user", router.query.id], () =>
    getUser(router.query.id as string)
  );

  const { mutate: mutateMarkAsInappropriateTheme } = useMutation({
    mutationFn: (themeId: string) => setMarkAsInappropriate(themeId),
    onSuccess: () => {
      addToast({
        title: "Mark as inappropriated successfully",
        type: "success",
      });
    },
  });
  const [selectedTab, setSelectedTab] =
    useState<TabsProps["id"]>("createdThemes");
  const [filters, setFilters] = useState<{
    createdThemes: string[];
    likedThemes: string[];
    savedThemes: string[];
  }>({
    createdThemes: [],
    likedThemes: [],
    savedThemes: [],
  });
  const [sortItem, setSortItem] =
    useState<SortByThemesProps["sortBy"]>("Newest");

  const tabs: TabsProps[] = [
    {
      id: "createdThemes",
      name: "Created",
      count: user?.createdThemes ? user?.createdThemes.length : 0,
      getThemes: () => (
        <CreatedTheme
          mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
          tags={tags}
          sortItem={sortItem}
          filters={filters.createdThemes}
          privateOnly={privateOnly}
        />
      ),
    },
    {
      id: "likedThemes",
      name: "Liked",
      count: user?.likedThemes ? user?.likedThemes.length : 0,
      getThemes: () =>
        session ? (
          <LikedTheme
            mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
            tags={tags}
            sortItem={sortItem}
            filters={filters.likedThemes}
          />
        ) : (
          <></>
        ),
    },
    ...(session?.user.id === router.query.id && user
      ? ([
          {
            id: "savedThemes",
            name: "Saved",
            count: user?.savedThemes ? user?.savedThemes.length : 0,
            getThemes: () => (
              <SavedTheme
                mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
                tags={tags}
                sortItem={sortItem}
                filters={filters.savedThemes}
              />
            ),
          },
        ] as TabsProps[])
      : []),
  ];

  useEffect(() => {
    setSelectedTab("createdThemes");
  }, [router.query.id]);

  return (
    <>
      <div className="flex justify-between px-4 py-3">
        <div className="flex gap-3">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => {
                if (
                  tab.id === ("likedThemes" as TabsProps["id"]) &&
                  session?.user.id !== router.query.id
                ) {
                  runIfLoggedInElseOpenLoginDialog(() =>
                    setSelectedTab(tab.id)
                  );
                } else setSelectedTab(tab.id);
              }}
              className={cn(
                "border-[0.5px] border-border bg-white px-2.5 h-8 flex items-center text-xs cursor-pointer hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
                {
                  "bg-primary": selectedTab === tab.id,
                }
              )}
            >
              {`${tab.name}(${tab.count})`}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="flex items-center gap-3">
            {session?.user.id === router.query.id &&
            selectedTab === "createdThemes" ? (
              <div className="flex items-center">
                <Label
                  htmlFor="privateOnly"
                  className="cursor-pointer flex items-center mr-2"
                >
                  Private only
                </Label>
                <Switch
                  id="privateOnly"
                  name="privateOnly"
                  className="border border-border cursor-pointer h-4 w-7"
                  // @ts-ignore
                  thumbClassName="h-3.5 w-3.5 data-[state=checked]:translate-x-3"
                  checked={privateOnly}
                  onCheckedChange={() => setPrivateOnly((prev) => !prev)}
                />
              </div>
            ) : null}
            {tags && (
              <FiterTags
                tags={tags}
                setSelected={(selected) =>
                  setFilters({ ...filters, [selectedTab]: selected })
                }
                selected={filters[selectedTab]}
              />
            )}
            <SortThemes setSortItem={setSortItem} />
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-4 flex-wrap pb-4">
        {tabs.find((tab) => tab.id === selectedTab)?.getThemes()}
      </div>
    </>
  );
}

interface CreatedThemeProps {
  mutateMarkAsInappropriateTheme: (themeId: string) => void;
  tags: TagProps[] | undefined;
  sortItem: SortByThemesProps["sortBy"];
  filters: string[];
  privateOnly?: boolean;
}

const CreatedTheme: React.FC<CreatedThemeProps> = ({
  mutateMarkAsInappropriateTheme,
  sortItem,
  tags,
  filters,
  privateOnly,
}) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const router = useRouter();
  const [likeLoading, setLikeLoading] = useState<string | null>(null);
  const { data: createdThemes } = useQuery(
    ["user", router.query.id, "created"],
    () => getThemesByUserAndType(router.query.id as string, "created")
  );
  const { mutate: mutateLikeTheme, isLoading: isLoadingLikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeLike(themeId),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["user", router.query.id]);
        if (createdThemes?.length) {
          queryClient.setQueryData(
            ["user", router.query.id, "created"],
            createdThemes.map((theme) => {
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
        queryClient.invalidateQueries(["user", router.query.id]);
        if (createdThemes?.length) {
          queryClient.setQueryData(
            ["user", router.query.id, "created"],
            createdThemes.map((theme) => {
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
      queryClient.invalidateQueries(["user", router.query.id]);
      if (createdThemes?.length) {
        queryClient.setQueryData(
          ["user", router.query.id, "created"],
          createdThemes.map((theme) => {
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
      queryClient.invalidateQueries(["user", router.query.id]);
      if (createdThemes?.length) {
        queryClient.setQueryData(
          ["user", router.query.id, "created"],
          createdThemes.map((theme) => {
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

  const sortedThemes = getSortedThemes({
    themes: createdThemes || [],
    sortBy: sortItem,
  });

  const privateFiltered =
    privateOnly && session?.user.id === router.query.id
      ? sortedThemes?.filter((theme) => theme.isPrivate)
      : sortedThemes;

  return privateFiltered
    ?.filter((theme) =>
      filters.length
        ? theme.tags.some((tag) => filters.includes(tag.tagId))
        : true
    )
    .map((theme: GetThemeTileProps, index: number) => (
      <ThemeTile
        key={index}
        theme={theme}
        mutateLikeTheme={mutateLikeTheme}
        mutateSaveTheme={mutateSaveTheme}
        mutateDislikeTheme={mutateDislikeTheme}
        mutateUnsaveTheme={mutateUnsaveTheme}
        mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
        setLikeLoading={setLikeLoading}
        allTags={tags}
        loading={
          likeLoading === theme.id &&
          (isLoadingDislikeTheme || isLoadingLikeTheme)
        }
      />
    ));
};

const LikedTheme: React.FC<CreatedThemeProps> = ({
  mutateMarkAsInappropriateTheme,
  sortItem,
  tags,
  filters,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [likeLoading, setLikeLoading] = useState<string | null>(null);
  const { data: likedThemes } = useQuery(
    ["user", router.query.id, "liked"],
    () => getThemesByUserAndType(router.query.id as string, "liked")
  );
  const { mutate: mutateLikeTheme, isLoading: isLoadingLikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeLike(themeId),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["user", router.query.id]);
        if (likedThemes?.length) {
          queryClient.setQueryData(
            ["user", router.query.id, "liked"],
            likedThemes.map((theme) => {
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
        queryClient.invalidateQueries(["user", router.query.id]);
        if (likedThemes?.length) {
          queryClient.setQueryData(
            ["user", router.query.id, "liked"],
            likedThemes.map((theme) => {
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
      queryClient.invalidateQueries(["user", router.query.id]);
      if (likedThemes?.length) {
        queryClient.setQueryData(
          ["user", router.query.id, "liked"],
          likedThemes.map((theme) => {
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
      queryClient.invalidateQueries(["user", router.query.id]);
      if (likedThemes?.length) {
        queryClient.setQueryData(
          ["user", router.query.id, "liked"],
          likedThemes.map((theme) => {
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

  const sortedThemes = getSortedThemes({
    themes: likedThemes || [],
    sortBy: sortItem,
  });

  return sortedThemes
    ?.filter((theme) =>
      filters.length
        ? theme.tags.some((tag) => filters.includes(tag.tagId))
        : true
    )
    .map((theme: GetThemeTileProps, index: number) => (
      <ThemeTile
        key={index}
        theme={theme}
        mutateLikeTheme={mutateLikeTheme}
        mutateSaveTheme={mutateSaveTheme}
        mutateDislikeTheme={mutateDislikeTheme}
        mutateUnsaveTheme={mutateUnsaveTheme}
        mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
        setLikeLoading={setLikeLoading}
        allTags={tags}
        loading={
          likeLoading === theme.id &&
          (isLoadingDislikeTheme || isLoadingLikeTheme)
        }
      />
    ));
};

const SavedTheme: React.FC<CreatedThemeProps> = ({
  mutateMarkAsInappropriateTheme,
  sortItem,
  tags,
  filters,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [likeLoading, setLikeLoading] = useState<string | null>(null);
  const { data: savedThemes } = useQuery(
    ["user", router.query.id, "saved"],
    () => getThemesByUserAndType(router.query.id as string, "saved")
  );
  const { mutate: mutateLikeTheme, isLoading: isLoadingLikeTheme } =
    useMutation({
      mutationFn: (themeId: string) => themeLike(themeId),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["user", router.query.id]);
        if (savedThemes?.length) {
          queryClient.setQueryData(
            ["user", router.query.id, "saved"],
            savedThemes.map((theme) => {
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
        queryClient.invalidateQueries(["user", router.query.id]);
        if (savedThemes?.length) {
          queryClient.setQueryData(
            ["user", router.query.id, "saved"],
            savedThemes.map((theme) => {
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
      queryClient.invalidateQueries(["user", router.query.id]);
      if (savedThemes?.length) {
        queryClient.setQueryData(
          ["user", router.query.id, "saved"],
          savedThemes.map((theme) => {
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
      queryClient.invalidateQueries(["user", router.query.id]);
      if (savedThemes?.length) {
        queryClient.setQueryData(
          ["home", "themes"],
          savedThemes.map((theme) => {
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

  const sortedThemes = getSortedThemes({
    themes: savedThemes || [],
    sortBy: sortItem,
  });

  return sortedThemes
    ?.filter((theme) =>
      filters.length
        ? theme.tags.some((tag) => filters.includes(tag.tagId))
        : true
    )
    .map((theme: GetThemeTileProps, index: number) => (
      <ThemeTile
        key={index}
        theme={theme}
        mutateLikeTheme={mutateLikeTheme}
        mutateSaveTheme={mutateSaveTheme}
        mutateDislikeTheme={mutateDislikeTheme}
        mutateUnsaveTheme={mutateUnsaveTheme}
        mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
        setLikeLoading={setLikeLoading}
        allTags={tags}
        loading={
          likeLoading === theme.id &&
          (isLoadingDislikeTheme || isLoadingLikeTheme)
        }
      />
    ));
};
