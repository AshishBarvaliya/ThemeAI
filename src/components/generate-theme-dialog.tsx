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
import { Switch } from "./ui/switch";
import axios from "axios";
import { Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";
import MagicWand from "@/assets/svgs/magic-wand";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useHelpers } from "@/hooks/useHelpers";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface GenerateThemeDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PROMPT_LIMIT = parseInt(
  process.env.NEXT_PUBLIC_PROMPT_CHAR_LIMIT || "200"
);

interface FormDataProps {
  prompt: string;
  isDark: boolean;
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
  const [data, setData] = useState<FormDataProps>({
    prompt: "",
    isDark: false,
  });

  const isAuthenticatedIsActived =
    status === "authenticated" && session?.user.isActived;

  const generateTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/generate", {
        isDark: data.isDark,
        details: data.prompt,
      })
      .then((res) => {
        setGeneratedTheme({
          ...res.data,
          isDark: data.isDark,
          prompt: data.prompt,
        });
        setLoading(false);
        setOpen(false);
        setData({ prompt: "", isDark: false });
        setGenerateDialogDefaultValues(undefined);
        router.push("/themes/generated");
      })
      .catch((error) => {
        addToast({ title: error.response.data.error, type: "error" });
        setGenerateDialogDefaultValues(undefined);
        setLoading(false);
        setOpen(false);
      });
  };

  useEffect(() => {
    if (generateDialogDefaultValues) {
      setData(generateDialogDefaultValues);
    } else {
      setData({ prompt: "", isDark: false });
    }
  }, [generateDialogDefaultValues]);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        setGenerateDialogDefaultValues(undefined);
      }}
    >
      <DialogContent className="p-[1px] max-w-fit bg-white border-none rounded-none">
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
                <div className="flex justify-between">
                  <Label htmlFor="prompt" className="mb-2">
                    Describe your project
                  </Label>
                  <div
                    className={cn(
                      "flex items-center text-sm",
                      data.prompt.trim().length > PROMPT_LIMIT &&
                        "text-destructive font-semibold"
                    )}
                  >
                    {`${data.prompt.trim().length}/${PROMPT_LIMIT}`}
                    <InfoIcon info={`Max ${PROMPT_LIMIT} characters allowed`} />
                  </div>
                </div>
                <Textarea
                  id="prompt"
                  name="prompt"
                  value={data.prompt}
                  autoComplete="off"
                  required
                  placeholder="Docter's apointment app theme"
                  className="w-[750px] min-h-[100px] resize-none"
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      prompt: e.target.value,
                    }));
                  }}
                />
                <div className="flex items-center space-x-2 mt-5">
                  <Switch
                    id="isDark"
                    name="isDark"
                    className="border border-border cursor-pointer"
                    checked={data.isDark}
                    onCheckedChange={() =>
                      setData((prev) => ({
                        ...prev,
                        isDark: !data.isDark,
                      }))
                    }
                  />
                  <Label
                    htmlFor="isDark"
                    className="cursor-pointer flex items-center"
                  >
                    Dark mode
                  </Label>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <Button
                  variant="link"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.push("/themes/create");
                  }}
                >
                  Create manually
                </Button>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div>
                        <Button
                          type="button"
                          disabled={loading || !isAuthenticatedIsActived}
                          onClick={(e) => {
                            runIfLoggedInElseOpenLoginDialog(() => {
                              if (data.prompt.trim().length === 0) {
                                addToast({
                                  title: "Prompt is required",
                                  type: "error",
                                });
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
                </TooltipProvider>
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
