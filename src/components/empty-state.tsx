import { cn } from "@/lib/utils";
import Typography from "./ui/typography";
import { Button } from "./ui/button";

interface EmptyStateProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  buttonText?: string;
  onClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  iconBg,
  title,
  buttonText,
  onClick,
}) => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 h-full gap-2">
      <div
        className={cn(
          `flex items-center bg-destructive justify-center border border-border w-10 h-10`,
          iconBg
        )}
      >
        {icon}
      </div>
      <Typography element="p" as="p" className="text-md mt-2">
        {title}
      </Typography>
      {onClick && buttonText ? (
        <Button onClick={onClick} className="mt-4" size={"md"}>
          {buttonText}
        </Button>
      ) : null}
    </div>
  );
};
