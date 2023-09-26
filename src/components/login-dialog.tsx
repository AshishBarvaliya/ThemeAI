import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Google from "@/assets/icons/Google";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/useToast";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LoginDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSingupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  forgetPassword: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({
  open,
  setOpen,
  setSingupOpen,
  forgetPassword,
}) => {
  const { addToast } = useToast();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        addToast({
          title: callback.error,
          type: "error",
        });
      }

      if (callback?.ok && !callback?.error) {
        setOpen(false);
        addToast({
          title: "Logged in successfully!",
          type: "success",
        });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (session.status === "authenticated") setOpen(false);
  }, [session, setOpen]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-8 border border-border bg-white rounded-none">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              {"Don't have an account? "}
              <span
                className="underline text-primary-foreground cursor-pointer"
                onClick={() => setSingupOpen(true)}
              >
                Create an account
              </span>
            </DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={loginUser}>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  placeholder="Email"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-4"
                  required
                  value={data.password}
                  placeholder="Password"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              <div
                onClick={forgetPassword}
                className="underline text-xs my-3 block text-primary-foreground cursor-pointer"
              >
                Forgot Password?
              </div>
              <div className="mt-8">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
            <div className="flex items-center gap-3 my-4 justify-between">
              <Separator className="w-full shrink h-[0.5px]" />
              OR
              <Separator className="w-full shrink h-[0.5px]" />
            </div>
            <Button
              onClick={() => signIn("google")}
              className="w-full"
              variant="outline"
              disabled={loading}
            >
              <Google className="flex flex-0 flex-grow-0 flex-shrink-0 flex-auto" />{" "}
              <span className="flex-1 text-center">Continue with Google</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
