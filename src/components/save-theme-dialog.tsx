import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { ColorsProps, FontObjProps, TagProps } from "@/interfaces/theme";
import { InfoIcon } from "./info-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import TagPicker from "./tag-picker";
import { ConfirmationDialog } from "./confirmation-dialog";

interface RegisterDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  colors: ColorsProps;
  fonts: FontObjProps;
}

interface FormDataProps {
  name: string;
  color1Reason: string;
  color2Reason: string;
  color3Reason: string;
  color4Reason: string;
  font1Reason: string;
  font2Reason: string;
  isPrivate: boolean;
}

const formKeyValueMapping = {
  color1Reason: "Background color",
  color2Reason: "Primary color",
  color3Reason: "Accent color",
  color4Reason: "Complementary color",
  font1Reason: "Primary font",
  font2Reason: "Secondary font",
};

export const SaveThemeDialog: React.FC<RegisterDialogProps> = ({
  open,
  setOpen,
  colors,
  fonts,
}) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [openSure, setOpenSure] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);
  const [isNameError, setIsNameError] = useState(false);
  const [data, setData] = useState<FormDataProps>({
    name: "",
    color1Reason: "",
    color2Reason: "",
    color3Reason: "",
    color4Reason: "",
    font1Reason: "",
    font2Reason: "",
    isPrivate: false,
  });

  const createTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/themes", {
        color_1: colors.bg,
        color_2: colors.primary,
        color_3: colors.accent,
        color_4: colors.extra,
        font_1: fonts.primary.fontFamily,
        font_2: fonts.secondary.fontFamily,
        name: data.name,
        color_1_reason: data.color1Reason,
        color_2_reason: data.color2Reason,
        color_3_reason: data.color3Reason,
        color_4_reason: data.color4Reason,
        font_1_reason: data.font1Reason,
        font_2_reason: data.font2Reason,
        isPrivate: data.isPrivate,
        tags: selectedTags,
      })
      .then(() => {
        addToast({ title: "New theme has been registered!", type: "success" });
        setLoading(false);
        setOpen(false);
        setOpenSure(true);
      })
      .catch((error) => {
        addToast({ title: error.response.data.error, type: "error" });
        setLoading(false);
        setOpen(false);
        setOpenSure(true);
      });
  };

  const isAnyFieldEmpty = Object.values(data).some((value) => value === "");

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-5 px-7 max-w-fit border border-border bg-white rounded-none">
          <DialogHeader>
            <DialogTitle>Save Theme</DialogTitle>
            <DialogDescription>
              Save the theme with appriopriate details/reasons for choosing it.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form>
              <div className="flex flex-col">
                <Label htmlFor="name" className="mb-1">
                  Name*{" "}
                  {isNameError && (
                    <span className="ml-1 text-destructive">(Required)</span>
                  )}
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={data.name}
                  autoComplete="off"
                  isError={isNameError}
                  required
                  placeholder="Docter's apointment app theme"
                  className="w-[750px]"
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, name: e.target.value }));
                    setIsNameError(e.target.value.trim().length === 0);
                  }}
                />
                <Label htmlFor="color1Reason" className="mt-4 mb-1">
                  Background color
                </Label>
                <Input
                  id="color1Reason"
                  name="color1Reason"
                  value={data.color1Reason}
                  autoComplete="off"
                  className="w-[750px] pr-14"
                  postElement={<ColorTooltip color={colors.bg} />}
                  placeholder="Creates a sleek and professional background for the website"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      color1Reason: e.target.value,
                    }))
                  }
                />
                <Label htmlFor="color1Reason" className="mt-4 mb-1">
                  Primary color
                </Label>
                <Input
                  id="color2Reason"
                  name="color2Reason"
                  value={data.color2Reason}
                  autoComplete="off"
                  className="w-[750px] pr-14"
                  postElement={<ColorTooltip color={colors.primary} />}
                  placeholder="High contrast against the background, enhancing readability."
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      color2Reason: e.target.value,
                    }))
                  }
                />
                <Label htmlFor="color1Reason" className="mt-4 mb-1">
                  Accent color
                </Label>
                <Input
                  id="color3Reason"
                  name="color3Reason"
                  value={data.color3Reason}
                  autoComplete="off"
                  className="w-[750px] pr-14"
                  placeholder="Adds vibrancy and draws attention to interactive elements."
                  postElement={<ColorTooltip color={colors.accent} />}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      color3Reason: e.target.value,
                    }))
                  }
                />
                <Label htmlFor="color1Reason" className="mt-4 mb-1">
                  Complementry color
                </Label>
                <Input
                  id="color4Reason"
                  name="color4Reason"
                  value={data.color4Reason}
                  autoComplete="off"
                  className="w-[750px] pr-14"
                  postElement={<ColorTooltip color={colors.extra} />}
                  placeholder="Complementary color creates visual interest and balance."
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      color4Reason: e.target.value,
                    }))
                  }
                />
                <Label htmlFor="color1Reason" className="mt-4 mb-1">
                  Primary font
                </Label>
                <Input
                  id="font1Reason"
                  name="font1Reason"
                  value={data.font1Reason}
                  autoComplete="off"
                  className="w-[750px] pr-[104px]"
                  placeholder="Modern, versatile design ensures professionalism across varying sizes."
                  postElement={<FontTooltip font={fonts.primary.fontFamily} />}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      font1Reason: e.target.value,
                    }))
                  }
                />
                <Label htmlFor="color1Reason" className="mt-4 mb-1">
                  Secondary font
                </Label>
                <Input
                  id="font2Reason"
                  name="font2Reason"
                  autoComplete="off"
                  value={data.font2Reason}
                  className="w-[750px] pr-[104px]"
                  placeholder="Balanced, warm sans-serif offers clean design with broad support."
                  postElement={
                    <FontTooltip font={fonts.secondary.fontFamily} />
                  }
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      font2Reason: e.target.value,
                    }))
                  }
                />
                <div className="mt-4">
                  <TagPicker
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Switch
                    id="isPrivate"
                    name="isPrivate"
                    className="border border-border cursor-pointer"
                    checked={data.isPrivate}
                    onCheckedChange={() =>
                      setData((prev) => ({
                        ...prev,
                        isPrivate: !data.isPrivate,
                      }))
                    }
                  />
                  <Label
                    htmlFor="isPrivate"
                    className="cursor-pointer flex items-center"
                  >
                    Private
                    <InfoIcon info="Only you can see this theme" />
                  </Label>
                </div>
              </div>
              <div className="mt-1 flex justify-end">
                <Button
                  type="button"
                  disabled={loading}
                  onClick={(e) => {
                    if (data.name.trim().length === 0) {
                      setIsNameError(true);
                      return;
                    }
                    if (isAnyFieldEmpty) {
                      setOpenSure(true);
                    } else {
                      createTheme(e);
                    }
                  }}
                >
                  {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {loading ? "Saving..." : "Save & Post"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        open={openSure}
        setOpen={setOpenSure}
        yesBtnText={loading ? "Saving..." : "Save & Post"}
        noBtnText="Cancel"
        onYes={createTheme}
        loading={loading}
      >
        <div className="text-md">
          These fields look empty. are you sure want continue?
        </div>
        <div className="flex flex-col">
          {Object.keys(data)
            .filter((key) => data[key as keyof FormDataProps] === "")
            .map((key) => (
              <div key={key} className="italic font-semibold text-sm">
                {formKeyValueMapping[key as keyof typeof formKeyValueMapping]}
              </div>
            ))}
        </div>
      </ConfirmationDialog>
    </>
  );
};

const ColorTooltip = ({ color }: { color: string }) => (
  <TooltipProvider>
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <div
          className="absolute border border-border top-0 right-0 flex h-9 w-9"
          style={{ background: color }}
        />
      </TooltipTrigger>
      <TooltipContent>{color}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const FontTooltip = ({ font }: { font: string }) => (
  <TooltipProvider>
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <div
          className="absolute truncate border border-border top-0 right-0 flex h-9 w-[100px] text-md items-center bg-background cursor-default"
          style={{ fontFamily: font }}
        >
          <p className="w-full truncate text-center">{font}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent>{font}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
