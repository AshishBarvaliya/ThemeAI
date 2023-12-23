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
      return <div className="flex gap-4">Complete</div>;
    } else {
      return (
        <div aria-live="assertive" className="flex gap-4">
          {data.map((item, index) => (
            <div
              className="flex flex-col justify-center items-center p-4 border border-border bg-white rounded-[10px]"
              key={index}
            >
              <p className="font-bold text-center text-4xl">{item.val}</p>
              <p className="text-base font-medium text-center">{item.label}</p>
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
                aria-label="ThemeAI Product Demo"
                className="border-none border-[#fff] rounded-[8px] shadow-xl"
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
