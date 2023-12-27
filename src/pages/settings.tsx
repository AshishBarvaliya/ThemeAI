import { ChooseAvatarDialog } from "@/components/choose-avatar-dialog";
import { NewPasswordDialog } from "@/components/new-password";
import { RestrictedPage } from "@/components/restricted-page";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useHelpers } from "@/hooks/useHelpers";
import { useToast } from "@/hooks/useToast";
import { ArrowLeftIcon, Pen, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NiceAvatar from "react-nice-avatar";

export default function Settings() {
  const { status, data: session, update } = useSession();
  const { addToast } = useToast();
  const router = useRouter();
  const { runIfLoggedInElseOpenLoginDialog } = useHelpers();
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

  return status === "authenticated" && session ? (
    <>
      <Head>
        <title property="og:title">Profile Settings - ThemeAI</title>
        <meta
          name="description"
          property="og:description"
          content="Manage your profile settings on ThemeAI."
        />
        <meta property="og:image" content="/og/themes.png" />
      </Head>
      <div className="relative flex w-full h-full">
        <Button
          onClick={() => router.back()}
          size="md"
          className="bg-background absolute ml-5 mb-6 mt-1 xl:my-6 z-10"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
          Back
        </Button>
        <div className="flex flex-col w-full my-0 xl:my-6 md:border-[0.5px] border-border overflow-y-auto bg-white max-w-[1000px] mx-auto p-[30px] px-[40px]">
          <Typography element="h1" as="h1" className="text-center pt-3 xl:pt-3">
            Profile Settings
          </Typography>
          <div className="flex flex-col">
            <Typography
              element="h2"
              as="h2"
              className="mx-0 md:mx-10 mt-3 md:mt-0 text-2xl"
            >
              General
            </Typography>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-0">
              <div className="flex flex-col  w-full md:w-2/3 px-0 md:px-10 py-2">
                <Input
                  id="title"
                  name="title"
                  label="Title"
                  className="mt-4"
                  disabled={!editMode || loading}
                  value={data.title}
                  placeholder="e.g. UX Designer"
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <Input
                  id="organization"
                  name="organization"
                  label="Organization"
                  className="mt-4"
                  disabled={!editMode || loading}
                  value={data.organization}
                  placeholder="e.g. Netflix, Inc."
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      organization: e.target.value,
                    }))
                  }
                />
                <Input
                  id="location"
                  name="location"
                  label="Location"
                  className="mt-4"
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
              <div className="flex flex-col w-full md:w-1/3 items-center">
                <Avatar className="h-[170px] w-[170px] border-[0.5px] border-border shadow-md">
                  {session?.user?.avatar ? (
                    <NiceAvatar
                      className="h-[170px] w-[170px]"
                      {...JSON.parse(session?.user?.avatar)}
                    />
                  ) : (
                    <>
                      <AvatarImage
                        src={session?.user.image}
                        alt="profile image"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-[130px]">
                        {session?.user.name?.split(" ")[0][0]}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className="flex flex-col mt-8 gap-4">
                  <Button onClick={() => setOpenAvatar(true)}>
                    Update Avatar
                  </Button>
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
            <Typography
              element="h2"
              as="h2"
              className="mx-0 md:mx-10 mt-10 text-2xl"
            >
              Password
            </Typography>
          </div>
          <div className="flex mx-0 md:mx-10 mt-5">
            <Button
              variant={"destructive"}
              onClick={() =>
                runIfLoggedInElseOpenLoginDialog(() => setNewPasswordOpen(true))
              }
            >
              Reset Password
            </Button>
          </div>
          <ChooseAvatarDialog open={openAvatar} setOpen={setOpenAvatar} />
          <NewPasswordDialog
            open={newPasswordOpen}
            setOpen={setNewPasswordOpen}
          />
        </div>
      </div>
    </>
  ) : status === "unauthenticated" ? (
    <RestrictedPage
      title="Sign in to access this page"
      loginRequired
      errorCode={403}
    />
  ) : null;
}
