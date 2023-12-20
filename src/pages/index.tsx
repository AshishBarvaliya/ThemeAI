import DashboardTemplate from "@/assets/templates/dashboard/dashboard-mini";
import EditorTemplate from "@/assets/templates/editor/editor-mini";
import FoodieTemplate from "@/assets/templates/foodie/foodie-mini";
import LearningTemplate from "@/assets/templates/learning/learning-mini";
import MarketingTemplate from "@/assets/templates/marketing/marketing-mini";
import GlowingBoxes from "@/components/growing-dots";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/ui/carousel";
import { generateAllShades } from "@/lib/utils";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const colors = [
    {
      bg: "#2C3E50",
      primary: "#FFFFFF",
      accent: "#E74C3C",
      extra: "#3498DB",
    },
    {
      bg: "#FFFFFF",
      primary: "#000000",
      accent: "#E17CFD",
      extra: "#4CD7F6",
    },
    {
      bg: "#1C2833",
      primary: "#ABB2B9",
      accent: "#2ECC71",
      extra: "#5DADE2",
    },
    {
      bg: "#4B2E39",
      primary: "#EAE0D5",
      accent: "#D1A17A",
      extra: "#8A6951",
    },
    {
      bg: "#F7DC6F",
      primary: "#212F3D",
      accent: "#28B463",
      extra: "#E74C3C",
    },
    {
      bg: "#F4F6F7",
      primary: "#17202A",
      accent: "#A569BD",
      extra: "#5D6D7E",
    },
    {
      bg: "#F2ECE4",
      primary: "#5B2C6F",
      accent: "#D35400",
      extra: "#7D6608",
    },
    {
      bg: "#D4EFDF",
      primary: "#1E8449",
      accent: "#F4D03F",
      extra: "#3498DB",
    },
    {
      bg: "#17202A",
      primary: "#BFC9CA",
      accent: "#D35400",
      extra: "#7D3C98",
    },
    {
      bg: "#E8F8F5",
      primary: "#16A085",
      accent: "#F7DC6F",
      extra: "#AED6F1",
    },
    // Retro and Bold
    {
      bg: "#F39C12",
      primary: "#2C3E50",
      accent: "#E74C3C",
      extra: "#8E44AD",
    },
    // Oceanic and Calm
    {
      bg: "#AED6F1",
      primary: "#154360",
      accent: "#2ECC71",
      extra: "#F0B27A",
    },
    // Futuristic and Vibrant
    {
      bg: "#1B2631",
      primary: "#00FFFF",
      accent: "#F1C40F",
      extra: "#7D3C98",
    },
    // Earthy and Natural
    {
      bg: "#F9E79F",
      primary: "#6E2C00",
      accent: "#229954",
      extra: "#BA4A00",
    },
    // Elegant and Sophisticated
    {
      bg: "#F5EEF8",
      primary: "#641E16",
      accent: "#D2B4DE",
      extra: "#1ABC9C",
    },
    // Urban and Dynamic
    {
      bg: "#566573",
      primary: "#FDFEFE",
      accent: "#E74C3C",
      extra: "#F4D03F",
    },
  ];

  const fonts = {
    primary: {
      fontFamily: "Roboto",
      weights: ["300", "400", "500", "700"],
    },
    secondary: {
      fontFamily: "Inter",
      weights: ["300", "400", "500", "700"],
    },
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateColors = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    };

    const interval = setInterval(updateColors, 3000);

    return () => clearInterval(interval);
  }, [colors.length]);

  const props = {
    colors: colors[currentIndex],
    shades: generateAllShades(colors[currentIndex]),
    fonts,
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +moment("2023-12-31") - +moment();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex relative flex-1 md:min-h-screen overflow-x-hidden">
        <div className="flex backdrop-blur-3xl py-10 w-full z-10 items-center flex-col md:flex-row pt-[100px] gap-8 md:gap-0">
          <div className="md:w-[55%]">
            <div className="flex flex-col gap-2 md:gap-7 mt-14 md:ml-7 justify-center md:justify-start">
              awndkabw awdbajw danw awndkabw awdbajw danw awndkabw awdbajw danw
              awndkabw awdbajw danw
              {Object.keys(timeLeft).length === 0 ? (
                <span>Times up!</span>
              ) : (
                <div>
                  <span>{timeLeft.days} Days </span>
                  <span>{timeLeft.hours} Hours </span>
                  <span>{timeLeft.minutes} Minutes </span>
                  <span>{timeLeft.seconds} Seconds </span>
                </div>
              )}
              <Button size={"lg"} onClick={() => router.push("themes")}>
                Explore
              </Button>
            </div>
          </div>
          <div className="flex flex-col py-1 flex-1">
            <Carousel
              autoSlide={false}
              bgColor={colors[currentIndex].bg}
              hideArrows={true}
              interval={3000}
            >
              <MarketingTemplate id="marketing-landing" {...props} />
              <LearningTemplate id="learning-landing" {...props} />
              <DashboardTemplate id="dashboard-landing" {...props} />
              <FoodieTemplate id="foodie-landing" {...props} />
              <EditorTemplate id="editor-landing" {...props} />
            </Carousel>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
          <GlowingBoxes />
        </div>
      </div>
    </div>
  );
}
