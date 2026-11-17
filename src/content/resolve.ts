import type { Brand } from "@/brands/types";
import { moneyRange } from "@/lib/money";
import { spell } from "@/lib/spelling";
import { PRODUCTS } from "./products";
import type { Product, RegionId, Service } from "./schema";
import { SERVICES } from "./services";

export type PriceLines = { setup?: string; monthly?: string; free?: boolean; note?: string };

export type ResolvedService = Omit<Service, "price"> & { price: PriceLines };
export type ResolvedProduct = Omit<Product, "price"> & { price?: string };

/** Every string in a value, spelt for the brand. */
function spellAll<T>(value: T, locale: Brand["locale"]): T {
  if (typeof value === "string") return spell(value, locale) as T;
  if (Array.isArray(value)) return value.map((v) => spellAll(v, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, spellAll(v, locale)])) as T;
  }
  return value;
}

/**
 * What one brand shows in one region: the shared services in the region's order with the brand's wording and the
 * region's prices, and the region's products. A service the region doesn't price is left out.
 */
export function siteContent(brand: Brand, regionId: RegionId) {
  const region = brand.regions[regionId];
  if (!region) throw new Error(`Brand "${brand.id}" has no region "${regionId}"`);

  const services: ResolvedService[] = region.featured.flatMap((id) => {
    const { price, ...service } = { ...SERVICES[id], ...brand.serviceOverrides?.[id] };
    const regional = price[regionId];
    if (!regional) return [];
    const lines: PriceLines =
      "free" in regional
        ? { free: true, note: regional.note }
        : {
            setup: regional.setup && moneyRange(regional.setup, region.currency, brand.locale),
            monthly: regional.monthly && `${moneyRange(regional.monthly, region.currency, brand.locale)} a month`,
            note: regional.note,
          };
    return [spellAll({ ...service, price: lines }, brand.locale)];
  });

  const products: ResolvedProduct[] = region.products.map((id) => {
    const { price, ...product } = PRODUCTS[id];
    return spellAll(
      { ...product, price: price && moneyRange(price.range, price.currency, brand.locale) },
      brand.locale,
    );
  });

  return { brand, region: { id: regionId, ...region }, services, products };
}
