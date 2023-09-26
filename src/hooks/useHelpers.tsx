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
};

const HelpersContext = createContext({
  loginOpen: false,
  setLoginOpen: () => {},
  runIfLoggedInElseOpenLoginDialog: () => {},
} as Context);

export const HelpersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loginOpen, setLoginOpen] = useState(false);
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
      }}
    >
      {children}
    </HelpersContext.Provider>
  );
};

export const useHelpers = () => {
  return useContext(HelpersContext);
};
