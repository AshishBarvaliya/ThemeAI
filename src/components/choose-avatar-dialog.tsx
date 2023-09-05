import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Avatar, { AvatarFullConfig, genConfig } from "react-nice-avatar";
import { RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";

interface ResetPasswordDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChooseAvatarDialog: React.FC<ResetPasswordDialogProps> = ({
  open,
  setOpen,
}) => {
  const { addToast } = useToast();
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [generate, setGenerate] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<{
    config: AvatarFullConfig | null;
    index: string;
  }>({
    config: session?.user?.avatar ? JSON.parse(session?.user?.avatar) : null,
    index: "00",
  });

  console.log(session);

  const onSave = () => {
    if (selectedAvatar.config !== null) {
      setLoading(true);
      update({
        avatar: JSON.stringify(selectedAvatar.config),
        title: session?.user?.title,
        organization: session?.user?.organization,
        location: session?.user?.location,
      })
        .then(() =>
          addToast({
            title: "The avatar has been updated!",
            type: "success",
          })
        )
        .catch(() => {
          addToast({ title: "Failed to update avatar", type: "error" });
        })
        .finally(() => {
          setOpen(false);
          setLoading(false);
        });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setSelectedAvatar({
          config: null,
          index: "00",
        });
      }}
    >
      <DialogContent className="p-10 max-w-fit border border-border bg-white rounded-none">
        <DialogHeader>
          <DialogTitle className="mb-1">Choose Your Avatar</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex flex-col gap-5">
            {new Array(5).fill(1).map((_, i) => (
              <div className="flex gap-5" key={i}>
                {new Array(5).fill(1).map((_, j) => (
                  <div
                    key={j + i + generate}
                    onClick={() => {
                      setSelectedAvatar({
                        config: genConfig(i + "" + j + generate),
                        index: i + "" + j,
                      });
                    }}
                  >
                    <Avatar
                      className={`h-28 w-28 cursor-pointer ${
                        selectedAvatar.config &&
                        selectedAvatar.index === i + "" + j
                          ? "ring-2 ring-primary-foreground"
                          : ""
                      } hover:ring-2 hover:ring-primary-foreground`}
                      {...(selectedAvatar.config &&
                      selectedAvatar.index === i + "" + j
                        ? selectedAvatar.config
                        : genConfig("" + i + j + generate))}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex pt-10 justify-between">
            <Button
              variant={"outline"}
              onClick={() => {
                setGenerate(generate + 1);
                setSelectedAvatar({
                  config: null,
                  index: "00",
                });
              }}
              disabled={loading}
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button
              disabled={selectedAvatar.config === null || loading}
              onClick={onSave}
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
