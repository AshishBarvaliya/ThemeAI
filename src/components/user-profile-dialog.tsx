import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

interface UserProfileDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  open,
  setOpen,
}) => {
  const { addToast } = useToast();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: session?.user?.title || "",
    organization: session?.user?.organization || "",
    location: session?.user?.location || "",
  });

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .put("/api/user", data)
      .then(() => {
        addToast({
          title: "The user details has been updated!",
          type: "success",
        });
      })
      .catch((error) => {
        addToast({ title: error.response.data.error, type: "error" });
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-8 max-w-[450px] border border-border bg-white rounded-none">
        <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={updateUser}>
            <div className="mt-2">
              <Input
                id="title"
                name="title"
                value={data.title}
                placeholder="Title (UX Designer)"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Input
                id="organization"
                name="organization"
                value={data.organization}
                placeholder="Organization (Netflix)"
                className="mt-4"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, organization: e.target.value }))
                }
              />
              <Input
                id="location"
                name="location"
                className="mt-4"
                required
                value={data.location}
                placeholder="Location (Seattle, WA)"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>
            <div className="mt-8">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                variant={"outline"}
                type="button"
                className="w-full mt-4"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Skip for now
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
