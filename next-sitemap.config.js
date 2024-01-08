const axios = require("axios");
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.themeai.io",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  additionalPaths: async () => {
    const urls = await axios
      .get(
        `${process.env.NEXTAUTH_URL}/api/themes?page=1&search=&type=explore&aiOnly=false`
      )
      .then((res) => res.data);

    const fields = urls
      ? urls.map((theme) => ({
          loc: `/theme/${theme.id}`,
          lastmod: new Date().toISOString(),
          changefreq: "daily",
        }))
      : [];

    return fields;
  },
};
