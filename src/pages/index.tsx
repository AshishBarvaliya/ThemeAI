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
      <div className="flex relative flex-1 md:min-h-screen">
        <div className="flex backdrop-blur-3xl py-10 z-10 items-center flex-col md:flex-row pt-[100px] gap-8 md:gap-0">
          <div className="md:w-[60%]">
            <h1
              className="text-primary-foreground lg:leading-[70px] text-4xl md:text-5xl lg:text-6xl font-bold px-7"
              style={{
                textShadow:
                  "2px 8px 6px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
              }}
            >
              Let the <span className="text-secondary">GPT4</span> select the
              optimal
              <span className="text-secondary"> Theme</span> for your design.
            </h1>
            <div className="flex gap-2 md:gap-7 mt-14 md:ml-7 justify-center md:justify-start">
              <Button size={"lg"} onClick={() => router.push("themes")}>
                Explore
              </Button>
              <Button
                size={"lg"}
                onClick={() => router.push("create-theme")}
                variant="outline"
              >
                <LightningBoltIcon
                  className="mr-2 h-5 w-5 text-secondary"
                  onClick={() => router.push("create-theme")}
                />
                Generate Theme
              </Button>
            </div>
          </div>
          <div className="md:w-[40%] flex justify-center items-center">
            <div>
              <img
                className="rounded-[20px] shadow-lg border-[0.5px] border-border w-[200px] md:w-[200px] lg:w-[280px] xl:w-[320px]"
                src="/hero.png"
                alt="hero image"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
          <GlowingBoxes />
        </div>
      </div>
      <Footer />
    </div>
  );
}
