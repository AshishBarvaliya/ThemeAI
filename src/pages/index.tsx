import { FeatureCard, FeatureCardProps } from "@/components/feature-card";
import { Footer } from "@/components/footer";
import GlowingBoxes from "@/components/growing-dots";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import useAnalytics from "@/hooks/useAnalytics";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const eventTracker = useAnalytics("Home");

  const features: FeatureCardProps[] = [
    {
      title: "The Community Theme Gallery",
      description:
        "Explore, Discover, and Implement: Dive into the Community Theme Gallery to Browse, Search, and Utilize AI-Generated Themes. Connect and Follow Talented Creators",
      img: "/og/themes.png",
      orientation: "right",
    },
    {
      title: "From Words to Waves",
      description:
        "Generating Purposeful Themes Effortlessly: Prompt Your Web Ideas and Create Color Schemes Seamlessly in Just a Few Steps - All for Free",
      img: "/og/generate.png",
      orientation: "left",
    },
    {
      title: "Theme Details Unveiled",
      description:
        "Dive into the Nuances: Explore AI-Generated Color Themes, Understand Their Inspirations, and Test with Templates - Export and Celebrate Your Unique Designs",
      img: "/og/theme-view.png",
      orientation: "right",
    },
    {
      title: "Your Profile, Your Playground.",
      description:
        "Craft, Curate, and Connect: Manage Your Profile, Tailor Your Saved Themes, Follow Users, and Keep Track of Your Creative Journey",
      img: "/og/profile.png",
      orientation: "left",
    },
    {
      title: "Design from Scratch",
      description:
        "Crafting Your Vision: Utilize Our Color and Font Pickers to Design Your Theme Manually, and Visualize with Our Range of Demo Templates",
      img: "/og/create.png",
      orientation: "right",
    },
  ];

  return (
    <>
      <Head>
        <title property="og:title">
          ThemeAI - Select AI-Enhanced Meaningful Themes for Your Web Design
        </title>
        <meta
          name="description"
          property="og:description"
          content="Welcome to ThemeAI — where creativity meets artificial intelligence. Choose GPT4-powered, meaningful themes effortlessly, all for free. Explore our extensive theme library, curate your collection, and manage your profile with ease. Transform your website into a purposeful masterpiece. Join us in redefining web design. Elevate your digital presence today!"
        />
        <meta property="og:image" content="/og/home.png" />
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
        <div className="flex relative flex-1 lg:min-h-screen">
          <div className="flex backdrop-blur-3xl py-10 px-4 md:px-10 lg:px-0 w-full z-10 items-center flex-col lg:flex-row pt-[100px] gap-8 lg:gap-0">
            <div className="lg:w-[55%] lg:pr-10 pt-10 md:pt-20 lg:pt-0">
              <div className="flex flex-col gap-2 md:gap-7 lg:ml-7 justify-center lg:justify-start -mt-14 lg:-mt-28">
                <div className="flex flex-col">
                  <div className="flex justify-center lg:justify-start items-center">
                    <a
                      href="https://www.producthunt.com/posts/theme-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-theme&#0045;ai"
                      target="_blank"
                      onClickCapture={() => eventTracker("ProductHunt")}
                    >
                      <img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=431314&theme=light"
                        alt="Theme&#0032;AI - Select&#0032;AI&#0045;Enhanced&#0032;Meaningful&#0032;Themes&#0032;for&#0032;Your&#0032;Web&#0032;Design | Product Hunt"
                        style={{ width: "180px", height: "40px" }}
                        width="180"
                        height="40"
                      />
                    </a>
                  </div>
                </div>
                <h1
                  className="font-[Recoleta] text-[50px] xl:text-[60px] leading-[56px] xl:leading-[68px] text-center lg:text-left"
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
                  className="text-center lg:text-left text-sm"
                  aria-label="Welcome to ThemeAI — where creativity meets artificial intelligence. Choose GPT4-powered, meaningful themes effortlessly, all for free. Explore our extensive theme library, curate your collection, and manage your profile with ease. Transform your website into a purposeful masterpiece. Join us in redefining web design. Elevate your digital presence today!"
                >
                  Welcome to ThemeAI — where creativity meets artificial
                  intelligence. Choose{" "}
                  <span className="underline font-semibold" aria-hidden="true">
                    GPT4-powered
                  </span>
                  , meaningful themes effortlessly, all for{" "}
                  <span className="underline font-semibold" aria-hidden="true">
                    free
                  </span>
                  . Explore our extensive{" "}
                  <span className="underline font-semibold" aria-hidden="true">
                    theme library
                  </span>{" "}
                  , curate your collection, and manage your profile with ease.
                  Transform your website into a purposeful masterpiece. Join us
                  in redefining web design. Elevate your digital presence today!
                </p>
                <div className="flex justify-center lg:justify-start mt-6 md:mt-0">
                  <Button
                    onClick={() => {
                      eventTracker("Explore themes");
                      router.push("/themes");
                    }}
                    className="w-fit"
                    aria-label="Explore themes"
                    size={"lg"}
                  >
                    Explore themes
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 pb-4 md:pb-10 lg:pb-0">
              <div className="flex flex-col flex-1 mr-0 lg:mr-6 xl:mr-10 bg-[#383838] shadow-xl rounded-[8px] relative mt-2 md:mt-6 lg:mt-0">
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
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
            <GlowingBoxes />
          </div>
        </div>
        <div className="flex flex-col bg-white py-20 pb-28 justify-center items-center">
          <Typography
            element="h2"
            as="h2"
            className="underline decoration-secondary decoration-4 underline-offset-4 text-4xl"
          >
            Features
          </Typography>
          <div className="flex flex-col items-center justify-center gap-32 mt-20">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                img={feature.img}
                orientation={feature.orientation}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
