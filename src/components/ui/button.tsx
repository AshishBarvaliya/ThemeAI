import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-lg leading-[18px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-border rounded-[45px] hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
        destructive:
          "bg-destructive text-destructive-foreground border border-border rounded-[45px] hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
        outline:
          "border-input border border-border hover:shadow-normal hover:-translate-x-px hover:-translate-y-px rounded-[45px]",
        secondary:
          "bg-secondary text-secondary-foreground hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
        link: "text-primary underline-offset-4 hover:underline",
        circle:
          "rounded-full border border-border bg-primary hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
        square:
          "rounded-none border border-border bg-primary hover:shadow-normal hover:-translate-x-px hover:-translate-y-px",
      },
      size: {
        default: "px-[30px] py-5",
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        circle: "p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
