import { describe, expect, it } from "vitest";
import { asia } from "@/brands/asia";
import { us } from "@/brands/us";
import { breadcrumbs, graph, organization, service, website } from "./structured-data";

const base = new URL("https://agency-us.vercel.app");

describe("structured data", () => {
  it("names the brand, its logo and every region it serves", () => {
    expect(organization(us, base)).toMatchObject({
      "@type": "Organization",
      "@id": "https://agency-us.vercel.app/#organization",
      name: "Radianzest",
      logo: "https://agency-us.vercel.app/apple-icon",
      areaServed: [{ "@type": "Country", name: "United States" }],
    });
    expect(organization(asia, base).areaServed).toEqual([
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Pakistan" },
    ]);
  });

  it("links the website and each service back to the organization", () => {
    const org = { "@id": "https://agency-us.vercel.app/#organization" };
    expect(website(us, base).publisher).toEqual(org);
    const s = service(us, { id: "workflows", name: "Workflow Automation", summary: "Runs by itself." }, base);
    expect(s).toMatchObject({ "@type": "Service", url: "https://agency-us.vercel.app/services/workflows" });
    expect(s.provider).toMatchObject(org);
  });

  it("numbers breadcrumbs from 1 with absolute links", () => {
    const list = breadcrumbs(
      [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ],
      base,
    );
    expect(list.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://agency-us.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://agency-us.vercel.app/services" },
    ]);
  });

  it("wraps several things in one schema.org graph", () => {
    expect(graph(website(us, base))).toMatchObject({
      "@context": "https://schema.org",
      "@graph": [{ "@type": "WebSite" }],
    });
  });
});
