import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTags, getThemesByUserAndType } from "@/services/theme";
import { GetThemeTileProps } from "@/interfaces/theme";
import { ThemeTile } from "@/components/theme-tile";
import {
  getUserLikedThemesStatus,
  getUserSavedThemesStatus,
} from "@/services/user-details";
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
  const { data: tags } = useQuery(["tags"], getTags);
  const { data: user } = useQuery(["user", router.query.id], () =>
    getUser(router.query.id as string)
  );

  const { data: themesLikedStatus } = useQuery(
    ["home", "userlikedthemesstatus"],
    () => getUserLikedThemesStatus(!!session)
  );
  const { data: themesSavedStatus } = useQuery(
    ["home", "usersavedthemesstatus"],
    () => getUserSavedThemesStatus(!!session)
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
  const [filter, setFilter] = useState("");

  const tabs: TabsProps[] = [
    {
      id: "createdThemes",
      name: "Created",
      count: user?.createdThemes.length || 0,
      getThemes: () => (
        <CreatedTheme
          mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
        />
      ),
    },
    {
      id: "likedThemes",
      name: "Liked",
      count: user?.likedThemes.length || 0,
      getThemes: () =>
        session ? (
          <LikedTheme
            mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
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
            count: user?.savedThemes.length || 0,
            getThemes: () => (
              <SavedTheme
                mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
              />
            ),
          },
        ] as TabsProps[])
      : []),
  ];

  const checkLiked = (id: string) => themesLikedStatus?.includes(id);
  const checkSaved = (id: string) => themesSavedStatus?.includes(id);

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
                if (tab.id === ("likedThemes" as TabsProps["id"])) {
                  runIfLoggedInElseOpenLoginDialog(() =>
                    setSelectedTab(tab.id)
                  );
                } else setSelectedTab(tab.id);
              }}
              className={cn(
                "border-[0.5px] border-border px-2.5 h-8 flex items-center text-xs cursor-pointer hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
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
            <Select onValueChange={setFilter}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                {tags?.map((tag) => (
                  <SelectItem key={tag.id} value={tag.name} className="text-xs">
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setFilter}>
              <SelectTrigger className="w-[70px] h-8 text-xs">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {tags?.map((tag) => (
                  <SelectItem key={tag.id} value={tag.name} className="text-xs">
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-4 flex-wrap">
        {tabs.find((tab) => tab.id === selectedTab)?.getThemes()}
      </div>
    </>
  );
}

interface CreatedThemeProps {
  mutateMarkAsInappropriateTheme: (themeId: string) => void;
}

const CreatedTheme: React.FC<CreatedThemeProps> = ({
  mutateMarkAsInappropriateTheme,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: createdThemes } = useQuery(
    ["user", router.query.id, "created"],
    () => getThemesByUserAndType(router.query.id as string, "created")
  );
  const { mutate: mutateLikeTheme } = useMutation({
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
  const { mutate: mutateDislikeTheme } = useMutation({
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

  return createdThemes?.map((theme: GetThemeTileProps, index: number) => (
    <ThemeTile
      key={index}
      theme={theme}
      mutateLikeTheme={mutateLikeTheme}
      mutateSaveTheme={mutateSaveTheme}
      mutateDislikeTheme={mutateDislikeTheme}
      mutateUnsaveTheme={mutateUnsaveTheme}
      mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
    />
  ));
};

const LikedTheme: React.FC<CreatedThemeProps> = ({
  mutateMarkAsInappropriateTheme,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: likedThemes } = useQuery(
    ["user", router.query.id, "liked"],
    () => getThemesByUserAndType(router.query.id as string, "liked")
  );
  const { mutate: mutateLikeTheme } = useMutation({
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
  const { mutate: mutateDislikeTheme } = useMutation({
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

  return likedThemes?.map((theme: GetThemeTileProps, index: number) => (
    <ThemeTile
      key={index}
      theme={theme}
      mutateLikeTheme={mutateLikeTheme}
      mutateSaveTheme={mutateSaveTheme}
      mutateDislikeTheme={mutateDislikeTheme}
      mutateUnsaveTheme={mutateUnsaveTheme}
      mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
    />
  ));
};

const SavedTheme: React.FC<CreatedThemeProps> = ({
  mutateMarkAsInappropriateTheme,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: savedThemes } = useQuery(
    ["user", router.query.id, "saved"],
    () => getThemesByUserAndType(router.query.id as string, "saved")
  );
  const { mutate: mutateLikeTheme } = useMutation({
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
  const { mutate: mutateDislikeTheme } = useMutation({
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

  return savedThemes?.map((theme: GetThemeTileProps, index: number) => (
    <ThemeTile
      key={index}
      theme={theme}
      mutateLikeTheme={mutateLikeTheme}
      mutateSaveTheme={mutateSaveTheme}
      mutateDislikeTheme={mutateDislikeTheme}
      mutateUnsaveTheme={mutateUnsaveTheme}
      mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
    />
  ));
};
