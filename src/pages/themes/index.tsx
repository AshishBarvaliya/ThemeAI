import { ThemeTile } from "@/components/theme-tile";
import { getThemes } from "@/services/theme";
import { getUserLikedThemes, getUserSavedThemes } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export default function Themes() {
  const { data: themes } = useQuery(["home", "themes"], getThemes);
  const { data: themesLikedStatus } = useQuery(
    ["home", "userlikedthemesStatus"],
    getUserLikedThemes
  );
  const { data: themesSavedStatus } = useQuery(
    ["home", "usersavedthemesStatus"],
    getUserSavedThemes
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
