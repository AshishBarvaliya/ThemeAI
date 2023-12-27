import { getThemeById } from "@/services/theme";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ThemeView } from "@/components/theme-view";
import { RestrictedPage } from "@/components/restricted-page";
import Head from "next/head";

export default function Theme() {
  const router = useRouter();

  const {
    data: theme,
    isError,
    error,
  } = useQuery(
    ["theme", router.query.id],
    () => getThemeById(router.query.id as string),
    {
      enabled: !!router.query.id,
    }
  );

  return theme ? (
    <>
      <Head>
        <title property="og:title">{theme.name} - ThemeAI</title>
        <meta
          name="description"
          property="og:description"
          content="Create your theme with ThemeAI"
        />
        <meta property="og:image" content="/og/hero.png" />
      </Head>
      <ThemeView theme={theme} />
    </>
  ) : isError && error ? (
    <RestrictedPage
      title={
        // @ts-ignore
        error?.response?.status === 403
          ? "You are not authorized to view this theme"
          : `There is no theme not found with id '${router.query.id}'`
      }
      // @ts-ignore
      errorCode={error?.response?.status || 404}
    />
  ) : (
    <div className="flex justify-center items-center flex-1 h-full">
      Loading...
    </div>
  );
}
