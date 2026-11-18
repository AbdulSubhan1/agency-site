import type { Brand } from "@/brands/types";

// schema.org data for search engines, built from the brand and content files so it always matches the page.

type Thing = Record<string, unknown>;

/** The square brand mark Google can show next to results (src/app/apple-icon.tsx, 180 px). */
export const LOGO_PATH = "/apple-icon";

const at = (path: string, base: URL) => new URL(path, base).toString();

function areaServed(brand: Brand): Thing[] {
  return Object.values(brand.regions)
    .filter((r) => r !== undefined)
    .map((r) => ({ "@type": "Country", name: r.label }));
}

/** Who stands behind the site; services point back to it by @id. */
export function organization(brand: Brand, base: URL): Thing {
  return {
    "@type": "Organization",
    "@id": at("/#organization", base),
    name: brand.name,
    url: at("/", base),
    logo: at(LOGO_PATH, base),
    description: brand.positioning,
    areaServed: areaServed(brand),
  };
}

export function website(brand: Brand, base: URL): Thing {
  return {
    "@type": "WebSite",
    "@id": at("/#website", base),
    name: brand.name,
    url: at("/", base),
    publisher: { "@id": at("/#organization", base) },
  };
}

export function service(brand: Brand, s: { id: string; name: string; summary: string }, base: URL): Thing {
  return {
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.summary,
    url: at(`/services/${s.id}`, base),
    provider: { "@type": "Organization", "@id": at("/#organization", base), name: brand.name, url: at("/", base) },
    areaServed: areaServed(brand),
  };
}

export function breadcrumbs(items: { name: string; path: string }[], base: URL): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: at(item.path, base),
    })),
  };
}

/** Several things for one page, as one JSON-LD block. */
export function graph(...things: Thing[]): Thing {
  return { "@context": "https://schema.org", "@graph": things };
}
