import Link from "next/link";
import Image from "next/image";
import Typography from "./ui/typography";
import { cn } from "@/lib/utils";
import { ContactUsDialog } from "./contact-us";
import { useState } from "react";

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex p-5 py-3 flex-col gap-3 border-t-[0.5px] border-border/40",
        className
      )}
    >
      <div className="flex flex-1 flex-col lg:flex-row gap-4 lg:gap-2 justify-between items-center">
        <div className="flex items-center w-[100px] md:w-[170px]">
          <Image src="/logo.svg" alt="logo" width={200} height={40} />
        </div>
        <Typography
          element="p"
          as="p"
          className="text-[10px] md:text-sm text-secondary-foreground/80"
        >
          Copyright © 2024 ThemeAI. All rights reserved.
        </Typography>
        <div className="flex items-center gap-6">
          <div
            className="text-xs md:text-sm cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Contact Us
          </div>
          <Link href="/privacy" className="text-xs md:text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs md:text-sm hover:underline">
            Terms of Use
          </Link>
        </div>
      </div>
      <ContactUsDialog open={open} setOpen={setOpen} />
    </div>
  );
};
