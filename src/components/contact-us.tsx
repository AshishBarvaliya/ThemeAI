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
  const [data, setData] = useState({
    name: "",
    email: "",
    description: "",
    topic: "General",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (data.name.trim().length === 0) {
      addToast({ title: "Name is required", type: "error" });
      setLoading(false);
      return;
    }
    if (data.email.trim().length === 0) {
      addToast({ title: "Email is required", type: "error" });
      setLoading(false);
      return;
    }
    if (data.description.trim().length === 0) {
      addToast({ title: "Description is required", type: "error" });
      setLoading(false);
      return;
    }
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
        addToast({ title: error.response.data.error, type: "error" });
        setLoading(false);
        setOpen(false);
      });
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-8 max-w-fit border border-border bg-white rounded-none">
        <DialogHeader>
          <DialogTitle>Contact us</DialogTitle>
          <DialogDescription>
            {"Fill out the form below to generate your ticket"}
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={submit}>
            <div className="flex flex-col">
              <Label htmlFor="name" className="mb-1">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                autoComplete="off"
                className="w-[650px]"
                value={data.name}
                placeholder="Name"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <Label htmlFor="email" className="mt-4 mb-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                className="w-[650px]"
                value={data.email}
                placeholder="Email"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
              <Label htmlFor="topic" className="mt-4 mb-1">
                Topic
              </Label>
              <Select
                value={data.topic}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, topic: value }))
                }
              >
                <SelectTrigger className="w-[650px] h-9 text-sm">
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
              <Label htmlFor="description" className="mt-4 mb-1">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="w-[650px]"
                autoComplete="off"
                value={data.description}
                placeholder="Description"
                rows={8}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, description: e.target.value }))
                }
                required
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
