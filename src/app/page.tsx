import type { Metadata } from "next";
import { BRANDS } from "@/brands";
import { DevxonicHome } from "@/components/home/devxonic-home";
import { RadianzestHome } from "@/components/home/radianzest-home";
import { JsonLd } from "@/components/site/json-ld";
import { currentBrand } from "@/lib/brand";
import { siteUrl } from "@/lib/site-url";
import { graph, organization, website } from "@/lib/structured-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** Each brand is its own business now, so each has its own home page; the sections underneath are shared. */
export default function Home() {
  const brand = BRANDS[currentBrand()];
  const base = siteUrl();
  return (
    <>
      <JsonLd data={graph(organization(brand, base), website(brand, base))} />
      {brand.id === "asia" ? <DevxonicHome brand={brand} /> : <RadianzestHome brand={brand} />}
    </>
  );
}
