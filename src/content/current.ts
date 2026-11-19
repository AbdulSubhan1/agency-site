import { BRANDS } from "@/brands";
import { currentBrand } from "@/lib/brand";
import { siteContent } from "./resolve";

/** What this build shows: the brand from BRAND. */
export function currentContent() {
  return siteContent(BRANDS[currentBrand()]);
}
