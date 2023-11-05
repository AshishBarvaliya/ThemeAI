import { ChooseAvatarDialog } from "@/components/choose-avatar-dialog";
import { NewPasswordDialog } from "@/components/new-password";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typography from "@/components/ui/typography";
import { useToast } from "@/hooks/useToast";
import { Pen, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NiceAvatar from "react-nice-avatar";

export default function Settings() {
  const { status, data: session, update } = useSession();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newPasswordOpen, setNewPasswordOpen] = useState(false);
  const [data, setData] = useState({
    title: session?.user?.title || "",
    organization: session?.user?.organization || "",
    location: session?.user?.location || "",
  });

  const isDirty =
    data.title !== session?.user?.title ||
    data.organization !== session?.user?.organization ||
    data.location !== session?.user?.location;

  const onRemoveAvatar = async () => {
    if (session?.user.avatar) {
      update({
        avatar: null,
        title: session?.user?.title,
        organization: session?.user?.organization,
        location: session?.user?.location,
      })
        .then(() =>
          addToast({
            title: "The avatar has been removed!",
            type: "success",
          })
        )
        .catch(() => {
          addToast({ title: "Failed to remove avatar", type: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onSaveUser = () => {
    if (isDirty) {
      setLoading(true);
      update({
        avatar: session?.user?.avatar,
        title: data.title,
        organization: data.organization,
        location: data.location,
      })
        .then(() =>
          addToast({
            title: "The user has been updated!",
            type: "success",
          })
        )
        .catch(() => {
          addToast({ title: "Failed to update user", type: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      setData({
        title: session?.user?.title || "",
        organization: session?.user?.organization || "",
        location: session?.user?.location || "",
      });
    }
  }, [status]);

  return (
    <div className="flex flex-col w-full my-6 border-[0.5px] border-border bg-white mx-36 p-[30px] px-[40px]">
      <Typography element="h1" as="h1" className="text-center">
        Profile Settings
      </Typography>
      <div className="flex flex-col">
        <Typography element="h3" as="h3" className="mx-10">
          General
        </Typography>
        <div className="flex">
          <div className="flex flex-col w-2/3 px-10 py-2">
            <Label htmlFor="title" className="mt-4 mb-2">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              disabled={!editMode || loading}
              value={data.title}
              placeholder="e.g. UX Designer"
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Label htmlFor="organization" className="mt-4 mb-2">
              Organization
            </Label>
            <Input
              id="organization"
              name="organization"
              disabled={!editMode || loading}
              value={data.organization}
              placeholder="e.g. Netflix"
              onChange={(e) =>
                setData((prev) => ({ ...prev, organization: e.target.value }))
              }
            />
            <Label htmlFor="location" className="mt-4 mb-2">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              disabled={!editMode || loading}
              value={data.location}
              placeholder="e.g. Seattle, WA"
              onChange={(e) =>
                setData((prev) => ({ ...prev, location: e.target.value }))
              }
            />
            <div className="flex mt-7 justify-end">
              {editMode ? (
                <>
                  <Button
                    className="mr-4"
                    size={"md"}
                    variant="outline"
                    onClick={() => {
                      setEditMode(false);
                      setData({
                        title: session?.user?.title || "",
                        organization: session?.user?.organization || "",
                        location: session?.user?.location || "",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size={"md"}
                    onClick={onSaveUser}
                    disabled={!isDirty || loading}
                  >
                    <Save className="h-3 w-3 mr-1.5" /> Save
                  </Button>
                </>
              ) : (
                <Button size={"md"} onClick={() => setEditMode(true)}>
                  <Pen className="h-3 w-3 mr-1.5" /> Edit
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col w-1/3 items-center">
            <Avatar className="h-[170px] w-[170px] border-[0.5px] border-border shadow-md">
              {session?.user?.avatar ? (
                <NiceAvatar
                  className="h-[170px] w-[170px]"
                  {...JSON.parse(session?.user?.avatar)}
                />
              ) : (
                <>
                  <AvatarImage src={session?.user.image} alt="profile image" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-[130px]">
                    {session?.user.name?.split(" ")[0][0]}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div className="flex flex-col mt-8 gap-4">
              <Button onClick={() => setOpenAvatar(true)}>Update Avatar</Button>
              <Button
                onClick={onRemoveAvatar}
                variant="destructive"
                disabled={!session?.user.avatar}
              >
                Remove Avatar
              </Button>
            </div>
          </div>
        </div>
        <Typography element="h3" as="h3" className="mx-10 mt-10">
          Password
        </Typography>
      </div>
      <div className="flex mx-10 mt-5" onClick={() => setNewPasswordOpen(true)}>
        <Button variant={"destructive"}>Reset Password</Button>
      </div>
      <ChooseAvatarDialog open={openAvatar} setOpen={setOpenAvatar} />
      <NewPasswordDialog open={newPasswordOpen} setOpen={setNewPasswordOpen} />
    </div>
  );
}
