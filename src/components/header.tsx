import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { LoginDialog } from "./login-dialog";
import { VerificationDialog } from "./verification-dialog";
import { RegisterDialog } from "./register-dialog";
import { UserProfileDialog } from "./user-profile-dialog";
import { ResetPasswordDialog } from "./reset-password";
import { NewPasswordDialog } from "./new-password";
import { GenerateThemeDialog } from "./generate-theme-dialog";
import { useHelpers } from "@/hooks/useHelpers";
import { HeaderMenu } from "./header-menu";
import MagicWand from "@/assets/svgs/magic-wand";
import { cn } from "@/lib/utils";
import HeaderSearchBar from "./header-searchbar";
import { SuccessfulMailDialog } from "./successful-mail-dialog";
import {
  PaymentStatusDialog,
  PaymentStatusDialogProps,
} from "./payment-status-dialog";
import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ContactUsDialog } from "./contact-us";

const Header = () => {
  const router = useRouter();
  const {
    loginOpen,
    setLoginOpen,
    verifyDialogState,
    setVerifyDialogState,
    generateThemeDialog,
    setGenerateThemeDialog,
    successfulMailDialog,
    setSuccessfulMailDialog,
    contactUsDialog,
    setContactUsDialog,
  } = useHelpers();
  const { status, data: session } = useSession();
  const [singupOpen, setSingupOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  const [newPasswordDialog, setNewPasswordDialog] = useState(false);
  const [paymentStatusDialog, setPaymentStatusDialog] = useState<
    PaymentStatusDialogProps["data"]
  >({
    open: false,
    type: "invalid",
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
    } else if (
      router.pathname === "/themes" &&
      (router.query.payment === "1" || router.query.payment === "0")
    ) {
      setPaymentStatusDialog({
        open: true,
        type:
          router.query.payment === "0"
            ? router.query.error === "session_exists"
              ? "exists"
              : router.query.error === "server"
              ? "server"
              : "invalid"
            : "success",
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

  const isLandingPage = router.pathname === "/";

  return (
    <div
      className={cn(
        "fixed max-w-screen-2xl flex w-full justify-between py-1 md:py-2 px-3 md:px-6 h-[54px] md:h-[60px] z-40",
        isLandingPage
          ? "backdrop-blur-sm"
          : "bg-background border-b-[0.5px] border-border "
      )}
    >
      <div className="flex items-center flex-1 pr-6">
        <div className="w-[90px] md:w-[176px]">
          <Link href={isLandingPage ? "/" : "/themes"} className="flex">
            <Image src={"/logo.svg"} alt="logo" width={150} height={20} />
          </Link>
        </div>
        {router.pathname === "/themes" ? (
          <div className="flex-1 gap-4 hidden md:flex">
            <HeaderSearchBar />
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-8">
        {router.pathname === "/" && (
          <>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  variant={"outlineDisabled"}
                  className="hover:opacity-60 cursor-default"
                >
                  Figma Plugin <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Coming Soon!</TooltipContent>
            </Tooltip>
          </>
        )}
        {status !== "loading" && router.pathname !== "/" ? (
          <div className="flex items-center gap-1 md:gap-4">
            <Button
              onClick={() => setGenerateThemeDialog(true)}
              className="hidden md:flex"
            >
              <MagicWand className="mr-1.5 h-4 w-4" />
              Generate Theme
            </Button>
            <Button
              onClick={() => setGenerateThemeDialog(true)}
              className="md:hidden flex"
            >
              <MagicWand className="mr-1.5 h-4 w-4" />
              Generate
            </Button>

            {isAuthenticated ? (
              <HeaderMenu />
            ) : (
              <Button type="button" onClick={() => setLoginOpen(true)}>
                Sign In
              </Button>
            )}
          </div>
        ) : null}
      </div>
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
      <SuccessfulMailDialog
        data={successfulMailDialog}
        setData={setSuccessfulMailDialog}
      />
      <PaymentStatusDialog
        data={paymentStatusDialog}
        setData={setPaymentStatusDialog}
      />
      <ContactUsDialog open={contactUsDialog} setOpen={setContactUsDialog} />
    </div>
  );
};

export default Header;
