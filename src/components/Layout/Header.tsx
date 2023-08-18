import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <div className="absolute flex z-10 max-w-screen-2xl mx-auto w-full top-0 justify-between left-1/2 -translate-x-1/2 py-4">
      <Image src="/logo.svg" alt="butterfly logo" width={150} height={100} />
      <ul className="flex items-center gap-8">
        <li>
          <Link className="text-[#23344a]" href="">
            Tools
          </Link>
        </li>
        <li>
          <Link className="text-[#23344a]" href="">
            Why does colors matter?
          </Link>
        </li>
        <li>
          <Link className="text-[#23344a]" href="">
            Why AI?
          </Link>
        </li>
        <Button className="bg-[#ffd069] text-[#23344a">Launch</Button>
      </ul>
    </div>
  );
};

export default Header;
