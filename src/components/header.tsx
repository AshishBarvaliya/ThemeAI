import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { landingMenu } from "@/constants/navigation";
import { signOut, useSession } from "next-auth/react";
import { LoginDialog } from "./login-dialog";
import { VerificationDialog } from "./verification-dialog";
import { RegisterDialog } from "./register-dialog";
import { UserProfileDialog } from "./user-profile-dialog";
import { ResetPasswordDialog } from "./reset-password";
import { NewPasswordDialog } from "./new-password";
import { GenerateThemeDialog } from "./generate-theme-dialog";
import { useHelpers } from "@/hooks/useHelpers";
import { managePurchase } from "@/services/stripe";
import { useToast } from "@/hooks/useToast";
import { SeachBar } from "./ui/input";
import { FiterTags } from "./filter-tags";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/services/theme";
import { HeaderMenu } from "./header-menu";
import MagicWand from "@/assets/svgs/magic-wand";

const Header = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const {
    loginOpen,
    setLoginOpen,
    setThemeSearchQuery,
    filterTags,
    setFilterTags,
    verifyDialogState,
    setVerifyDialogState,
    generateThemeDialog,
    setGenerateThemeDialog,
  } = useHelpers();
  const { status, data: session } = useSession();
  const [singupOpen, setSingupOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  const [newPasswordDialog, setNewPasswordDialog] = useState(false);

  const { data: tags } = useQuery(["tags"], getTags);

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
        clearURL: true,
      });
    } else if (router.asPath === "/themes?verify=0&error=expired") {
      setVerifyDialogState({
        open: true,
        type: "expired",
        clearURL: true,
      });
    } else if (router.asPath === "/themes?verify=0&error=verified") {
      if (status === "authenticated" && !session?.user.isActived) {
        handleSignOut("/themes?verify=0&error=verified");
      } else {
        setVerifyDialogState({
          open: true,
          type: "alreadyVerified",
          clearURL: true,
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
          clearURL: true,
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
    } else if (router.pathname === "/themes" && router.query.session_id) {
      managePurchase(router.query.session_id as string)
        .then(() => addToast({ title: "Purchase success", type: "success" }))
        .finally(() => {
          router.push(router.pathname, undefined, { shallow: true });
        });
    }
  }, [router, status]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      !session?.user.isActived &&
      router.asPath === "/themes"
    ) {
      setVerifyDialogState({
        open: true,
        type: "pleaseVerify",
        clearURL: true,
      });
    }
  }, [status]);

  useEffect(() => {
    if (filterTags?.length) {
      setThemeSearchQuery("");
    }
  }, [filterTags]);

  return (
    <div className="fixed bg-background max-w-screen-2xl flex border-b-[0.5px] border-border w-full justify-between py-2 px-6 h-[60px] z-40">
      <div className="flex items-center flex-1 pr-6">
        <div className="w-[176px]">
          <Link href="/themes" className="flex">
            <h1
              className="text-3xl text-black font-bold"
              style={{
                fontFamily: "Monoton",
                textShadow:
                  "1px 1px 0px #eb452b, 2px 2px 0px #46b59b, 3px 3px 0px #052939, 4px 4px 0px #c11a2b",
              }}
            >
              T
            </h1>
          </Link>
        </div>
        {router.pathname === "/themes" ? (
          <div className="flex flex-1 gap-4">
            <SeachBar
              id="font-search"
              name="font-search"
              placeholder="Search by font, name, or description"
              autoComplete="off"
              onRemoveCallback={() => {
                setThemeSearchQuery("");
                setFilterTags([]);
              }}
              onSearch={(string: string) => {
                setThemeSearchQuery(string);
                setFilterTags([]);
              }}
            />
            <FiterTags
              tags={tags || []}
              selected={filterTags}
              setSelected={setFilterTags}
              isHeader
            />
          </div>
        ) : null}
      </div>

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
          <div className="flex items-center gap-4">
            <Button onClick={() => setGenerateThemeDialog(true)}>
              <MagicWand className="mr-1.5 h-4 w-4" />
              Generate Theme
            </Button>
            <Button type="button" onClick={() => setLoginOpen(true)}>
              Sign In
            </Button>
          </div>
        ) : (
          router.pathname !== "/" && (
            <div className="flex items-center gap-4">
              <Button onClick={() => setGenerateThemeDialog(true)}>
                <MagicWand className="mr-1.5 h-4 w-4" />
                Generate Theme
              </Button>
              <HeaderMenu />
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
        clearURL={verifyDialogState.clearURL}
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
