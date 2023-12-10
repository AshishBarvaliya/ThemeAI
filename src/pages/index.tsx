import CanvasAnimation from "@/components/canvas-animation";
import { Footer } from "@/components/footer";
import GlowingBoxes from "@/components/growing-dots";
import { Button } from "@/components/ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex relative flex-1 min-h-[760px]">
        <div className="flex backdrop-blur-3xl py-10 z-10 pt-[100px]">
          <div className="w-[60%]">
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
                className="rounded-[20px] shadow-lg border-[0.5px] border-border"
                src="/hero.png"
                alt="hero image"
                width={320}
                height={400}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
          <GlowingBoxes />
        </div>
      </div>
      <div className="relative h-[170px] border-b-[0.5px] border-t-[0.5px] border-border">
        <CanvasAnimation />
        <div className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center flex">
          <h1
            className="text-[130px] text-center leading-[130px] font-bold text-primary-foreground"
            style={{ fontFamily: "Nosifer" }}
          >
            ThemeGPT
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
