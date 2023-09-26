import { Dialog, DialogContent } from "./ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";
import { Button } from "./ui/button";
import Typography from "./ui/typography";
import { MailCheck, MailMinus, MailQuestion } from "lucide-react";
import { sendVerificationEmail } from "@/services/user";
import { useRouter } from "next/router";

export interface VerificationDialogProps {
  open: boolean;
  setVerifyDialogState: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: VerificationDialogProps["type"];
    }>
  >;
  type:
    | "invalid"
    | "expired"
    | "alreadyVerified"
    | "pleaseVerify"
    | "verificationRequired"
    | "verified";
  setUserProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VerificationDialog: React.FC<VerificationDialogProps> = ({
  open,
  setVerifyDialogState,
  type,
  setUserProfileOpen,
  setLoginOpen,
}) => {
  const router = useRouter();
  const { addToast } = useToast();
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const isFirstTime =
    !session?.user?.location &&
    !session?.user?.organization &&
    !session?.user?.title;

  const isAuthenticated = status === "authenticated";

  const sendMail = async () => {
    if (isAuthenticated) {
      setLoading(true);
      sendVerificationEmail()
        .then(() => {
          addToast({
            title: "Verification email has been sent successfully",
            type: "success",
          });
        })
        .catch(() => {
          addToast({
            title: "Failed to send verification email",
            type: "error",
          });
        })
        .finally(() => {
          setVerifyDialogState((prev) => ({ open: false, type: prev.type }));
          setLoading(false);
          router.push("/themes", undefined, { shallow: true });
        });
    }
  };

  const messages = {
    invalid: {
      icon: <MailMinus className="w-6 h-6 text-primary-foreground" />,
      title: "Verification Unsuccessful",
      description:
        "We're sorry, but the verification link you clicked appears to be invalid. If you copied and pasted the link, please make sure you did so completely. Alternatively, you may request a new verification email.",
      bg: "bg-destructive",
      button: "resend",
    },
    expired: {
      icon: <MailMinus className="w-6 h-6 text-primary-foreground" />,
      title: "Verification Link Expired",
      description:
        "Oops! The verification link you clicked has expired. For security reasons, verification links are time-sensitive. Please request a new verification email.",
      bg: "bg-destructive",
      button: "resend",
    },
    alreadyVerified: {
      icon: <MailCheck className="w-6 h-6 text-primary-foreground" />,
      title: "Email Already Verified",
      description:
        "Good news! Your email address has already been verified. There's no need to do anything further, you can now continue using all features of your account. Thank you for confirming your email.",
      bg: "bg-success",
      button: isAuthenticated ? "none" : "signin",
    },
    pleaseVerify: {
      icon: <MailQuestion className="w-6 h-6 text-primary-foreground" />,
      title: "Please verify your email",
      description: (
        <>
          We sent you an email to verify your email. Please check your mailbox
          and click on the <b key="verify-mail">Verify mail</b> button.
        </>
      ),
      bg: "bg-warning",
      button: "resend",
    },
    verificationRequired: {
      icon: <MailQuestion className="w-6 h-6 text-primary-foreground" />,
      title: "Email Verification Required",
      description:
        "To fully activate your account and access all features, you'll need to verify your email address. Please check your inbox (or spam folder) for the verification email we sent and click the button to complete the process.",
      bg: "bg-warning",
      button: "resend",
    },
    verified: {
      icon: <MailCheck className="w-6 h-6 text-primary-foreground" />,
      title: "Email Successfully Verified",
      description:
        "Congratulations! Your email address has been successfully verified. You now have full access to all features of your account. Thank you for confirming your email address, and welcome to our community.",
      bg: "bg-success",
      button: isAuthenticated ? (isFirstTime ? "next" : "none") : "signin",
    },
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(toggle) => {
        setVerifyDialogState((prev) => ({ open: toggle, type: prev.type }));
        router.push("/themes", undefined, { shallow: true });
      }}
    >
      <DialogContent className="p-8 border max-w-[400px] border-border bg-white rounded-none">
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center ${messages[type].bg} justify-center border border-border w-10 h-10`}
          >
            {messages[type].icon}
          </div>
          <Typography element="h3" as="h3" className="mt-4">
            {messages[type].title}
          </Typography>
          <Typography element="p" as="p" className="text-center text-xs mt-2">
            {messages[type].description}
          </Typography>
          {messages[type].button === "resend" ? (
            <Button
              className="w-full mt-6"
              disabled={loading}
              onClick={() => {
                if (isAuthenticated) {
                  sendMail();
                } else {
                  setLoading(true);
                  addToast({
                    title: "Please sign in first to resend verification email",
                    type: "warning",
                  });
                  setLoading(false);
                  setVerifyDialogState((prev) => ({
                    open: false,
                    type: prev.type,
                  }));
                  setLoginOpen(true);
                }
              }}
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Sending..." : "Resend Verification Email"}
            </Button>
          ) : messages[type].button === "next" ? (
            <Button
              className="w-full mt-6"
              onClick={() => {
                setVerifyDialogState((prev) => ({
                  open: false,
                  type: prev.type,
                }));
                setUserProfileOpen(true);
              }}
            >
              Continue
            </Button>
          ) : messages[type].button === "signin" ? (
            <Button
              className="w-full mt-6"
              onClick={() => {
                setVerifyDialogState((prev) => ({
                  open: false,
                  type: prev.type,
                }));
                setLoginOpen(true);
              }}
            >
              Sign in
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
