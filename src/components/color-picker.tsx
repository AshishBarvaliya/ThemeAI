import { ChromePicker } from "react-color";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface RegisterDialogProps {
  id: string;
  color: string;
  setColor: (color: string) => void;
  name: string;
  open: string | null;
  setOpen: React.Dispatch<React.SetStateAction<string | null>>;
}

const ColorPicker: React.FC<RegisterDialogProps> = ({
  id,
  name,
  color,
  setColor,
  open,
  setOpen,
}) => {
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <div
              className="w-12 h-12 relative border-[0.5px] border-border z-10 rounded-md cursor-pointer hover:shadow-xl"
              style={{
                backgroundColor: color,
              }}
              onClick={() => setOpen(open === id ? null : id)}
            ></div>
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {open === id ? (
        <>
          <div
            className="fixed top-0 left-0 bottom-0 right-0 z-10"
            onClick={() => setOpen(null)}
          />
          <div
            data-state={open === id ? "open" : "closed"}
            className="absolute mt-1.5 ml-[-80px] z-20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2"
          >
            <ChromePicker
              color={color}
              onChange={(color) => setColor(color.hex)}
              className="border-[0.5px] border-border"
              disableAlpha
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ColorPicker;
