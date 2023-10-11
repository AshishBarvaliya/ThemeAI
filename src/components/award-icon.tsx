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
}

export const AwardIcon: React.FC<AwardIconProps> = ({
  level,
  className,
  info,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <img
            src={USER_LEVELS[level].svg}
            alt={USER_LEVELS[level].id}
            className={cn("h-7 w-7 drop-shadow", className)}
          />
        </TooltipTrigger>
        <TooltipContent>{info}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
