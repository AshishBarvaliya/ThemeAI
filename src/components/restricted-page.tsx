import { useRouter } from "next/router";
import { Button } from "./ui/button";
import Typography from "./ui/typography";
import { useHelpers } from "@/hooks/useHelpers";

interface RestrictedPageProps {
  title: string;
  loginRequired?: boolean;
  errorCode: 403 | 404;
  customButton?: React.ReactNode;
}

export const RestrictedPage: React.FC<RestrictedPageProps> = ({
  title,
  loginRequired = false,
  errorCode,
  customButton,
}) => {
  const router = useRouter();
  const { setLoginOpen } = useHelpers();

  return (
    <div className="flex flex-col justify-center items-center flex-1 h-full gap-2">
      <Typography element="h2" as="h2">
        {errorCode === 403 ? "403: Access Denied" : "404: Not Found"}
      </Typography>
      <Typography element="p" as="p" className="text-lg mt-2">
        {title}
      </Typography>
      <div className="flex gap-4 items-center justify-center mt-1">
        {customButton ? (
          customButton
        ) : loginRequired ? (
          <Button onClick={() => setLoginOpen(true)} size={"md"}>
            Sign in
          </Button>
        ) : (
          <Button onClick={() => router.push("/themes")} size={"md"}>
            Go to themes
          </Button>
        )}
      </div>
    </div>
  );
};
