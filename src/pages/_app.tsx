import Layout from "@/components/layout";
import TanstackProvider from "@/context/TanstackProvider";
import { HelpersProvider } from "@/hooks/useHelpers";
import { ToastProvider } from "@/hooks/useToast";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <TanstackProvider>
        <ToastProvider>
          <HelpersProvider>
            <Layout
              sidebar={
                router.pathname === "/themes/create" ||
                router.pathname === "/themes"
                  ? true
                  : false
              }
            >
              <Component {...pageProps} />
            </Layout>
          </HelpersProvider>
        </ToastProvider>
      </TanstackProvider>
    </SessionProvider>
  );
}
