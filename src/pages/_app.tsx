import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Image from "next/image";
import ReactGA from "react-ga4";

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;

ReactGA.initialize(TRACKING_ID || "");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-center">
      <header
        className={cn(
          "fixed max-w-screen-2xl flex w-full justify-between py-1 md:py-2 px-3 md:px-6 h-[54px] md:h-[60px] z-40 backdrop-blur-sm"
        )}
      >
        <div className="flex items-center flex-1 pr-6">
          <div className="w-[90px] md:w-[176px]">
            <Link href={"/"} className="flex">
              <Image src={"/logo.svg"} alt="logo" width={150} height={20} />
            </Link>
          </div>
        </div>
      </header>
      <main
        className={cn(
          "flex w-full flex-col md:flex-row h-screen max-w-screen-2xl"
        )}
      >
        <Component {...pageProps} />
      </main>
    </div>
  );
}
