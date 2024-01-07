import { cn } from "@/lib/utils";
import Typography from "./ui/typography";

export interface FeatureCardProps {
  title: string;
  description: string;
  img: string;
  orientation: "left" | "right";
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  img,
  orientation,
}) => (
  <div
    className={cn(
      "flex flex-1  gap-6 px-6 lg:gap-20 lg:px-20 xl:gap-28 xl:px-36",
      orientation === "left"
        ? "flex-col-reverse md:flex-row"
        : "flex-col-reverse md:flex-row-reverse"
    )}
  >
    <div className="flex w-full md:w-1/2 justify-center relative">
      <img
        src={img}
        alt={title}
        className="w-[480px] border-border border-[0.5px]"
        style={{
          WebkitBoxShadow: "0px 0px 226px 0px rgba(45,255,196,0.92)",
          MozBoxShadow: "0px 0px 226px 0px rgba(45,255,196,0.92)",
          boxShadow: "0px 0px 226px 0px rgba(45,255,196,0.92)",
        }}
      />
    </div>
    <div className="flex flex-col w-full md:w-1/2 justify-center gap-4">
      <Typography
        element="h3"
        as="h3"
        className="text-primary-foreground text-2xl md:text-3xl text-center md:text-left"
      >
        {title}
      </Typography>
      <Typography
        element="p"
        as="p"
        className="text-secondary-foreground text-sm xl:text-base text-center md:text-left"
      >
        {description}
      </Typography>
    </div>
  </div>
);
