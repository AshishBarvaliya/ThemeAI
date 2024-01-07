import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { deactivationRequest } from "@/services/user";
import { Textarea } from "./ui/textarea";
import Typography from "./ui/typography";
import { UserX } from "lucide-react";

interface DeleteAccountDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
  open,
  setOpen,
}) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [successfulDialog, setSuccessfulDialog] = useState(false);
  const [data, setData] = useState({
    reason: "",
  });

  const deleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    deactivationRequest(data.reason)
      .then(() => {
        setSuccessfulDialog(true);
        setOpen(false);
      })
      .catch((error) => {
        addToast({
          title: error.response.data.error,
          type: "error",
          errorCode: error.response.status,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(val) => {
          if (!loading) {
            setOpen(val);
          }
        }}
      >
        <DialogContent className="p-8 border border-border bg-white rounded-none">
          <DialogHeader>
            <DialogTitle className="mb-1">Delete Account Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for deleting your account.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={deleteAccount}>
              <Textarea
                id="reason"
                name="reason"
                label="Reason"
                value={data.reason}
                placeholder="Reason"
                className="mt-4"
                onChange={(e) => {
                  setData({ reason: e.target.value });
                }}
              />
              <div className="mt-8">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={successfulDialog} onOpenChange={setSuccessfulDialog}>
        <DialogContent className="p-8 border border-border bg-white rounded-none">
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center bg-destructive justify-center border border-border w-10 h-10`}
            >
              <UserX className="h-5 w-5 text-primary-foreground" />
            </div>
            <Typography element="h3" as="h3" className="mt-4 text-center">
              Delete Account Request Sent
            </Typography>
            <Typography element="p" as="p" className="text-center text-xs mt-2">
              Your request to delete your account has been sent. Your account
              will be deleted within 24 hours.
            </Typography>
            <Button
              className="w-full mt-6"
              onClick={() => setSuccessfulDialog(false)}
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
