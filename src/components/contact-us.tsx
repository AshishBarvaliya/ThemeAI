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
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { createSupportTicket } from "@/services/website";
import { INPUT_LIMIT } from "@/constants/website";
import { validateInput } from "@/lib/error";

interface ContactUsDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactUsDialog: React.FC<ContactUsDialogProps> = ({
  open,
  setOpen,
}) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    description: "",
    topic: "General",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    const descriptionValid = validateInput(data.description, {}, (error) => {
      setErrorMessage((prev) => ({
        ...prev,
        description: error,
      }));
    });
    if (nameValid && emailValid && descriptionValid) {
      setLoading(true);
      createSupportTicket(data.name, data.email, data.topic, data.description)
        .then(() => {
          addToast({
            title: "The support ticket has been created!",
            type: "success",
          });
          setData({
            name: "",
            email: "",
            description: "",
            topic: "General",
          });
          setLoading(false);
          setOpen(false);
        })
        .catch((error) => {
          addToast({
            title: error.response.data.error,
            type: "error",
            errorCode: error.response.status,
          });
          setLoading(false);
          setOpen(false);
        });
    }
  };

  const list = [
    {
      name: "General",
    },
    {
      name: "Payment issue",
    },
    {
      name: "Report a bug",
    },
    {
      name: "Request a feature",
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!loading) {
          setOpen(false);
        }
      }}
    >
      <DialogContent className="p-8 w-full md:max-w-fit border border-border bg-white rounded-none">
        <DialogHeader>
          <DialogTitle>Contact us</DialogTitle>
          <DialogDescription>
            {"Fill out the form below to generate your ticket"}
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={submit}>
            <div className="flex flex-col">
              <Input
                id="name"
                name="name"
                label="Name"
                autoComplete="off"
                className="md:w-[650px]"
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
                id="email"
                name="email"
                autoComplete="email"
                label="Email"
                maxLength={INPUT_LIMIT.EMAIL_MAX}
                className="md:w-[650px] mt-4"
                value={data.email}
                placeholder="Email"
                errorMessage={errorMessage.email}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, email: e.target.value }));
                  if (errorMessage.email)
                    setErrorMessage((prev) => ({
                      ...prev,
                      email: "",
                    }));
                }}
              />
              <Label htmlFor="topic" className="mt-4 mb-2">
                Topic
              </Label>
              <Select
                value={data.topic}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, topic: value }))
                }
              >
                <SelectTrigger className="md:w-[650px] h-9 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {list?.map((itm) => (
                    <SelectItem
                      key={itm.name}
                      value={itm.name}
                      className="text-sm"
                    >
                      {itm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                id="description"
                name="description"
                label="Description"
                className="md:w-[650px] mt-4"
                autoComplete="off"
                value={data.description}
                placeholder="Description"
                errorMessage={errorMessage.description}
                maxLength={INPUT_LIMIT.DESCRIPTION_MAX}
                rows={8}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, description: e.target.value }));
                  if (errorMessage.description)
                    setErrorMessage((prev) => ({
                      ...prev,
                      description: "",
                    }));
                }}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
