import { describe, expect, it } from "vitest";
import { BRANDS } from "@/brands";
import { US_TO_UK } from "@/lib/spelling";
import { PRODUCTS } from "./products";
import { siteContent } from "./resolve";
import { productSchema, REGION_IDS, serviceSchema, type RegionId } from "./schema";
import { SERVICES } from "./services";

const brands = Object.values(BRANDS);
const regionsOf = (brand: (typeof brands)[number]) => Object.keys(brand.regions) as RegionId[];

describe("shared content", () => {
  it.each(Object.entries(SERVICES))("service %s is complete and filed under its own id", (key, service) => {
    expect(serviceSchema.parse(service).id).toBe(key);
    expect(Object.keys(service.price).sort()).toEqual([...REGION_IDS].sort());
  });

  it.each(Object.entries(PRODUCTS))("product %s is complete and filed under its own id", (key, product) => {
    expect(productSchema.parse(product).id).toBe(key);
    expect(product.kind === "paid").toBe(product.price !== undefined);
  });

  it("is written in US spelling, so the UK brand's swap catches every word", () => {
    const text = JSON.stringify([SERVICES, PRODUCTS]).toLowerCase();
    const ukForms = Object.values(US_TO_UK).filter((uk) => new RegExp(`\\b${uk}\\b`).test(text));
    expect(ukForms).toEqual([]);
  });
});

describe.each(brands)("brand $id", (brand) => {
  it("has its default region", () => {
    expect(brand.regions[brand.defaultRegion]).toBeDefined();
  });

  it.each(regionsOf(brand))("features only services priced in %s, each once", (regionId) => {
    const featured = brand.regions[regionId]!.featured;
    expect(new Set(featured).size).toBe(featured.length);
    for (const id of featured) expect(SERVICES[id].price[regionId], `${id} has no ${regionId} price`).not.toBeNull();
  });

  it.each(regionsOf(brand))("shows only products sold in %s, whose next service is offered there", (regionId) => {
    for (const id of brand.regions[regionId]!.products) {
      const product = PRODUCTS[id];
      expect(product.regions).toContain(regionId);
      expect(SERVICES[product.upsell].price[regionId], `${id} upsells ${product.upsell}`).not.toBeNull();
    }
  });

  it.each(regionsOf(brand))("names industries for %s", (regionId) => {
    expect(brand.regions[regionId]!.industries.length).toBeGreaterThanOrEqual(3);
  });
});

describe("siteContent", () => {
  it("prices the US brand in dollars, in its own order", () => {
    const { services } = siteContent(BRANDS.us, "us");
    expect(services.map((s) => s.id).slice(0, 2)).toEqual(["audit", "workflows"]);
    const lead = services.find((s) => s.id === "lead-response")!;
    expect(lead.price).toMatchObject({ setup: "$2,500–5,000", monthly: "$400–900 a month" });
  });

  it("prices the UAE in dirhams and leaves out the voice service", () => {
    const { services } = siteContent(BRANDS.asia, "ae");
    expect(services.find((s) => s.id === "lead-response")!.price.setup).toBe("AED 3,500–9,000");
    expect(services.some((s) => s.id === "voice")).toBe(false);
  });

  it("uses the Asia brand's own wording for the chat assistant", () => {
    const chat = siteContent(BRANDS.asia, "pk").services.find((s) => s.id === "chat-agent")!;
    expect(chat.name).toBe("WhatsApp Business Assistant");
    expect(chat.price.monthly).toBe("PKR 25,000–60,000 a month");
  });

  it("shows the free audit in Pakistan", () => {
    const audit = siteContent(BRANDS.asia, "pk").services[0];
    expect(audit.price).toMatchObject({ free: true });
  });

  it("refuses a region the brand doesn't serve", () => {
    expect(() => siteContent(BRANDS.us, "pk")).toThrow(/no region "pk"/);
  });
});
