import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useSession } from "next-auth/react";

type Context = {
  loginOpen: boolean;
  setLoginOpen: Dispatch<SetStateAction<boolean>>;
  runIfLoggedInElseOpenLoginDialog: (fn: () => void) => void;
  themeSearchQuery: string;
  setThemeSearchQuery: Dispatch<SetStateAction<string>>;
};

const HelpersContext = createContext({
  loginOpen: false,
  setLoginOpen: () => {},
  runIfLoggedInElseOpenLoginDialog: () => {},
  themeSearchQuery: "",
  setThemeSearchQuery: () => {},
} as Context);

export const HelpersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [themeSearchQuery, setThemeSearchQuery] = useState("");
  const { status } = useSession();

  const runIfLoggedInElseOpenLoginDialog = (fn: () => void) => {
    if (status === "authenticated") {
      fn();
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
      }}
    >
      {children}
    </HelpersContext.Provider>
  );
};

export const useHelpers = () => {
  return useContext(HelpersContext);
};
