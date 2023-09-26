import * as React from "react";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check } from "lucide-react";
import { debounce } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TagProps } from "@/interfaces/theme";

interface TagPickerProps {
  selectedTags: TagProps[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagProps[]>>;
}

export default function TagPicker({
  selectedTags,
  setSelectedTags,
}: TagPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNewTagDialog, setShowNewTagDialog] = useState(false);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [filteredTags, setFilteredTags] = useState(tags);
  const [searchString, setSearchString] = useState("");

  const onSearch = (value: string) => {
    if (value.length > 0) {
      setFilteredTags(
        tags.filter(
          (t) =>
            t.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1
        )
      );
    } else {
      setFilteredTags(tags);
    }
  };
  const processChange = debounce(onSearch, 200);

  const handleOutsideClick = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowNewTagDialog(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    axios
      .get("/api/tags")
      .then((res) => {
        setTags(res.data);
        setFilteredTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex relative flex-col" ref={containerRef}>
      <div className="flex flex-col">
        <Label className="mb-1">Tags</Label>
        <Input
          className="w-full"
          placeholder="New tag"
          type="text"
          autoComplete="off"
          value={searchString}
          onFocus={() => setShowNewTagDialog(true)}
          onChange={(e) => {
            processChange(e.target.value.trim());
            setSearchString(e.target.value);
          }}
        />
      </div>
      {showNewTagDialog && (
        <div
          data-state={showNewTagDialog ? "open" : "closed"}
          className="flex flex-col absolute z-10 pt-1 -top-[160px] min-w-[12rem] bg-white h-[180px] overflow-y-scroll border-[0.5px] border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-2"
          onFocus={(e) => e.stopPropagation()}
        >
          {filteredTags.map((tag) => (
            <div
              key={tag.name}
              className="p-1 text-sm flex items-center cursor-pointer hover:bg-primary/40 justify-between px-6"
              onClick={() => {
                if (selectedTags.find((t) => t.name === tag.name)) {
                  setSelectedTags(
                    selectedTags.filter((t) => t.name !== tag.name)
                  );
                } else {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
            >
              {tag.name}
              {selectedTags.find((t) => t.name === tag.name) && (
                <Check className="h-4 w-4 ml-2" />
              )}
            </div>
          ))}
          {filteredTags.length === 0 && (
            <div className="flex flex-col flex-1 justify-center items-center gap-2">
              <p className="mt-2 text-sm">{`'${searchString}' not found`}</p>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setTags([...tags, { name: searchString }]);
                  setFilteredTags([{ name: searchString }]);
                  setSelectedTags([...selectedTags, { name: searchString }]);
                }}
                size={"md"}
              >
                <PlusIcon className="h-4 w-4 mr-2" /> Add tag
              </Button>
            </div>
          )}
        </div>
      )}
      <div
        className={`flex flex-wrap items-center overflow-x-scroll w-[750px] mt-1.5 min-h-[28px] text-md ${
          selectedTags.length > 0 ? "" : "italic text-[rgb(135,135,135)]"
        }`}
      >
        {selectedTags.length ? (
          selectedTags?.map((tag) => (
            <div
              key={tag.name}
              className="mr-2 h-[28px] text-sm flex items-center border border-border px-3 rounded-[45px]"
            >
              {tag.name}
              <Cross1Icon
                className="h-4 w-4 ml-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTags(
                    selectedTags.filter((t) => t.name !== tag.name)
                  );
                }}
              />
            </div>
          ))
        ) : (
          <p className="">No tags selected</p>
        )}
      </div>
    </div>
  );
}
