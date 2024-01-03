import { USER_LEVELS } from "@/constants/user";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
  ) : level === 0 && zeroRing ? (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <div
          data-testid="zero-ring"
          className={cn(
            "w-[18px] h-[18px] drop-shadow border-2 border-border rounded-full",
            ringClassName
          )}
        />
      </TooltipTrigger>
      <TooltipContent>{info}</TooltipContent>
    </Tooltip>
  ) : null;
};
