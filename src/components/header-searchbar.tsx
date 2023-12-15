import React, { useEffect } from "react";
import { useHelpers } from "@/hooks/useHelpers";
import { SeachBar } from "./ui/input";
import { FiterTags } from "./filter-tags";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/services/theme";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { INPUT_LIMIT } from "@/constants/website";

const HeaderSearchBar = () => {
  const {
    setThemeSearchQuery,
    filterTags,
    setFilterTags,
    isAIOnly,
    setIsAIOnly,
  } = useHelpers();

  const { data: tags } = useQuery(["tags"], getTags);

  useEffect(() => {
    if (filterTags?.length) {
      setThemeSearchQuery("");
    }
  }, [filterTags]);

  return (
    <>
      <SeachBar
        id="font-search"
        name="font-search"
        placeholder="Search by font, theme, user, or description"
        autoComplete="off"
        maxLength={INPUT_LIMIT.NAME_MAX}
        onRemoveCallback={() => {
          setThemeSearchQuery("");
          setFilterTags([]);
        }}
        onSearch={(string: string) => {
          setThemeSearchQuery(string);
          setFilterTags([]);
        }}
      />
      <FiterTags
        tags={tags || []}
        selected={filterTags}
        setSelected={setFilterTags}
        isHeader
      />
      <div className="flex items-center">
        <Switch
          id="isAIOnly"
          name="isAIOnly"
          className="border border-border cursor-pointer h-5 w-8"
          // @ts-ignore
          thumbClassName="h-[18px] w-[18px] data-[state=checked]:translate-x-3"
          checked={isAIOnly}
          onCheckedChange={() => setIsAIOnly((isAIOnly) => !isAIOnly)}
        />
        <Label
          htmlFor="isAIOnly"
          className="cursor-pointer flex items-center ml-2"
        >
          AI only
        </Label>
      </div>
    </>
  );
};

export default HeaderSearchBar;
