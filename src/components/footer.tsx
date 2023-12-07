import Link from "next/link";
import Image from "next/image";
import Typography from "./ui/typography";
import { cn } from "@/lib/utils";
import { ContactUsDialog } from "./contact-us";
import { useState } from "react";

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex p-5 flex-col", className)}>
      <div className="flex flex-1 gap-2 justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={200} height={40} />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm cursor-pointer" onClick={() => setOpen(true)}>
            Contact Us
          </div>
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms of Use
          </Link>
        </div>
      </div>
      <Typography element="p" as="p" className="text-sm">
        Copyright © 2024 ThemeGPT. All rights reserved.
      </Typography>
      <ContactUsDialog open={open} setOpen={setOpen} />
    </div>
  );
};
