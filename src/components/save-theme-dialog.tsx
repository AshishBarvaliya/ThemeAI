import { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { INPUT_LIMIT } from "@/constants/website";
import { Textarea } from "./ui/textarea";
import { validateInput } from "@/lib/error";
import { useHelpers } from "@/hooks/useHelpers";

interface RegisterDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  colors: ColorsProps;
  fonts: FontObjProps;
  defaultData?: {
    color_1_reason: string;
    color_2_reason: string;
    color_3_reason: string;
    color_4_reason: string;
    isDark: boolean;
    prompt: string;
  };
  isDirty: boolean;
}

interface FormDataProps {
  name: string;
  color1Reason: string;
  color2Reason: string;
  color3Reason: string;
  color4Reason: string;
  isPrivate: boolean;
}

const formKeyValueMapping = {
  color1Reason: "Background color",
  color2Reason: "Primary color",
  color3Reason: "Accent color",
  color4Reason: "Complementary color",
};

export const SaveThemeDialog: React.FC<RegisterDialogProps> = ({
  open,
  setOpen,
  colors,
  fonts,
  defaultData,
  isDirty,
}) => {
  const { addToast } = useToast();
  const { template } = useHelpers();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openSure, setOpenSure] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<FormDataProps>({
    name: "",
    color1Reason: defaultData?.color_1_reason || "",
    color2Reason: defaultData?.color_2_reason || "",
    color3Reason: defaultData?.color_3_reason || "",
    color4Reason: defaultData?.color_4_reason || "",
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
        isPrivate: data.isPrivate,
        tags: selectedTags,
        template,
        ...(defaultData
          ? {
              prompt: defaultData.prompt,
              isAIGenerated: !(
                isDirty ||
                data.color1Reason !== defaultData.color_1_reason ||
                data.color2Reason !== defaultData.color_2_reason ||
                data.color3Reason !== defaultData.color_3_reason ||
                data.color4Reason !== defaultData.color_4_reason
              ),
            }
          : {}),
      })
      .then((res) => {
        addToast({ title: "New theme has been registered!", type: "success" });
        setLoading(false);
        setOpen(false);
        setOpenSure(false);
        if (res.data) {
          router.push(`/themes/${res.data?.id}`);
        }
      })
      .catch((error) => {
        addToast({
          title: error.response.data.error,
          type: "error",
          errorCode: error.response.status,
        });
        setLoading(false);
        setOpen(false);
        setOpenSure(false);
      });
  };

  const isAnyFieldEmpty = Object.values(data).some((value) => value === "");

  useEffect(() => {
    setData({
      name: "",
      color1Reason: defaultData?.color_1_reason || "",
      color2Reason: defaultData?.color_2_reason || "",
      color3Reason: defaultData?.color_3_reason || "",
      color4Reason: defaultData?.color_4_reason || "",
      isPrivate: false,
    });
  }, [defaultData]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(val) => {
          if (!loading) {
            setOpen(val);
          }
        }}
      >
        <DialogContent className="p-5 md:px-7 w-full h-full md:h-auto md:max-w-fit border border-border bg-white rounded-none overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Save Theme</DialogTitle>
            <DialogDescription>
              Save the theme with appriopriate details/reasons for choosing it.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form>
              <div className="flex flex-col">
                <Input
                  id="name"
                  name="name"
                  value={data.name}
                  type="text"
                  label="Name"
                  autoComplete="off"
                  errorMessage={errorMessage}
                  maxLength={INPUT_LIMIT.NAME_MAX}
                  required
                  placeholder="Docter's apointment app theme"
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, name: e.target.value }));
                    if (errorMessage) {
                      setErrorMessage("");
                    }
                  }}
                />
                <Textarea
                  id="color1Reason"
                  name="color1Reason"
                  value={data.color1Reason}
                  maxLength={INPUT_LIMIT.REASON_MAX}
                  label="Background Color"
                  rows={2}
                  autoComplete="off"
                  className="md:w-[750px] mt-4"
                  postElement={<ColorTooltip color={colors.bg} />}
                  placeholder="Creates a sleek and professional background for the website"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      color1Reason: e.target.value,
                    }))
                  }
                />
                <Textarea
                  id="color2Reason"
                  name="color2Reason"
                  label="Primary Color"
                  value={data.color2Reason}
                  maxLength={INPUT_LIMIT.REASON_MAX}
                  rows={2}
                  autoComplete="off"
                  postElement={<ColorTooltip color={colors.primary} />}
                  className="md:w-[750px] mt-4"
                  placeholder="High contrast against the background, enhancing readability."
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      color2Reason: e.target.value,
                    }))
                  }
                />
                <Textarea
                  id="color3Reason"
                  name="color3Reason"
                  label="Accent Color"
                  value={data.color3Reason}
                  maxLength={INPUT_LIMIT.REASON_MAX}
                  postElement={<ColorTooltip color={colors.accent} />}
                  rows={2}
                  autoComplete="off"
                  className="md:w-[750px] mt-4"
                  placeholder="Adds vibrancy and draws attention to interactive elements."
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      color3Reason: e.target.value,
                    }))
                  }
                />
                <Textarea
                  id="color4Reason"
                  name="color4Reason"
                  label="Complementary Color"
                  value={data.color4Reason}
                  autoComplete="off"
                  rows={2}
                  className="md:w-[750px] mt-4"
                  maxLength={INPUT_LIMIT.REASON_MAX}
                  postElement={<ColorTooltip color={colors.extra} />}
                  placeholder="Complementary color creates visual interest and balance."
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      color4Reason: e.target.value,
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
                    const nameValid = validateInput(
                      data.name,
                      { name: true },
                      (error) => setErrorMessage(error)
                    );
                    if (nameValid) {
                      if (isAnyFieldEmpty) {
                        setOpenSure(true);
                      } else {
                        createTheme(e);
                      }
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
        <div className="text-base">
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
          className="absolute border-[0.5px] border-border top-0 right-0 flex h-[65px] w-14"
          style={{ background: color }}
        />
      </TooltipTrigger>
      <TooltipContent>{color}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
