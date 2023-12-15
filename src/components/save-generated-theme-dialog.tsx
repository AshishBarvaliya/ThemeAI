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
import { TagProps } from "@/interfaces/theme";
import { InfoIcon } from "./info-icon";
import TagPicker from "./tag-picker";
import { useRouter } from "next/router";
import { useHelpers } from "@/hooks/useHelpers";
import { INPUT_LIMIT } from "@/constants/website";
import { validateInput } from "@/lib/error";
import { TEMPLATE_NAMES } from "@/constants/templates";

interface RegisterDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  generatedTheme: {
    color_1: string;
    color_1_reason: string;
    color_2: string;
    color_2_reason: string;
    color_3: string;
    color_3_reason: string;
    color_4: string;
    color_4_reason: string;
    primary: string;
    secondary: string;
    prompt: string;
    isDark: boolean;
  };
}

interface FormDataProps {
  name: string;
  isPrivate: boolean;
}

export const SaveGeneratedThemeDialog: React.FC<RegisterDialogProps> = ({
  open,
  setOpen,
  generatedTheme,
}) => {
  const { addToast } = useToast();
  const router = useRouter();
  const { setGeneratedTheme } = useHelpers();
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<FormDataProps>({
    name: "",
    isPrivate: false,
  });

  const createTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/themes", {
        color_1: generatedTheme.color_1,
        color_2: generatedTheme.color_2,
        color_3: generatedTheme.color_3,
        color_4: generatedTheme.color_4,
        font_1: generatedTheme.primary,
        font_2: generatedTheme.secondary,
        prompt: generatedTheme.prompt,
        isAIGenerated: true,
        name: data.name,
        color_1_reason: generatedTheme.color_1_reason,
        color_2_reason: generatedTheme.color_2_reason,
        color_3_reason: generatedTheme.color_3_reason,
        color_4_reason: generatedTheme.color_4_reason,
        isPrivate: data.isPrivate,
        tags: selectedTags,
        template:
          TEMPLATE_NAMES[Math.floor(Math.random() * TEMPLATE_NAMES.length)],
      })
      .then((res) => {
        if (res.data) {
          router.push(`/themes/${res.data?.id}`);
        }
        addToast({ title: "New theme has been registered!", type: "success" });
        setLoading(false);
        setOpen(false);
        setGeneratedTheme(null);
      })
      .catch((error) => {
        addToast({ title: error.response.data.error, type: "error" });
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-5 px-7 w-full md:max-w-fit border border-border bg-white rounded-none">
          <DialogHeader>
            <DialogTitle>Save Theme</DialogTitle>
            <DialogDescription>Save the theme.</DialogDescription>
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
                  maxLength={INPUT_LIMIT.NAME_MAX}
                  autoComplete="off"
                  errorMessage={errorMessage}
                  required
                  placeholder="Docter's apointment app theme"
                  className="md:w-[750px]"
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, name: e.target.value }));
                    if (errorMessage) {
                      setErrorMessage("");
                    }
                  }}
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
    </>
  );
};
