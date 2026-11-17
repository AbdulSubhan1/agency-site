import type { Service } from "../schema";

export const website: Service = {
  id: "website",
  name: "AI-built Website",
  summary: "A fast website or landing page that turns visitors into enquiries, with every form wired to your CRM.",
  deliverables: [
    "A fast, mobile-first website or landing page",
    "Forms that send every enquiry to your CRM",
    "Uptime monitoring and visitor analytics",
    "Basic SEO: titles, descriptions, sitemap and share images",
  ],
  steps: [
    { title: "Brief", detail: "Who your customers are and what you want them to do." },
    { title: "Design direction", detail: "Two directions to choose from before we build." },
    { title: "Build", detail: "Pages, forms and the CRM link." },
    { title: "Content", detail: "Your copy, written or polished with you." },
    { title: "Launch", detail: "Live, with two weeks of fixes included." },
  ],
  timeline: "1–3 weeks",
  outcome: "A site that brings in enquiries, with the numbers to show it.",
  price: {
    us: { setup: { min: 1500, max: 10000 } },
    ae: { setup: { min: 4000 } },
    pk: { setup: { min: 60000 } },
  },
};
