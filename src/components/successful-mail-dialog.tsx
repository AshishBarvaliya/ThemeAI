import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import Typography from "./ui/typography";
import { MailCheck } from "lucide-react";

export interface SuccessfulMailDialogProps {
  data: {
    open: boolean;
    type: "verify" | "reset";
  };
  setData: React.Dispatch<
    React.SetStateAction<SuccessfulMailDialogProps["data"]>
  >;
}

export const SuccessfulMailDialog: React.FC<SuccessfulMailDialogProps> = ({
  data,
  setData,
}) => {
  return (
    <Dialog
      open={data.open}
      onOpenChange={() => setData({ ...data, open: false })}
    >
      <DialogContent className="p-6 md:p-8 border max-w-[400px] border-border bg-white rounded-none">
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center bg-success justify-center border border-border w-10 h-10`}
          >
            <MailCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <Typography element="h3" as="h3" className="mt-4 text-center">
            {data.type === "verify"
              ? "Verification mail sent"
              : "Reset Password mail sent"}
          </Typography>
          <Typography element="p" as="p" className="text-center text-xs mt-2">
            Check your mail box for a link to{" "}
            {data.type === "verify" ? "verify" : "reset your password"}. The
            link will expire in 60 minutes.
          </Typography>
          <Button
            className="w-full mt-6"
            onClick={() => {
              setData({ ...data, open: false });
            }}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
