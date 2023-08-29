import CanvasAnimation from "@/components/canvas-animation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-1">
      <div className="w-[60%] border-r border-primary-foreground">
        <div className="relative h-[175px] overflow-hidden border-b border-primary-foreground">
          <CanvasAnimation />
          <h1
            className="absolute top-5 left-5 text-[135px] text-center leading-[135px] font-bold text-primary-foreground"
            style={{ fontFamily: "Monoton" }}
          >
            ThemeGPT
          </h1>
        </div>
        <h1 className="text-primary-foreground leading-[60px] text-6xl font-bold pt-[200px] px-7">
          Let the <span className="text-[#5DC999]">GPT4</span> select the
          optimal
          <span className="text-[#5DC999]"> Theme</span> for your design.
        </h1>
        <div className="flex gap-7 mt-16 ml-7">
          <Button onClick={() => router.push("dashboard")}>Explore</Button>
          <Button onClick={() => router.push("create-theme")} variant="outline">
            Generate Theme
          </Button>
        </div>
      </div>
      <div className="w-[40%] flex justify-center pt-20">
        <div>
          <Image
            className="rounded-[20px] shadow-md border border-primary-foreground"
            src="/hero.png"
            alt="hero image"
            width={380}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}
