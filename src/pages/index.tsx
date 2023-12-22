import GlowingBoxes from "@/components/growing-dots";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function Home() {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    const data = [
      { val: days, label: "Days" },
      { val: hours, label: "Hours" },
      { val: minutes, label: "Minutes" },
      { val: seconds, label: "Seconds" },
    ];
    if (completed) {
      // Render a complete state
      return null;
    } else {
      // Render a countdown
      return (
        <div className="flex gap-4">
          {data.map((item, index) => (
            <div
              className="flex flex-col justify-center items-center p-4 border border-border bg-white rounded-[10px]"
              key={index}
            >
              <Typography
                element="p"
                as="p"
                className="font-bold text-center text-4xl"
              >
                {item.val}
              </Typography>
              <Typography
                element="p"
                as="p"
                className="text-base font-medium text-center"
              >
                {item.label}
              </Typography>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex relative flex-1 md:min-h-screen overflow-x-hidden">
        <div className="flex backdrop-blur-3xl py-10 w-full z-10 items-center flex-col md:flex-row pt-[100px] gap-8 md:gap-0">
          <div className="md:w-[55%] md:pr-10">
            <div className="flex flex-col gap-2 md:gap-7 mt-14 md:ml-7 justify-center md:justify-start -mt-10">
              <Typography
                element="h1"
                as="h1"
                className="font-[Recoleta] !text-[60px] !leading-[68px] text-center md:text-left"
              >
                Select AI-Enhanced{" "}
                <span className="text-secondary animated-gradient">
                  Meaningful
                </span>{" "}
                Themes for Your Web Design
              </Typography>
              <Typography
                element="p"
                as="p"
                className="text-center md:text-left text-sm"
              >
                Welcome to ThemeAI — where creativity meets artificial
                intelligence. Choose{" "}
                <span className="underline">GPT4-powered</span>, meaningful
                themes effortlessly, all for{" "}
                <span className="underline">free</span>. Explore our extensive{" "}
                <span className="underline">theme library</span> , curate your
                collection, and manage your profile with ease. Transform your
                website into a purposeful masterpiece. Join us in redefining web
                design. Elevate your digital presence today!
              </Typography>
              <div>
                <Countdown date={+moment("2024-01-10")} renderer={renderer} />
              </div>
            </div>
          </div>
          <div className="flex flex-col py-1 flex-1 pr-10">
            <video
              autoPlay
              muted
              loop
              className="border-none border-[#fff] rounded-[8px] shadow-xl"
            >
              <source
                src="/videos/product-demo.mp4"
                type="video/mp4"
                className="w-full h-full"
              />
            </video>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
          <GlowingBoxes />
        </div>
      </div>
    </div>
  );
}
