const axios = require("axios");
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.themeai.io",
  generateRobotsTxt: true,
  exclude: ["/themes/generated", "/settings"],
  additionalPaths: async () => {
    const urls = await axios
      .get(`${process.env.NEXTAUTH_URL}/api/sitemap-details`)
      .then((res) => res.data);

    const fields = urls
      ? urls.map((sitemap) => ({
          loc: `/${sitemap.type}/${sitemap.id}`,
          lastmod: new Date().toISOString(),
          changefreq: "daily",
          priority: 0.7,
        }))
      : [];

    return fields;
  },
  transform: async (config, path) => {
    return {
      loc: path,
      priority:
        path === "/" || path === "/themes"
          ? 1
          : path === "/themes/create"
          ? 0.9
          : 0.5,
      changefreq: config.changefreq,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
