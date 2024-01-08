import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const urls: any = await axios
    .get(
      `${process.env.NEXTAUTH_URL}/api/themes?page=1&search=&type=explore&aiOnly=false`
    )
    .then((res) => res.data);

  const fields = urls
    ? urls.map((theme: any) => ({
        loc: `https://www.themeai.io/theme/${theme.id}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      }))
    : [];

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {}
