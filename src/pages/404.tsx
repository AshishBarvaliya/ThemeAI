import { RestrictedPage } from "@/components/restricted-page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const FourOhFour = () => {
  const router = useRouter();
  return (
    <RestrictedPage
      title={"Page not found"}
      errorCode={404}
      customButton={
        <Button onClick={() => router.push("/")} size={"md"}>
          Go to home
        </Button>
      }
    />
  );
};

export default FourOhFour;
