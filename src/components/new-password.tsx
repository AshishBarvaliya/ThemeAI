import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { updatePassword } from "@/services/user";
import { useRouter } from "next/router";

interface RegisterDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewPasswordDialog: React.FC<RegisterDialogProps> = ({
  open,
  setOpen,
}) => {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    currentpassword: "",
    password: "",
    confirmPassword: "",
  });

  const token = router.query.token as string;

  const close = () => {
    setOpen(false);
    router.push(router.pathname, undefined, { shallow: true });
    setData({
      currentpassword: "",
      password: "",
      confirmPassword: "",
    });
  };

  const createPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      addToast({ title: "Passwords do not match", type: "error" });
      setData((prev) => ({ ...prev, confirmPassword: "" }));
    } else {
      setLoading(true);
      updatePassword(
        data.currentpassword,
        data.password,
        router.query.token as string
      )
        .then(() => {
          addToast({
            title: "The password has been updated successfully!",
            type: "success",
          });
          close();
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
    <Dialog open={open} onOpenChange={() => close()}>
      <DialogContent className="p-8 border border-border bg-white rounded-none">
        <DialogHeader>
          <DialogTitle className="mb-1">Create New Password</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={createPassword}>
            {!token ? (
              <Input
                id="currentpassword"
                name="currentpassword"
                type="password"
                className="mt-4"
                required
                value={data.currentpassword}
                placeholder="Current Password"
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    currentpassword: e.target.value,
                  }))
                }
              />
            ) : null}
            <Input
              id="password"
              name="password"
              type="password"
              className="mt-4"
              required
              value={data.password}
              placeholder="Password"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="mt-4"
              required
              value={data.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
            <div className="mt-8">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
