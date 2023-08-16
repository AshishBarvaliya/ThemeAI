import Toast, { IToast } from "@/components/ui/toast";
import { createContext, useState, useContext, useCallback } from "react";

interface ToastProps {
  title: string;
  description?: string;
  type?: "success" | "warning" | "error";
}

type Context = {
  addToast: (toast: ToastProps) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext({
  addToast: () => {},
  removeToast: () => {},
} as Context);

let id = 1;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback(
    (toast: ToastProps) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: id++,
          ...toast,
        },
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id: number) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <div
        className="fixed top-0 right-0 w-full max-w-sm"
        style={{
          zIndex: 210,
        }}
      >
        {toasts.map((toast, i) => (
          <Toast toast={toast} key={i} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
