import { cn } from "@/lib/utils";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & { postElement?: React.ReactNode; isError?: boolean }
>(({ className, type, postElement, isError, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-border bg-white px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:border-secondary focus:border-5 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          isError && "border-destructive ring-2 ring-destructive"
        )}
        ref={ref}
        {...props}
      />
      {postElement}
    </div>
  );
});
Input.displayName = "Input";

const SeachBar = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    onSearch: (string: string) => void;
    onRemoveCallback: () => void;
  }
>(({ className, type, onSearch, onRemoveCallback, ...props }, ref) => {
  const [searchString, setSearchString] = React.useState("");

  return (
    <div className="flex w-full relative">
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-border bg-white px-3 py-2 pr-24 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        {...props}
      />
      {searchString ? (
        <div className="absolute right-12 justify-center items-center flex h-12 w-12">
          <Cross1Icon
            className="h-4 w-4 cursor-pointer"
            onClick={() => {
              setSearchString("");
              onRemoveCallback();
            }}
          />
        </div>
      ) : null}
      <div className="absolute right-0 justify-center items-center flex h-12 w-12 border border-border bg-primary hover:shadow-normal hover:-translate-x-px hover:-translate-y-px">
        <MagnifyingGlassIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => onSearch(searchString)}
        />
      </div>
    </div>
  );
});

SeachBar.displayName = "SeachBar";

export { Input, SeachBar };
