import type { MetadataRoute } from "next";
import { currentContent } from "@/content/current";
import { NAV } from "@/content/pages";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "/",
    ...NAV.map((l) => l.href),
    ...currentContent().services.map((s) => `/services/${s.id}`),
    "/privacy",
    "/terms",
  ];
  return paths.map((path) => ({ url: new URL(path, base).toString() }));
}
