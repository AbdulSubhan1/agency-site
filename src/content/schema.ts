import { z } from "zod";

// The shape of every piece of content. Content files are checked against these in content.test.ts, so a typo in a
// price or a missing step fails the tests instead of showing a broken page.

export const REGION_IDS = ["us", "ae", "pk"] as const;
export type RegionId = (typeof REGION_IDS)[number];

export const SERVICE_IDS = [
  "audit",
  "workflows",
  "lead-response",
  "chat-agent",
  "voice",
  "crm",
  "documents",
  "website",
  "content",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const PRODUCT_IDS = [
  "speed-to-lead-starter",
  "workflow-bundles",
  "assistant-kits",
  "prompt-libraries",
  "cod-confirmation",
] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

/** Whole units of the region's currency; `max` left out means "from". */
const range = z
  .object({ min: z.number().int().nonnegative(), max: z.number().int().positive().optional() })
  .refine((r) => r.max === undefined || r.max > r.min, "max must be above min");
export type Range = z.infer<typeof range>;

/** What a service costs in one region. `free` is for entry offers; `note` says what the client pays on top. */
const servicePrice = z.union([
  z.object({ free: z.literal(true), note: z.string().optional() }),
  z
    .object({ setup: range.optional(), monthly: range.optional(), note: z.string().optional() })
    .refine((p) => p.setup || p.monthly, "a price needs a setup or a monthly range"),
]);
export type ServicePrice = z.infer<typeof servicePrice>;

const sentence = z.string().min(3);

export const serviceSchema = z.object({
  id: z.enum(SERVICE_IDS),
  name: sentence,
  summary: sentence,
  /** What the client gets. */
  deliverables: z.array(sentence).min(2),
  /** How we do it, in order. */
  steps: z.array(z.object({ title: sentence, detail: sentence })).min(3),
  timeline: sentence,
  outcome: sentence,
  /** null: not offered in that region (yet). */
  price: z.record(z.enum(REGION_IDS), servicePrice.nullable()),
});
export type Service = z.infer<typeof serviceSchema>;

export const productSchema = z.object({
  id: z.enum(PRODUCT_IDS),
  name: sentence,
  summary: sentence,
  kind: z.enum(["free", "paid"]),
  /** Paid products only; a free one has no price. */
  price: z.object({ currency: z.enum(["USD", "AED", "PKR"]), range }).optional(),
  delivery: sentence,
  /** The service a buyer is offered next ("we install it for you"). */
  upsell: z.enum(SERVICE_IDS),
  regions: z.array(z.enum(REGION_IDS)).min(1),
});
export type Product = z.infer<typeof productSchema>;
