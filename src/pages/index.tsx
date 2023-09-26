import CanvasAnimation from "@/components/canvas-animation";
import { Button } from "@/components/ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-1">
      <div className="w-[60%] border-r-[0.5px] border-border">
        <div className="relative h-[170px] overflow-hidden border-b-[0.5px] border-border">
          <CanvasAnimation />
          <h1
            className="absolute top-5 left-5 text-[130px] text-center leading-[130px] font-bold text-primary-foreground"
            style={{ fontFamily: "Monoton" }}
          >
            ThemeGPT
          </h1>
        </div>
        <h1
          className="text-primary-foreground leading-[70px] text-6xl font-bold pt-[120px] px-7"
          style={{
            textShadow:
              "2px 8px 6px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
          }}
        >
          Let the <span className="text-secondary">GPT4</span> select the
          optimal
          <span className="text-secondary"> Theme</span> for your design.
        </h1>
        <div className="flex gap-7 mt-14 ml-7">
          <Button size={"lg"} onClick={() => router.push("themes")}>
            Explore
          </Button>
          <Button
            size={"lg"}
            onClick={() => router.push("create-theme")}
            variant="outline"
          >
            <LightningBoltIcon className="mr-2 h-5 w-5 text-secondary" />
            Generate Theme
          </Button>
        </div>
      </div>
      <div className="w-[40%] flex justify-center items-center">
        <div>
          <Image
            className="rounded-[20px] shadow-md border-[0.5px] border-border"
            src="/hero.png"
            alt="hero image"
            width={320}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
