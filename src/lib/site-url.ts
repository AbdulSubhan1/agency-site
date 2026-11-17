/** The site's own address for absolute links (Open Graph, sitemap). SITE_URL on Vercel; localhost while developing. */
export function siteUrl(): URL {
  const fromEnv =
    process.env.SITE_URL?.trim() ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  return new URL(fromEnv || "http://localhost:3080");
}
