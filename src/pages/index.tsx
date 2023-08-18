import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gradient-to-tl from-orange-100 to-orange-50 h-screen overflow-hidden">
      <div className="w-[400px] h-[400px] absolute -left-20 -bottom-20 bg-gradient-to-tr from-yellow-200 to-orange-300 rounded-full" />
      <div className="backdrop-blur-2xl bg-white/40 h-full">
        <div className="flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-screen-2xl w-full gap-10">
          <div className="basis-2/5">
            <p className="mb-4 text-[#23344a]">- Creative Design Template</p>
            <h1 className="text-5xl font-bold leading-[1.3] text-[#23344a]">
              Let the AI select the{" "}
              <span className="relative after:absolute after:h-3 after:left-0 after:w-full after:bg-[#ffd069] after:bottom-0 after:-z-10">
                optimal theme
              </span>{" "}
              for your design.
            </h1>
            <p className="text-gray-700 mt-5">
              Meet and communicate with the best people to run projects, events
              or other activities in a more effective and fun way.
            </p>
            <Button className="bg-[#ffd069] text-[#23344a] mt-10">
              Launch
            </Button>
          </div>
          <div className="basis-3/5">
            <div className="h-[460px] w-[700px] mt-5 bg-[#ffd069] rounded-md mx-auto " />
            <Image
              className="absolute top-0 left-1/2 rounded-md shadow-md "
              src="/banner.png"
              alt="banner image"
              width={700}
              height={600}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
