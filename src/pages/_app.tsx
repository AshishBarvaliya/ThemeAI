import Layout from "@/components/layout";
import { ToastProvider } from "@/hooks/useToast";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <ToastProvider>
        <Layout sidebar={router.pathname === "/themes/create" ? true : false}>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </SessionProvider>
  );
}
