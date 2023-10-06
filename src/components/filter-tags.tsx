import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { GetTagProps } from "@/interfaces/theme";

interface FilterTagsProps {
  tags: GetTagProps[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FiterTags: React.FC<FilterTagsProps> = ({
  tags,
  selected,
  setSelected,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center h-8 cursor-pointer px-3 text-xs bg-white border-[0.5px] border-border">
          Filter by tags{selected.length ? ` [${selected.length}]` : ""}
          <ChevronDown className="h-4 w-4 ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[180px] h-40 overflow-y-auto"
      >
        {tags.map((tag) => {
          return (
            <DropdownMenuCheckboxItem
              key={tag.id}
              checked={selected.includes(tag.id)}
              className="text-xs"
              onCheckedChange={() => {
                if (selected.includes(tag.id)) {
                  setSelected((prev) => {
                    return prev.filter((t) => t !== tag.id);
                  });
                } else {
                  setSelected((prev) => {
                    return [...prev, tag.id];
                  });
                }
              }}
            >
              {tag.name}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
