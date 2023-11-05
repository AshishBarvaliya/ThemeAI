import { getThemeById } from "@/services/theme";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ThemeView } from "@/components/theme-view";

export default function Theme() {
  const router = useRouter();

  const { data: theme } = useQuery(["theme", router.query.id], () =>
    getThemeById(router.query.id as string)
  );

  return <ThemeView theme={theme} />;
}
