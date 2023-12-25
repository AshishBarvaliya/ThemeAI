import { googleFontLink1, googleFontLink2 } from "@/constants/fonts";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${googleFontLink1}`}
        />
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${googleFontLink2}`}
        />
        <link
          rel="preload"
          href="/fonts/Recoleta-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="bg-background min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
