import { RestrictedPage } from "@/components/restricted-page";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useRouter } from "next/router";

const FourOhFour = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title property="og:title">404 - ThemeAI</title>
        <meta
          name="description"
          property="og:description"
          content="Page not found"
        />
      </Head>
      <RestrictedPage
        title={"Page not found"}
        errorCode={404}
        customButton={
          <Button onClick={() => router.push("/")} size={"md"}>
            Go to home
          </Button>
        }
      />
    </>
  );
};

export default FourOhFour;
