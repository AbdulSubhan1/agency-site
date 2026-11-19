import { z } from "zod";

// The shape of every piece of content. Content files are checked against these in content.test.ts, so a typo or a
// missing deliverable fails the tests instead of showing a broken page.

export const REGION_IDS = ["us", "ae", "pk"] as const;
export type RegionId = (typeof REGION_IDS)[number];

/**
 * Every service either brand offers, DevXonic's first. AgencyDesk accepts exactly these (its constants/leads.ts
 * SERVICES), so a new id goes there first.
 */
export const SERVICE_IDS = [
  "custom-software",
  "web-apps",
  "mobile-apps",
  "product-design",
  "ai",
  "automation",
  "integrations",
  "devops",
  "websites",
  "branding",
  "seo",
  "marketing",
  "conversion",
  "strategy",
  "reporting",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const ICONS = [
  "code",
  "web",
  "mobile",
  "design",
  "ai",
  "flow",
  "plug",
  "cloud",
  "brand",
  "search",
  "megaphone",
  "target",
  "compass",
  "chart",
] as const;

const sentence = z.string().min(3);

export const serviceSchema = z.object({
  id: z.enum(SERVICE_IDS),
  icon: z.enum(ICONS),
  name: sentence,
  /** One sentence on what it does for the buyer: cards, the page lead and search snippets. */
  summary: sentence,
  /** The deliverables in a few words, for cards. */
  brief: sentence,
  /** What the client gets, in full. */
  deliverables: z.array(sentence).min(3),
  /** The result, said once in large type near the end of the service page. */
  outcome: sentence,
});
export type Service = z.infer<typeof serviceSchema>;
