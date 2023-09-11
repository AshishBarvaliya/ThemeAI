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
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="w-16 h-16 relative border border-border z-10 rounded-md cursor-pointer hover:shadow-xl"
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
          <div className="absolute mt-3 ml-[-80px] z-20">
            <ChromePicker
              color={color}
              onChange={(color) => setColor(color.hex)}
              className="border border-border"
              disableAlpha
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ColorPicker;
