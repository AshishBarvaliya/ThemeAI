import { FontProps, GOOGLE_FONTS } from "@/constants/fonts";
import { hslToHex } from "@/lib/utils";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronDown, SearchX, StarIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { SeachBar } from "./ui/input";
import Typography from "./ui/typography";

interface FontPickerProps {
  id: string;
  name: string;
  selectedFont: FontProps;
  setSelectedFont: (font: FontProps) => void;
}

const randomCode = [
  100, 300, 40, 150, 320, 350, 250, 270, 225, 290, 30, 330, 270, 225, 140, 235,
  305, 10, 95, 355, 165, 60, 275, 185, 20, 345, 130, 85, 255, 110,
];

const FontPicker: React.FC<FontPickerProps> = ({
  id,
  name,
  selectedFont,
  setSelectedFont,
}) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [filteredFonts, setFilteredFonts] = useState<FontProps[]>(GOOGLE_FONTS);

  return (
    <div className="relative" id={id}>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <div className="flex flex-col max-w-[200px]">
              <Typography element="p" as="p" className="text-xs">
                {name}
              </Typography>
              <div
                className="flex px-2 gap-1 items-center text-[20px] cursor-pointer border-[0.5px] border-border bg-white"
                style={{ fontFamily: selectedFont.fontFamily }}
                onClick={() => setOpen(true)}
              >
                <p className="w-[145px] truncate">{selectedFont.fontFamily}</p>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>{selectedFont.fontFamily}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {open ? (
        <>
          <div
            className="fixed top-0 left-0 bottom-0 right-0 z-10"
            onClick={() => {
              setOpen(false);
              setFilteredFonts(GOOGLE_FONTS);
            }}
          />
          <div
            data-state={open ? "open" : "closed"}
            className="absolute mt-1 flex z-20 flex-col w-[442px] bg-white border-[0.5px] border-border ml-[-130px] shadow-dropshadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2"
          >
            <div className="flex p-2">
              <SeachBar
                id="font-search"
                name="font-search"
                usecase="font"
                placeholder="Search by font"
                autoComplete="off"
                onRemoveCallback={() => setFilteredFonts(GOOGLE_FONTS)}
                onSearch={(string: string) =>
                  setFilteredFonts(
                    GOOGLE_FONTS.filter(
                      (font) =>
                        font.fontFamily
                          .toLocaleLowerCase()
                          .indexOf(string.toLocaleLowerCase()) !== -1
                    )
                  )
                }
              />
            </div>
            <div className="flex mx-2 mb-1 flex-1 justify-end">
              <Select onValueChange={setCategory} defaultValue={category}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue defaultValue="popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All ({filteredFonts.length})
                  </SelectItem>
                  <SelectItem value="popular">Popular(0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex h-[324px] overflow-y-auto flex-col gap-2 px-2 mb-2 pt-1">
              {!!filteredFonts.length ? (
                new Array(Math.ceil(filteredFonts.length / 4))
                  .fill(1)
                  .map((_, i) => (
                    <div className="flex gap-2" key={i}>
                      {new Array(4).fill(1).map((_, j) => {
                        if (i * 4 + j < filteredFonts.length) {
                          return (
                            <p
                              key={i * 4 + j}
                              style={{
                                fontFamily: filteredFonts[i * 4 + j].fontFamily,
                                backgroundColor: hslToHex(
                                  randomCode[(i * 4 + j) % 30],
                                  90,
                                  92
                                ),
                                wordBreak: "break-word",
                              }}
                              onClick={() =>
                                setSelectedFont(filteredFonts[i * 4 + j])
                              }
                              className="parent_hover flex relative px-0.5 py-3 h-20 w-[100px] font-normal text-xl text-center items-center justify-center bg-[hsl(0, 90%, 80%)] border-[0.5px] border-border hover:shadow-normal hover:-translate-x-px hover:-translate-y-px cursor-pointer animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-1"
                            >
                              {filteredFonts[i * 4 + j].fontFamily}
                              {/* <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <StarIcon className="hidden_child absolute right-2 top-2 ml-2 h-4 w-4 font-['Poppins']" />
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    {"Save"}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider> */}
                              {/* <StarFilledIcon className="absolute right-2 top-2 ml-2 h-4 w-4 font-sans" /> */}
                            </p>
                          );
                        }
                      })}
                    </div>
                  ))
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <div
                    className={`flex items-center bg-destructive justify-center border border-border w-10 h-10`}
                  >
                    <SearchX className="h-6 w-6" />
                  </div>
                  <Typography element="p" as="p" className="text-md mt-2">
                    No fonts found
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FontPicker;
