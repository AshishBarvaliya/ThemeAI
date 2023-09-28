import { ThemeTile } from "@/components/theme-tile";
import { getThemes } from "@/services/theme";
import {
  setMarkAsInappropriate,
  themeDislike,
  themeLike,
  themeSave,
  themeUnsave,
} from "@/services/toggle";
import {
  getUserLikedThemesStatus,
  getUserSavedThemesStatus,
} from "@/services/user-details";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Themes() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { data: themes } = useQuery(["home", "themes"], getThemes);
  const { data: themesLikedStatus } = useQuery(
    ["home", "userlikedthemesstatus"],
    () => getUserLikedThemesStatus(!!session)
  );
  const { data: themesSavedStatus } = useQuery(
    ["home", "usersavedthemesstatus"],
    () => getUserSavedThemesStatus(!!session)
  );
  // const { mutate: mutateLikeTheme } = useMutation({
  //   mutationFn: (themeId: string) => toggleThemeLike(themeId),
  //   onSuccess: (data) => {
  //     if (data.liked) {
  //       queryClient.setQueryData(
  //         ["home", "userlikedthemesstatus"],
  //         [...[themesLikedStatus || []], data.themeId]
  //       );
  //     } else {
  //       queryClient.setQueryData(
  //         ["home", "userlikedthemesstatus"],
  //         themesLikedStatus?.filter((id) => id !== data.themeId)
  //       );
  //     }
  //     queryClient.invalidateQueries(["home", "userlikedthemesstatus"]);
  //     queryClient.invalidateQueries(["home", "themes"]);
  //   },
  // });
  const { mutate: mutateMarkAsInappropriateTheme } = useMutation({
    mutationFn: (themeId: string) => setMarkAsInappropriate(themeId),
    onSuccess: () => {
      queryClient.invalidateQueries(["home", "themes"]);
    },
  });

  const checkLiked = (id: string) => themesLikedStatus?.includes(id);
  const checkSaved = (id: string) => themesSavedStatus?.includes(id);

  const { mutate: mutateLikeTheme } = useMutation({
    mutationFn: (themeId: string) => themeLike(themeId),
    onSuccess: (data) => {
      if (themesLikedStatus !== undefined) {
        queryClient.setQueryData(
          ["home", "userlikedthemesstatus"],
          [...themesLikedStatus, data.themeId]
        );
      }
    },
  });
  const { mutate: mutateDislikeTheme } = useMutation({
    mutationFn: (themeId: string) => themeDislike(themeId),
    onSuccess: (data) => {
      if (!data.isError && themesLikedStatus !== undefined) {
        queryClient.setQueryData(
          ["home", "userlikedthemesstatus"],
          themesLikedStatus.filter((id) => id !== data.themeId)
        );
      }
    },
  });

  const { mutate: mutateSaveTheme } = useMutation({
    mutationFn: (themeId: string) => themeSave(themeId),
    onSuccess: (data) => {
      if (themesSavedStatus !== undefined) {
        queryClient.setQueryData(
          ["home", "usersavedthemesstatus"],
          [...themesSavedStatus, data.themeId]
        );
      }
    },
  });
  const { mutate: mutateUnsaveTheme } = useMutation({
    mutationFn: (themeId: string) => themeUnsave(themeId),
    onSuccess: (data) => {
      if (!data.isError && themesSavedStatus !== undefined) {
        queryClient.setQueryData(
          ["home", "usersavedthemesstatus"],
          themesSavedStatus.filter((id) => id !== data.themeId)
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
          checkLiked={checkLiked}
          checkSaved={checkSaved}
          mutateLikeTheme={mutateLikeTheme}
          mutateSaveTheme={mutateSaveTheme}
          mutateDislikeTheme={mutateDislikeTheme}
          mutateUnsaveTheme={mutateUnsaveTheme}
          mutateMarkAsInappropriateTheme={mutateMarkAsInappropriateTheme}
        />
      ))}
    </div>
  );
}
