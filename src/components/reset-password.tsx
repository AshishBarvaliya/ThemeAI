import { useState } from "react";
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
import { sendPasswordResetEmail } from "@/services/user";
import { INPUT_LIMIT } from "@/constants/website";
import { validateInput } from "@/lib/error";

interface ResetPasswordDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({
  open,
  setOpen,
}) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    email: "",
  });

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValid = validateInput(data.email, { email: true }, (error) => {
      setErrorMessage(error);
    });
    if (emailValid) {
      setLoading(true);
      sendPasswordResetEmail(data.email)
        .then(() => {
          addToast({
            title: "Password reset email has been sent",
            type: "success",
          });
          setOpen(false);
        })
        .catch((error) => {
          addToast({ title: error.response.data.error, type: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent className="p-8 border border-border bg-white rounded-none">
        <DialogHeader>
          <DialogTitle className="mb-1">Reset Your Password</DialogTitle>
          <DialogDescription>
            Enter the email address associated with your account. If an account
            exists with the entered email, we will send a password reset link to
            help you regain access to your account.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={resetPassword}>
            <Input
              id="reset-email"
              name="reset-email"
              autoComplete="email"
              label="Email"
              value={data.email}
              errorMessage={errorMessage}
              maxLength={INPUT_LIMIT.EMAIL_MAX}
              placeholder="Email"
              className="mt-4"
              onChange={(e) => {
                setData({ email: e.target.value });
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
            />
            <div className="mt-8">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Sending..." : "Send Password Reset Email"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
