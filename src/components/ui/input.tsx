import { cn } from "@/lib/utils";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    postElement?: React.ReactNode;
    isError?: boolean;
    label?: string;
    errorText?: string;
  }
>(
  (
    { className, type, postElement, isError, label, errorText, ...props },
    ref
  ) => {
    return (
      <div className={cn("relative flex flex-col", className)}>
        {label ? (
          <Label htmlFor={props.id} className="pb-2">
            {label}
            {isError && (
              <span className="ml-1 text-destructive">
                {errorText ? errorText : `(required)`}
              </span>
            )}
          </Label>
        ) : null}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md shadow-inset border-[0.5px] border-border bg-white px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:border-secondary focus:border-5 disabled:cursor-not-allowed disabled:opacity-50",
            isError && "border-destructive ring-1 ring-destructive",
            postElement && "pr-9"
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
  }
);
Input.displayName = "Input";

const SeachBar = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    usecase?: "theme" | "font";
    onSearch: (string: string) => void;
    onRemoveCallback: () => void;
  }
>(
  (
    {
      className,
      type,
      onSearch,
      onRemoveCallback,
      usecase = "theme",
      ...props
    },
    ref
  ) => {
    const [searchString, setSearchString] = React.useState("");

    return (
      <div className="flex w-full relative max-w-[600px]">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md shadow-inset border-[0.5px] border-border bg-white px-3 py-2 pr-[70px] text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
            if (e.target.value.length === 0) {
              onRemoveCallback();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(searchString);
            }
          }}
          {...props}
        />
        {searchString ? (
          <>
            {usecase === "theme" && (
              <div className="absolute justify-center items-center flex h-9 w-9 right-20 opacity-70">
                <kbd className="text-primary-foreground text-xs px-1 py-0.5 leading-none border-[0.5px] border-border bg-[#eee]">
                  Enter
                </kbd>
              </div>
            )}

            <div className="absolute right-9 justify-center items-center flex h-9 w-9">
              <Cross1Icon
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearchString("");
                  onRemoveCallback();
                }}
              />
            </div>
          </>
        ) : null}
        <div
          className="absolute right-0 cursor-pointer justify-center items-center flex h-9 w-9 border-[0.5px] border-border bg-primary hover:shadow-normal hover:-translate-x-px hover:-translate-y-px"
          onClick={() => onSearch(searchString)}
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
        </div>
      </div>
    );
  }
);

SeachBar.displayName = "SeachBar";

export { Input, SeachBar };
