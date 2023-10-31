import Link from "next/link";
import Typography from "./ui/typography";
import { cn } from "@/lib/utils";

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex p-5 flex-col", className)}>
      <div className="flex flex-1 gap-2 justify-between">
        <div className="flex items-center gap-3">
          <h1
            className="text-4xl text-black font-bold"
            style={{
              fontFamily: "Monoton",
              textShadow:
                "1px 1px 0px #eb452b, 2px 2px 0px #46b59b, 3px 3px 0px #052939, 4px 4px 0px #c11a2b",
            }}
          >
            T
          </h1>
          <Typography element="h4" as="h4">
            ThemeGPT
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm cursor-pointer">Contact Us</div>
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms of Use
          </Link>
        </div>
      </div>
      <Typography element="p" as="p" className="text-sm">
        Copyright © 2022 ThemeGPT. All rights reserved.
      </Typography>
    </div>
  );
};
