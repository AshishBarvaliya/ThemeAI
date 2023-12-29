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
import { PasswordEye } from "./password-eye";
import { INPUT_LIMIT } from "@/constants/website";
import Typography from "./ui/typography";

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
  const [hidePassword, setHidePassword] = useState(true);
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
      } else {
        setOpen(false);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (session.status === "authenticated") setOpen(false);
  }, [session, setOpen]);

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
              <div>
                <Input
                  id="login-email"
                  name="login-email"
                  autoComplete="email"
                  type="email"
                  label="Email"
                  value={data.email}
                  placeholder="Email"
                  maxLength={INPUT_LIMIT.EMAIL_MAX}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                <Input
                  id="login-password"
                  name="login-password"
                  label="Password"
                  autoComplete="off"
                  className="mt-4"
                  required
                  value={data.password}
                  placeholder="Password"
                  maxLength={INPUT_LIMIT.PASSWORD_MAX}
                  type={hidePassword ? "password" : "text"}
                  postElement={
                    <PasswordEye
                      value={hidePassword}
                      setValue={setHidePassword}
                    />
                  }
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              <div className="flex text-xs my-3">
                <Typography
                  element="p"
                  as="p"
                  onClick={forgetPassword}
                  className="underline text-xs text-primary-foreground cursor-pointer"
                >
                  Forgot Password?
                </Typography>
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
              <Google className="flex flex-0 flex-grow-0 flex-shrink-0 flex-auto" />
              <span className="text-center pl-2">Continue with Google</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
