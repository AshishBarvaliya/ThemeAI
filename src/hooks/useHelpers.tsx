import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { VerificationDialogProps } from "@/components/verification-dialog";

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
      }}
    >
      {children}
    </HelpersContext.Provider>
  );
};

export const useHelpers = () => {
  return useContext(HelpersContext);
};
