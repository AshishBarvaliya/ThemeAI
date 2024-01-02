import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import Typography from "./ui/typography";
import { BadgeAlert, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";

export interface PaymentStatusDialogProps {
  data: {
    open: boolean;
    type: "invalid" | "exists" | "success" | "server";
  };
  setData: React.Dispatch<
    React.SetStateAction<PaymentStatusDialogProps["data"]>
  >;
}

export const PaymentStatusDialog: React.FC<PaymentStatusDialogProps> = ({
  data,
  setData,
}) => {
  const router = useRouter();

  const messages = {
    invalid: {
      icon: <BadgeAlert className="w-6 h-6 text-primary-foreground" />,
      title: "Invalid Session",
      description:
        "We're sorry, but something went wrong. Please try again later. If the problem persists, please contact us at contact@themeai.io.",
      bg: "bg-destructive",
    },
    exists: {
      icon: <BadgeAlert className="w-6 h-6 text-primary-foreground" />,
      title: "Session Already Exists",
      description:
        "We're sorry, but something went wrong. Please try again later. If the problem persists, please contact us at contact@themeai.io.",
      bg: "bg-destructive",
    },
    server: {
      icon: <BadgeAlert className="w-6 h-6 text-primary-foreground" />,
      title: "Server Error",
      description:
        "We're sorry, but something went wrong. Please try again later. If the problem persists, please contact us at contact@themeai.io.",
      bg: "bg-destructive",
    },
    success: {
      icon: <CheckCircle className="w-6 h-6 text-primary-foreground" />,
      title: "Payment Successful",
      description:
        "Thank you for your payment. 30 credits have been added to your account.",
      bg: "bg-success",
    },
  };

  return (
    <Dialog
      open={data.open}
      onOpenChange={(toggle) => {
        setData((prev) => ({
          open: toggle,
          type: prev.type,
        }));
        router.push("/themes", undefined, { shallow: true });
      }}
    >
      <DialogContent className="p-6 md:p-8 border max-w-[400px] border-border bg-white rounded-none">
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center ${
              messages[data.type].bg
            } justify-center border border-border w-10 h-10`}
          >
            {messages[data.type].icon}
          </div>
          <Typography element="h3" as="h3" className="mt-4 text-center">
            {messages[data.type].title}
          </Typography>
          <Typography element="p" as="p" className="text-center text-xs mt-2">
            {messages[data.type].description}
          </Typography>
          <Button
            className="w-full mt-6"
            onClick={() => {
              setData((prev) => ({
                open: false,
                type: prev.type,
              }));
              router.push("/themes", undefined, { shallow: true });
            }}
          >
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
