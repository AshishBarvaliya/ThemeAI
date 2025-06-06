import { Footer } from "@/components/footer";
import Typography from "@/components/ui/typography";
import { privacyPolicy } from "@/constants/website";
import Head from "next/head";

const Privacy = () => {
  return (
    <>
      <Head>
        <title property="og:title">Privacy Policy - ThemeAI</title>
        <meta
          name="description"
          property="og:description"
          content="Privacy Policy for ThemeAI"
        />
        <meta property="og:image" content="/og/hero.png" />
      </Head>
      <div className="flex flex-col">
        <div className="flex flex-col overflow-y-auto">
          {privacyPolicy.map((policy, index) => (
            <div key={index} className="mt-14 px-10">
              <Typography
                element={index === 0 ? "h2" : "h3"}
                as={index === 0 ? "h2" : "h3"}
                className="text-primary-foreground"
              >
                {policy.title}
              </Typography>
              <div className="flex gap-7 mt-4">{policy.description}</div>
            </div>
          ))}
          <Footer className="border-t-[0.5px] mt-10 border-border px-10" />
        </div>
      </div>
    </>
  );
};

export default Privacy;
