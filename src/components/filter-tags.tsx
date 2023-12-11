import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { GetTagProps } from "@/interfaces/theme";
import { cn } from "@/lib/utils";

interface FilterTagsProps {
  tags: GetTagProps[];
  selected: string[];
  setSelected: (selected: string[]) => void;
  isHeader?: boolean;
}

export const FiterTags: React.FC<FilterTagsProps> = ({
  tags,
  selected,
  setSelected,
  isHeader,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex items-center cursor-pointer px-3 text-xs bg-white border-[0.5px] border-border",
            isHeader ? "py-1.5" : "h-8"
          )}
        >
          Filter by tags{selected.length ? ` [${selected.length}]` : ""}
          <ChevronDown className="h-4 w-4 ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[180px] h-40 overflow-y-auto"
      >
        {selected.length ? (
          <div
            className="flex items-center justify-between text-center flex-1 pl-8 py-1.5 cursor-pointer hover:bg-accent"
            onClick={() => setSelected([])}
          >
            <p className="text-xs font-bold">Clear all({selected.length})</p>
          </div>
        ) : null}
        {tags.map((tag) => {
          return (
            <DropdownMenuCheckboxItem
              key={tag.id}
              checked={selected.includes(tag.name)}
              className="text-xs"
              onCheckedChange={() => {
                if (selected.includes(tag.name)) {
                  setSelected(selected.filter((t) => t !== tag.name));
                } else {
                  setSelected([...selected, tag.name]);
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
