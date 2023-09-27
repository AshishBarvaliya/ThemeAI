import { ThemeTile } from "@/components/theme-tile";
import { getThemes } from "@/services/theme";
import {
  getUserLikedThemesStatus,
  getUserSavedThemesStatus,
} from "@/services/user-details";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Themes() {
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

  const checkLiked = (id: string) => themesLikedStatus?.includes(id);
  const checkSaved = (id: string) => themesSavedStatus?.includes(id);

  return (
    <div className="flex flex-wrap p-5 px-10 gap-6">
      {themes?.map((theme, index) => (
        <ThemeTile
          key={index}
          theme={theme}
          checkLiked={checkLiked}
          checkSaved={checkSaved}
        />
      ))}
    </div>
  );
}
