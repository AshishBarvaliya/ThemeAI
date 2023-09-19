import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ConfirmationDialogProps {
  onYes: (e: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  yesBtnText?: string;
  noBtnText?: string;
  children?: ReactNode;
  loading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  setOpen,
  onYes,
  yesBtnText = "Yes",
  noBtnText = "No",
  children,
  loading = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-10 max-w-fit border border-border bg-white rounded-none">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        {children}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={() => setOpen(false)}
            variant={"outline"}
            disabled={loading}
          >
            {noBtnText}
          </Button>
          <Button onClick={onYes} disabled={loading}>
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {yesBtnText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
