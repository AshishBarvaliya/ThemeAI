import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface InfoIconProps {
  info: string | React.ReactNode;
  className?: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({ info, className }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className={cn("cursor-pointer, ml-2", className)}>
            <QuestionMarkCircledIcon className="w-4 h-4 text-border" />
          </div>
        </TooltipTrigger>
        <TooltipContent>{info}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
