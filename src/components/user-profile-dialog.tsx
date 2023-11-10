import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { INPUT_LIMIT } from "@/constants/website";

interface UserProfileDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  open,
  setOpen,
}) => {
  const { addToast } = useToast();
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: session?.user?.title || "",
    organization: session?.user?.organization || "",
    location: session?.user?.location || "",
  });

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    update({
      avatar: session?.user?.avatar,
      title: data.title,
      organization: data.organization,
      location: data.location,
    })
      .then(() =>
        addToast({
          title: "The user details has been updated!",
          type: "success",
        })
      )
      .catch(() => {
        addToast({ title: "Failed to update user", type: "error" });
      })
      .finally(() => {
        setLoading(false);
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
                label="Title"
                value={data.title}
                maxLength={INPUT_LIMIT.NAME_MAX}
                placeholder="UX Designer"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Input
                id="organization"
                name="organization"
                label="Organization"
                value={data.organization}
                maxLength={INPUT_LIMIT.NAME_MAX}
                placeholder="Netflix, Inc."
                className="mt-4"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, organization: e.target.value }))
                }
              />
              <Input
                id="location"
                name="location"
                label="Location"
                className="mt-4"
                required
                value={data.location}
                placeholder="Seattle, WA"
                maxLength={INPUT_LIMIT.NAME_MAX}
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
