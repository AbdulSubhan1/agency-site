import type { BrandId } from "@/lib/brand";
import type { ProductId, RegionId, Service, ServiceId } from "@/content/schema";

export type Cta = { label: string; kind: "book-call" | "whatsapp" | "enquiry" };

export type RegionSettings = {
  label: string;
  currency: "USD" | "AED" | "PKR";
  timeZone: string;
  /** Example industries shown on this region's pages, most important first. */
  industries: string[];
  /** Services in the order this region features them; a service left out is not shown. */
  featured: ServiceId[];
  products: ProductId[];
};

/** Everything that differs per brand. The shared content in src/content/ fills in the rest. */
export type Brand = {
  id: BrandId;
  /** Placeholder until the brand name is chosen. */
  name: string;
  positioning: string;
  /** Notes for whoever writes copy for this brand. */
  tone: string;
  hero: { headline: string; subline: string; primary: Cta; secondary: Cta };
  /** Number and date formatting, e.g. "en-US"; also picks the spelling (en-GB = UK). */
  locale: "en-US" | "en-GB";
  regions: Partial<Record<RegionId, RegionSettings>>;
  defaultRegion: RegionId;
  /** Wording a brand changes for a service, e.g. "WhatsApp Assistant" instead of "AI Chat Assistant". */
  serviceOverrides?: Partial<Record<ServiceId, Partial<Pick<Service, "name" | "summary" | "outcome">>>>;
  /** Visual identity; the design step (phase 3) fills it in. */
  theme: { brand: string; accent: string };
};
