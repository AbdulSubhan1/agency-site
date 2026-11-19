import { describe, expect, it } from "vitest";
import { BRANDS } from "@/brands";
import { US_TO_UK } from "@/lib/spelling";
import { COMPANY } from "./company";
import { COMPANY_LINKS } from "./pages";
import { siteContent } from "./resolve";
import { SERVICE_IDS, serviceSchema, type RegionId } from "./schema";
import { SERVICES } from "./services";

const brands = Object.values(BRANDS);
const regionsOf = (brand: (typeof brands)[number]) => Object.keys(brand.regions) as RegionId[];

describe.each(brands)("brand $id", (brand) => {
  const services = SERVICES[brand.id];

  it.each(services.map((s) => [s.id, s] as const))("service %s is complete", (_id, service) => {
    expect(() => serviceSchema.parse(service)).not.toThrow();
  });

  it("offers eight services, each once", () => {
    expect(services).toHaveLength(8);
    expect(new Set(services.map((s) => s.id)).size).toBe(8);
  });

  it("links FAQ answers only to pages this brand has", () => {
    const pages = new Set([
      "/services",
      "/contact",
      ...COMPANY_LINKS.map((l) => l.href),
      ...services.map((s) => `/services/${s.id}`),
    ]);
    const links = COMPANY[brand.id].faq.groups.flatMap((g) => g.items.flatMap((i) => (i.link ? [i.link.href] : [])));
    expect(links.length).toBeGreaterThan(0);
    expect(links.filter((href) => !pages.has(href))).toEqual([]);
  });

  it("explains every project step on the Process page", () => {
    const steps = COMPANY[brand.id].process.steps;
    expect(steps.map((s) => s.title)).toEqual(siteContent(brand).steps.map((s) => s.title));
    for (const s of steps) expect(s.get.length && s.need.length).toBeTruthy();
  });

  it.each(regionsOf(brand))("names industries for %s", (regionId) => {
    expect(brand.regions[regionId]!.industries.length).toBeGreaterThanOrEqual(3);
  });
});

describe("services", () => {
  it("covers every id the CRM is told about, and only those", () => {
    const used = new Set([...SERVICES.asia, ...SERVICES.us].map((s) => s.id));
    expect([...used].sort()).toEqual([...SERVICE_IDS].sort());
  });

  it("is written in US spelling, so the UK brand's swap catches every word", () => {
    const text = JSON.stringify([SERVICES, COMPANY]).toLowerCase();
    const ukForms = Object.values(US_TO_UK).filter((uk) => new RegExp(`\\b${uk}\\b`).test(text));
    expect(ukForms).toEqual([]);
  });

  it("promises no rankings, traffic or citations", () => {
    const text = JSON.stringify(SERVICES).toLowerCase();
    expect(text).not.toMatch(/guarantee|#1|top rank|first page/);
  });
});

describe("siteContent", () => {
  it("gives each brand its own services and project steps", () => {
    const devxonic = siteContent(BRANDS.asia);
    const radianzest = siteContent(BRANDS.us);
    expect(devxonic.services[0].id).toBe("custom-software");
    expect(radianzest.services[0].id).toBe("websites");
    expect(devxonic.steps.map((s) => s.title)).toEqual(["Discover", "Design", "Build", "Improve"]);
    expect(radianzest.steps.map((s) => s.title)).toEqual(["Discover", "Build", "Optimize", "Learn"]);
  });

  it("spells DevXonic's services the UK way", () => {
    const design = siteContent(BRANDS.asia).services.find((s) => s.id === "product-design")!;
    expect(design.deliverables.join(" ")).toContain("colours");
  });
});
