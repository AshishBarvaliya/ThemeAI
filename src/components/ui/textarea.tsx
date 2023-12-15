import { cn } from "@/lib/utils";
import * as React from "react";
import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & {
    errorMessage?: string;
    label?: string;
    postElement?: React.ReactNode;
  }
>(({ className, errorMessage, label, postElement, ...props }, ref) => {
  return (
    <div className={cn("relative flex flex-col", className)}>
      {label ? (
        <Label htmlFor={props.id} className="pb-2">
          {label}
          {errorMessage && (
            <span className="ml-1 text-destructive">{errorMessage}</span>
          )}
        </Label>
      ) : null}
      <textarea
        className={cn(
          "flex min-h-9 w-full shadow-inset border-[0.5px] border-border bg-white px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50",
          errorMessage && "border-destructive ring-1 ring-destructive",
          postElement && "pr-14"
        )}
        ref={ref}
        {...props}
      />
      {postElement ? (
        <div className="absolute right-0 top-[22px] flex items-center justify-center">
          {postElement}
        </div>
      ) : null}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
