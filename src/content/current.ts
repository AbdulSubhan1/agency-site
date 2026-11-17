import { BRANDS } from "@/brands";
import { currentBrand } from "@/lib/brand";
import { siteContent } from "./resolve";

/** What this build shows: the brand from BRAND, in its default region. */
export function currentContent() {
  const brand = BRANDS[currentBrand()];
  return siteContent(brand, brand.defaultRegion);
}
