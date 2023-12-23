import GlowingBoxes from "@/components/growing-dots";
import moment from "moment";
import dynamic from "next/dynamic";
import Head from "next/head";

// @ts-ignore
const Countdown = dynamic(() => import("react-countdown"), {
  ssr: false,
});

export default function Home() {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    const data = [
      { val: days, label: "Days" },
      { val: hours, label: "Hours" },
      { val: minutes, label: "Minutes" },
      { val: seconds, label: "Seconds" },
    ];
    if (completed) {
      return <div className="flex">Complete</div>;
    } else {
      return (
        <div aria-live="assertive" className="flex gap-3 pt-4">
          {data.map((item, index) => (
            <div
              className="flex flex-col justify-center items-center p-2 border border-border/20 bg-white/60 w-[80px]"
              key={index}
            >
              <p className="font-bold text-center text-xl">{item.val}</p>
              <p className="text-xs font-medium text-center uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>ThemeAI - Coming Soon</title>
        <meta
          name="description"
          content="Select AI-Enhanced Meaningful Themes for Your Web Design"
        />
        <script type="application/ld+json">
          {`
            {
              "@context": ${process.env.NEXTAUTH_URL},
              "@type": "VideoObject",
              "name": "ThemeAI Product Demo",
              "description": "A demonstration of ThemeAI's product features.",
              "uploadDate": "2023-12-22T00:00:00Z",
              "duration": "PT0H0M20S",
              "embedUrl": ${process.env.NEXTAUTH_URL}/videos/product-demo.mp4,
            }
          `}
        </script>
      </Head>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex relative flex-1 md:min-h-screen overflow-x-hidden">
          <div className="flex backdrop-blur-3xl py-10 w-full z-10 items-center flex-col md:flex-row pt-[100px] gap-8 md:gap-0">
            <div className="md:w-[55%] md:pr-10">
              <div className="flex flex-col gap-2 md:gap-7 md:ml-7 justify-center md:justify-start -mt-10">
                <h1
                  className="font-[Recoleta] text-[60px] leading-[68px] text-center md:text-left"
                  aria-label="Select AI-Enhanced Meaningful Themes for Your Web Design"
                >
                  Select AI-Enhanced{" "}
                  <span
                    className="text-secondary animated-gradient"
                    aria-hidden="true"
                  >
                    Meaningful
                  </span>{" "}
                  Themes for Your Web Design
                </h1>
                <p
                  className="text-center md:text-left text-sm"
                  aria-label="Welcome to ThemeAI — where creativity meets artificial intelligence. Choose GPT4-powered, meaningful themes effortlessly, all for free. Explore our extensive theme library, curate your collection, and manage your profile with ease. Transform your website into a purposeful masterpiece. Join us in redefining web design. Elevate your digital presence today!"
                >
                  Welcome to ThemeAI — where creativity meets artificial
                  intelligence. Choose{" "}
                  <span className="underline" aria-hidden="true">
                    GPT4-powered
                  </span>
                  , meaningful themes effortlessly, all for{" "}
                  <span className="underline" aria-hidden="true">
                    free
                  </span>
                  . Explore our extensive{" "}
                  <span className="underline" aria-hidden="true">
                    theme library
                  </span>{" "}
                  , curate your collection, and manage your profile with ease.
                  Transform your website into a purposeful masterpiece. Join us
                  in redefining web design. Elevate your digital presence today!
                </p>
                <div className="flex flex-col">
                  <div className="flex py-2">
                    <p className="text-3xl font-[500]">Coming soon!</p>
                  </div>
                  <Countdown date={+moment("2024-01-10")} renderer={renderer} />
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 mr-10 bg-[#383838] shadow-xl rounded-[8px] relative">
              <div className="flex flex-1 gap-1 my-0.5 px-1.5 mt-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FE5E57]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#FEBC32]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#02CD4B]" />
                <div className="absolute top-0.5 left-0 right-0 text-white text-[6px] text-center">
                  ThemeAI
                </div>
              </div>
              <video
                autoPlay
                muted
                loop
                aria-label="ThemeAI Product Demo"
                className="rounded-[8px] p-0.5 pt-0.5"
              >
                <source
                  src="/videos/product-demo.mp4"
                  type="video/mp4"
                  className="w-full h-full"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
            <GlowingBoxes />
          </div>
        </div>
      </div>
    </>
  );
}
