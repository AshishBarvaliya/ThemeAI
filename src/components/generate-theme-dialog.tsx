import { useToast } from "@/hooks/useToast";
import { InfoIcon } from "./info-icon";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";
import MagicWand from "@/assets/svgs/magic-wand";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useHelpers } from "@/hooks/useHelpers";
import { useSession } from "next-auth/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { INPUT_LIMIT } from "@/constants/website";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GeneratedThemeProps } from "@/interfaces/theme";

interface GenerateThemeDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormDataProps {
  prompt: string;
  mode: GeneratedThemeProps["mode"];
}

export const GenerateThemeDialog: React.FC<GenerateThemeDialogProps> = ({
  open,
  setOpen,
}) => {
  const { addToast } = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    setGeneratedTheme,
    setGenerateDialogDefaultValues,
    generateDialogDefaultValues,
    runIfLoggedInElseOpenLoginDialog,
  } = useHelpers();
  const [loading, setLoading] = useState(false);
  const [isPromptError, setIsPromptError] = useState(false);
  const [data, setData] = useState<FormDataProps>({
    prompt: "",
    mode: "Default",
  });

  const isAuthenticatedIsActived =
    status === "authenticated" && session?.user.isActived;

  const generateTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/generate", {
        mode: data.mode,
        details: data.prompt,
      })
      .then((res) => {
        router.push("/themes/generated");
        setGeneratedTheme({
          ...res.data,
          mode: data.mode,
          prompt: data.prompt,
        });
        setOpen(false);
        setGenerateDialogDefaultValues(undefined);
        setIsPromptError(false);
        setLoading(false);
        setData({ prompt: "", mode: "Default" });
      })
      .catch((error) => {
        addToast({
          title: error.response.data.error,
          type: "error",
          errorCode: error.response.status,
        });
        setGenerateDialogDefaultValues(undefined);
        setLoading(false);
        setIsPromptError(false);
        setOpen(false);
      });
  };

  useEffect(() => {
    if (generateDialogDefaultValues) {
      setData(generateDialogDefaultValues);
    } else {
      setData({ prompt: "", mode: "Default" });
      setIsPromptError(false);
    }
  }, [generateDialogDefaultValues]);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!loading) {
          setOpen(val);
          setGenerateDialogDefaultValues(undefined);
          setIsPromptError(false);
        }
      }}
    >
      <DialogContent className="p-[1px] w-full md:max-w-fit bg-white border-none rounded-none">
        <div className="z-10 p-8 bg-white">
          <DialogHeader>
            <DialogTitle>Generate Theme</DialogTitle>
            <DialogDescription>
              Generate a new theme based on your prompt.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <form>
              <div className="flex flex-col">
                <div className="flex justify-between h-6">
                  <div className="flex">
                    <Label htmlFor="prompt" className="mb-2 w-fit">
                      Describe your project
                    </Label>
                    {isPromptError ? (
                      <span className="text-destructive ml-3 text-xs p-0 truncate">
                        {data.prompt.trim().length > INPUT_LIMIT.PROMPT_MAX
                          ? "(maximum 200 characters allowed)"
                          : "(minimum 30 characters required)"}
                      </span>
                    ) : null}
                  </div>
                  <div className={cn("flex items-center text-sm")}>
                    {`${data.prompt.trim().length}/${INPUT_LIMIT.PROMPT_MAX}`}
                    <InfoIcon
                      info={`Max ${INPUT_LIMIT.PROMPT_MAX} characters allowed`}
                    />
                  </div>
                </div>
                <Textarea
                  id="prompt"
                  name="prompt"
                  value={data.prompt}
                  autoComplete="off"
                  maxLength={INPUT_LIMIT.PROMPT_MAX}
                  rows={4}
                  placeholder="Docter's apointment app theme"
                  className={cn(
                    "md:w-[750px] min-h-[100px] resize-none",
                    isPromptError ? "border border-destructive" : ""
                  )}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      prompt: e.target.value,
                    }));
                    if (
                      e.target.value.length >= INPUT_LIMIT.PROMPT_MIN &&
                      isPromptError
                    ) {
                      setIsPromptError(false);
                    }
                  }}
                />
                <Label htmlFor="mode" className="mt-4 mb-2">
                  Mode
                </Label>
                <Select
                  value={data.mode}
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      mode: value as FormDataProps["mode"],
                    }))
                  }
                >
                  <SelectTrigger className="md:w-[150px] h-9 text-sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Default"} className="text-sm">
                      Default
                    </SelectItem>
                    <SelectItem value={"Light"} className="text-sm">
                      Light
                    </SelectItem>
                    <SelectItem value={"Dark"} className="text-sm">
                      Dark
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <Button
                  variant="link"
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setOpen(false);
                    router.push("/themes/create");
                  }}
                >
                  Create manually
                </Button>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        type="button"
                        disabled={loading || !isAuthenticatedIsActived}
                        onClick={(e) => {
                          runIfLoggedInElseOpenLoginDialog(() => {
                            if (
                              data.prompt.trim().length <
                                INPUT_LIMIT.PROMPT_MIN ||
                              data.prompt.trim().length > INPUT_LIMIT.PROMPT_MAX
                            ) {
                              setIsPromptError(true);
                              return;
                            }
                            generateTheme(e);
                          });
                        }}
                      >
                        {loading ? (
                          <ReloadIcon className="mr-1.5 h-4 w-4 animate-spin" />
                        ) : (
                          <MagicWand className="mr-1.5 h-4 w-4" />
                        )}
                        {loading ? "Generating..." : "Generate"}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!isAuthenticatedIsActived ? (
                    <TooltipContent>
                      {status === "unauthenticated"
                        ? "User must be logged in to generate themes"
                        : !session?.user?.isActived
                        ? "User must be verified"
                        : "Generate"}
                    </TooltipContent>
                  ) : null}
                </Tooltip>
              </div>
            </form>
          </div>
          <div className="absolute right-4 top-4">
            <DialogClose asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </DialogClose>
          </div>
        </div>
        <div className="absolute gradient-border w-full h-full" />
      </DialogContent>
    </Dialog>
  );
};
