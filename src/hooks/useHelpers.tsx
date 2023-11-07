import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { VerificationDialogProps } from "@/components/verification-dialog";
import { GeneratedThemeProps } from "@/interfaces/theme";

type Context = {
  loginOpen: boolean;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
  runIfLoggedInElseOpenLoginDialog: (fn: () => void) => void;
  themeSearchQuery: string;
  setThemeSearchQuery: Dispatch<SetStateAction<string>>;
  themeType: "explore" | "foryou" | "popular";
  setThemeType: Dispatch<SetStateAction<"explore" | "foryou" | "popular">>;
  filterTags: string[];
  setFilterTags: Dispatch<SetStateAction<string[]>>;
  verifyDialogState: {
    open: boolean;
    type: VerificationDialogProps["type"];
    clearURL: boolean;
  };
  setVerifyDialogState: Dispatch<
    SetStateAction<{
      open: boolean;
      type: VerificationDialogProps["type"];
      clearURL: boolean;
    }>
  >;
  generatedTheme: GeneratedThemeProps | null;
  setGeneratedTheme: Dispatch<SetStateAction<GeneratedThemeProps | null>>;
  generateThemeDialog: boolean;
  setGenerateThemeDialog: Dispatch<SetStateAction<boolean>>;
  feedbackSent: boolean;
  setFeedbackSent: Dispatch<SetStateAction<boolean>>;
};

const HelpersContext = createContext({
  loginOpen: false,
  setLoginOpen: () => {},
  runIfLoggedInElseOpenLoginDialog: () => {},
  themeSearchQuery: "",
  setThemeSearchQuery: () => {},
  themeType: "explore",
  setThemeType: () => {},
  filterTags: [],
  setFilterTags: () => {},
  verifyDialogState: {
    open: false,
    type: "pleaseVerify",
    clearURL: true,
  },
  setVerifyDialogState: () => {},
  generatedTheme: null,
  setGeneratedTheme: () => {},
  generateThemeDialog: false,
  setGenerateThemeDialog: () => {},
  feedbackSent: false,
  setFeedbackSent: () => {},
} as Context);

export const HelpersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [verifyDialogState, setVerifyDialogState] = useState<{
    open: boolean;
    type: VerificationDialogProps["type"];
    clearURL: boolean;
  }>({
    open: false,
    type: "pleaseVerify",
    clearURL: true,
  });
  const [themeSearchQuery, setThemeSearchQuery] = useState("");
  const [themeType, setThemeType] = useState<Context["themeType"]>("explore");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [generateThemeDialog, setGenerateThemeDialog] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [generatedTheme, setGeneratedTheme] =
    useState<GeneratedThemeProps | null>(null);
  const { data: session, status } = useSession();

  const runIfLoggedInElseOpenLoginDialog = (fn: () => void) => {
    if (status === "authenticated") {
      if (session?.user?.isActived) {
        fn();
      } else {
        setVerifyDialogState({
          open: true,
          type: "verificationRequired",
          clearURL: false,
        });
      }
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <HelpersContext.Provider
      value={{
        loginOpen,
        setLoginOpen,
        runIfLoggedInElseOpenLoginDialog,
        themeSearchQuery,
        setThemeSearchQuery,
        themeType,
        setThemeType,
        filterTags,
        setFilterTags,
        verifyDialogState,
        setVerifyDialogState,
        generatedTheme,
        setGeneratedTheme,
        generateThemeDialog,
        setGenerateThemeDialog,
        feedbackSent,
        setFeedbackSent,
      }}
    >
      {children}
    </HelpersContext.Provider>
  );
};

export const useHelpers = () => {
  return useContext(HelpersContext);
};
