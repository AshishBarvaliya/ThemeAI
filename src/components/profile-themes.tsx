import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  getUser,
  getUserLikedThemes,
  getUserSavedThemes,
} from "@/services/user";
import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getTags, getThemesByUserAndType } from "@/services/theme";
import { GetThemeTileProps } from "@/interfaces/theme";
import { ThemeTile } from "@/components/theme-tile";

interface TabsProps {
  id: "createdThemes" | "likedThemes" | "savedThemes";
  name: string;
  count: number;
  themes?: GetThemeTileProps[];
}

export default function ProfileThemes() {
  const router = useRouter();
  const { data: tags } = useQuery(["tags"], getTags);
  const { data: user } = useQuery(["user", router.query.id], () =>
    getUser(router.query.id as string)
  );
  const { data: createdThemes } = useQuery(
    ["user", router.query.id, "created"],
    () => getThemesByUserAndType(router.query.id as string, "created")
  );
  const { data: likedThemes } = useQuery(
    ["user", router.query.id, "liked"],
    () => getThemesByUserAndType(router.query.id as string, "liked")
  );
  const { data: savedThemes } = useQuery(
    ["user", router.query.id, "saved"],
    () => getThemesByUserAndType(router.query.id as string, "saved")
  );
  const { data: themesLikedStatus } = useQuery(
    ["home", "userlikedthemesStatus"],
    getUserLikedThemes
  );
  const { data: themesSavedStatus } = useQuery(
    ["home", "usersavedthemesStatus"],
    getUserSavedThemes
  );
  const [selectedTab, setSelectedTab] =
    useState<TabsProps["id"]>("createdThemes");
  const [filter, setFilter] = useState("");

  const tabs: TabsProps[] = [
    {
      id: "createdThemes",
      name: "Created",
      count: user?._count?.createdThemes || 0,
      themes: createdThemes,
    },
    {
      id: "likedThemes",
      name: "Liked",
      count: user?._count?.likedThemes || 0,
      themes: likedThemes,
    },
    {
      id: "savedThemes",
      name: "Saved",
      count: user?._count?.savedThemes || 0,
      themes: savedThemes,
    },
  ];

  const checkLiked = (id: string) => themesLikedStatus?.includes(id);
  const checkSaved = (id: string) => themesSavedStatus?.includes(id);

  return (
    <>
      <div className="flex justify-between px-4 py-3">
        <div className="flex gap-3">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedTab(tab.id)}
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
        {tabs
          .find((tab) => tab.id === selectedTab)
          ?.themes?.map((theme: GetThemeTileProps, index: number) => (
            <ThemeTile
              key={index}
              theme={theme}
              checkLiked={checkLiked}
              checkSaved={checkSaved}
            />
          ))}
      </div>
    </>
  );
}
