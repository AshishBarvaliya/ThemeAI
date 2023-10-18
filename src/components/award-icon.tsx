import { USER_LEVELS } from "@/constants/user";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AwardIconProps {
  level: number;
  className?: string;
  info: string;
  zeroRing?: boolean;
  tooltipClassName?: string;
  ringClassName?: string;
}

export const AwardIcon: React.FC<AwardIconProps> = ({
  level,
  className,
  info,
  zeroRing = false,
  tooltipClassName = "",
  ringClassName = "",
}) => {
  return level <= 5 && level >= 1 ? (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <img
            src={USER_LEVELS[level].svg}
            alt={USER_LEVELS[level].id}
            className={cn("h-7 w-7 drop-shadow", className)}
          />
        </TooltipTrigger>
        <TooltipContent className={tooltipClassName}>{info}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : level === 0 && zeroRing ? (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "w-[18px] h-[18px] drop-shadow border-2 border-border rounded-full",
              ringClassName
            )}
          />
        </TooltipTrigger>
        <TooltipContent>{info}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;
};
