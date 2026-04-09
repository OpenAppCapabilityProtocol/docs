/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const isStaticExport = process.env.EXPORT_MODE === "static";

module.exports = {
  siteUrl: siteUrl
    ? `${siteUrl}${process.env.NEXT_PUBLIC_BASE_PATH || ""}`
    : "https://example.com",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  output: "standalone",
  outDir: isStaticExport ? "out" : "public",
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
