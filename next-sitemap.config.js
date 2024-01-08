/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.themeai.io",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://www.themeai.io/server-sitemap.xml"],
  },
};
