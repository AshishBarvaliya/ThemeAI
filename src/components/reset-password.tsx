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
import { useRouter } from "next/router";

interface ResetPasswordDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({
  open,
  setOpen,
}) => {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    sendPasswordResetEmail(data.email)
      .then(() => {
        addToast({
          title: "Password reset email has been sent",
          type: "success",
        });
        router.push("/themes", undefined, { shallow: true });
        setOpen(false);
      })
      .catch((error) => {
        addToast({ title: error.response.data.error, type: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        router.push("/themes", undefined, { shallow: true });
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
              id="email"
              name="email"
              autoComplete="email"
              type="email"
              value={data.email}
              placeholder="Email"
              className="mt-4"
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
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
