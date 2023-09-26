import { ThemeTile } from "@/components/theme-tile";
import { GetThemeTileProps } from "@/interfaces/theme";
import { getThemes } from "@/services/theme";
import { useEffect, useState } from "react";

export default function Themes() {
  const [themes, setThemes] = useState<GetThemeTileProps[]>([]);

  useEffect(() => {
    getThemes().then((res) => {
      setThemes(res);
    });
  }, []);

  return (
    <div className="flex p-5 px-10 gap-6">
      {themes.map((theme, index) => (
        <ThemeTile key={index} theme={theme} />
      ))}
    </div>
  );
}
