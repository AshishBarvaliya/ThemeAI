import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import NiceAvatar from "react-nice-avatar";
import { landingMenu } from "@/constants/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoginDialog } from "./login-dialog";
import Logo from "@/assets/svgs/logo";
import {
  VerificationDialog,
  VerificationDialogProps,
} from "./verification-dialog";
import { RegisterDialog } from "./register-dialog";
import { UserProfileDialog } from "./user-profile-dialog";
import { ResetPasswordDialog } from "./reset-password";
import { NewPasswordDialog } from "./new-password";
import { GenerateThemeDialog } from "./generate-theme-dialog";
import MagicWand from "@/assets/svgs/magic-wand";

const Header = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const [singupOpen, setSingupOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  const [newPasswordDialog, setNewPasswordDialog] = useState(false);
  const [generateThemeDialog, setGenerateThemeDialog] = useState(false);

  const [verifyDialogState, setVerifyDialogState] = useState<{
    open: boolean;
    type: VerificationDialogProps["type"];
  }>({
    open: false,
    type: "pleaseVerify",
  });

  const isAuthenticated = status === "authenticated";

  const handleSignOut = async (path: string) => {
    await signOut({ callbackUrl: path });
  };

  useEffect(() => {
    if (status === "loading") return;
    else if (router.asPath === "/themes?signin=1") {
      setLoginOpen(true);
      router.push("/themes", undefined, { shallow: true });
    } else if (router.asPath === "/themes?signup=1") {
      setSingupOpen(true);
      router.push("/themes", undefined, { shallow: true });
    } else if (router.asPath === "/themes?verify=0&error=invalid") {
      setVerifyDialogState({
        open: true,
        type: "invalid",
      });
    } else if (router.asPath === "/themes?verify=0&error=expired") {
      setVerifyDialogState({
        open: true,
        type: "expired",
      });
    } else if (router.asPath === "/themes?verify=0&error=verified") {
      if (status === "authenticated" && !session?.user.isActived) {
        handleSignOut("/themes?verify=0&error=verified");
      } else {
        setVerifyDialogState({
          open: true,
          type: "alreadyVerified",
        });
        router.push("/themes", undefined, { shallow: true });
      }
    } else if (router.asPath === "/themes?verify=1") {
      if (status === "authenticated" && !session?.user.isActived) {
        handleSignOut("/themes?verify=1");
      } else {
        setVerifyDialogState({
          open: true,
          type: "verified",
        });
        router.push("/themes", undefined, { shallow: true });
      }
    } else if (router.asPath === "/themes?resetpassword=1") {
      setResetPasswordDialog(true);
    } else if (
      router.pathname === "/themes" &&
      router.query.newpassword === "1" &&
      router.query.token
    ) {
      setNewPasswordDialog(true);
    }
  }, [router, status]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      !session?.user.isActived &&
      router.asPath === "/themes"
    ) {
      setVerifyDialogState({ open: true, type: "pleaseVerify" });
    }
  }, [status]);

  return (
    <div className="fixed bg-background max-w-screen-2xl flex border-b-[0.5px] border-border w-full justify-between py-2 px-6 h-[60px]">
      <Link href="/themes" className="flex">
        <Logo />
      </Link>

      <ul className="flex items-center gap-8">
        {router.pathname === "/" && (
          <>
            {landingMenu.map((item, index) => (
              <li key={index}>
                <Link
                  className="text-primary-foreground text-sm"
                  href={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <Button className="" onClick={() => router.push("/themes")}>
              Launch
            </Button>
          </>
        )}
        {!isAuthenticated && router.pathname !== "/" ? (
          <div>
            <Button type="button" onClick={() => setLoginOpen(true)}>
              Sign In
            </Button>
          </div>
        ) : (
          router.pathname !== "/" && (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setGenerateThemeDialog(true)}
                variant="outline"
              >
                <MagicWand className="mr-1.5 h-4 w-4" />
                Generate Theme
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                    size="icon"
                  >
                    <Avatar className="h-8 w-8 border border-border">
                      {session?.user?.avatar ? (
                        <NiceAvatar
                          className="h-8 w-8"
                          {...JSON.parse(session?.user?.avatar)}
                        />
                      ) : (
                        <>
                          <AvatarImage
                            src={session?.user.image}
                            alt="profile image"
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                            {session?.user.name?.split(" ")[0][0]}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-1"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push("/user/" + session?.user.id)}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push("/settings")}
                    >
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push("/notifications")}
                    >
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        )}
      </ul>
      <LoginDialog
        open={loginOpen}
        setOpen={setLoginOpen}
        setSingupOpen={setSingupOpen}
        forgetPassword={() => setResetPasswordDialog(true)}
      />
      <RegisterDialog open={singupOpen} setOpen={setSingupOpen} />
      <VerificationDialog
        open={verifyDialogState.open}
        setVerifyDialogState={setVerifyDialogState}
        type={verifyDialogState.type}
        setLoginOpen={setLoginOpen}
        setUserProfileOpen={setUserProfileOpen}
      />
      <UserProfileDialog open={userProfileOpen} setOpen={setUserProfileOpen} />
      <ResetPasswordDialog
        open={resetPasswordDialog}
        setOpen={setResetPasswordDialog}
      />
      <NewPasswordDialog
        open={newPasswordDialog}
        setOpen={setNewPasswordDialog}
      />
      <GenerateThemeDialog
        open={generateThemeDialog}
        setOpen={setGenerateThemeDialog}
      />
    </div>
  );
};

export default Header;
