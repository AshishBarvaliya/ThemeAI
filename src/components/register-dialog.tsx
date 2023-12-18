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
import { PasswordEye } from "./password-eye";
import { INPUT_LIMIT } from "@/constants/website";
import { validateInput } from "@/lib/error";

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
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameValid = validateInput(data.name, { name: true }, (error) => {
      setErrorMessage((prev) => ({
        ...prev,
        name: error,
      }));
    });
    const emailValid = validateInput(data.email, { email: true }, (error) => {
      setErrorMessage((prev) => ({
        ...prev,
        email: error,
      }));
    });
    const passwordValid = validateInput(
      data.password,
      { password: true },
      (error) => {
        setErrorMessage((prev) => ({
          ...prev,
          password: error,
        }));
      }
    );
    if (nameValid && emailValid && passwordValid) {
      setLoading(true);
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
    }
  };

  return (
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
            <div className="mt-1">
              <Input
                id="register-name"
                name="register-name"
                autoComplete="name"
                label="Name"
                maxLength={INPUT_LIMIT.NAME_MAX}
                errorMessage={errorMessage.name}
                value={data.name}
                placeholder="Name"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, name: e.target.value }));
                  if (errorMessage.name)
                    setErrorMessage((prev) => ({
                      ...prev,
                      name: "",
                    }));
                }}
              />
              <Input
                id="register-email"
                name="register-email"
                label="Email"
                autoComplete="email"
                maxLength={INPUT_LIMIT.EMAIL_MAX}
                errorMessage={errorMessage.email}
                value={data.email}
                placeholder="Email"
                className="mt-4"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, email: e.target.value }));
                  if (errorMessage.email)
                    setErrorMessage((prev) => ({
                      ...prev,
                      email: "",
                    }));
                }}
              />
              <Input
                id="register-password"
                name="register-password"
                label="Password"
                autoComplete="off"
                className="mt-4"
                value={data.password}
                placeholder="Password"
                maxLength={INPUT_LIMIT.PASSWORD_MAX}
                errorMessage={errorMessage.password}
                type={hidePassword ? "password" : "text"}
                postElement={
                  <PasswordEye
                    value={hidePassword}
                    setValue={setHidePassword}
                  />
                }
                onChange={(e) => {
                  setData((prev) => ({ ...prev, password: e.target.value }));
                  if (errorMessage.password)
                    setErrorMessage((prev) => ({
                      ...prev,
                      password: "",
                    }));
                }}
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
