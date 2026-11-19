import type { MetadataRoute } from "next";
import { currentContent } from "@/content/current";
import { COMPANY_LINKS } from "@/content/pages";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "/",
    "/services",
    ...COMPANY_LINKS.map((l) => l.href),
    ...currentContent().services.map((s) => `/services/${s.id}`),
    "/privacy",
    "/terms",
  ];
  return paths.map((path) => ({ url: new URL(path, base).toString() }));
}
