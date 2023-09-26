import { useState } from "react";
import axios from "axios";
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
import { signIn } from "next-auth/react";

interface RegisterDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterDialog: React.FC<RegisterDialogProps> = ({
  open,
  setOpen,
}) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/user", data)
      .then(() => {
        addToast({ title: "New user has been registered!", type: "success" });
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then(() => {
          setLoading(false);
          setOpen(false);
        });
      })
      .catch((error) => {
        addToast({ title: error.response.data.error, type: "error" });
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-8 border border-border bg-white rounded-none">
        <DialogHeader>
          <DialogTitle>Register for an account</DialogTitle>
          <DialogDescription>
            {"Already have an account? "}
            <span
              className="underline text-primary-foreground cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Sign in
            </span>
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={registerUser}>
            <div className="mt-2">
              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={data.name}
                placeholder="Name"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
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
            <div className="mt-8">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
