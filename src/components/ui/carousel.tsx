import { cn, getLuminance } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, Children, cloneElement } from "react";

interface CarouselProps {
  children: React.ReactNode;
  autoSlide?: boolean;
  interval?: number;
  bgColor?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoSlide = true,
  interval = 6000,
  bgColor,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const childrenArray = Children.toArray(children);

  const nextItem = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % childrenArray.length);
  };

  const prevItem = () => {
    setDirection("left");
    setCurrentIndex(
      (currentIndex - 1 + childrenArray.length) % childrenArray.length
    );
  };

  useEffect(() => {
    if (autoSlide) {
      const timer = setInterval(nextItem, interval);
      return () => clearInterval(timer);
    }
  }, [currentIndex, autoSlide, interval]);

  const { shade } = getLuminance(bgColor || "#FFFFFF");

  return (
    <div
      className="flex relative items-center justify-center overflow-hidden shadow-md"
      style={{ backgroundColor: bgColor || "transparent" }}
    >
      <div
        onClick={prevItem}
        data-testid="prev-button"
        className="px-3 flex items-center h-full absolute left-0 cursor-pointer z-10"
        style={{
          backgroundColor: shade,
        }}
      >
        <ChevronLeft className="h-5 w-5" />
      </div>

      <div className="flex flex-1">
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className={`w-full fade-in-40 animate-in ${
              direction === "left"
                ? "slide-in-from-left-20"
                : "slide-in-from-right-20"
            } ${index === currentIndex ? "block" : "hidden"}`}
          >
            {cloneElement(child as React.ReactElement)}
          </div>
        ))}
      </div>

      <div
        onClick={nextItem}
        data-testid="next-button"
        className="flex px-3 h-full items-center absolute right-0 cursor-pointer z-10"
        style={{
          backgroundColor: shade,
        }}
      >
        <ChevronRight className="h-5 w-5" />
      </div>
    </div>
  );
};

export default Carousel;
