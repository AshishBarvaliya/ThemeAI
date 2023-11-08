import { getThemeById } from "@/services/theme";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ThemeView } from "@/components/theme-view";
import { RestrictedPage } from "@/components/restricted-page";

export default function Theme() {
  const router = useRouter();

  const { data: theme, isError } = useQuery(["theme", router.query.id], () =>
    getThemeById(router.query.id as string)
  );

  return theme ? (
    <ThemeView theme={theme} />
  ) : isError ? (
    <RestrictedPage
      title={`There is no theme not found with id '${router.query.id}'`}
      errorCode={404}
    />
  ) : (
    <div className="flex justify-center items-center flex-1 h-full">
      Loading...
    </div>
  );
}
