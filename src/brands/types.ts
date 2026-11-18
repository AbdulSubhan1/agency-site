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
  /** The brand name: titles, header, footer and the share image. */
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
  /** Visual identity. Colours become CSS variables on <html>; `night` is the dark hero and band colour. */
  theme: {
    brand: string;
    /** The brand colour where it sits on `night`: brighter, so it keeps its contrast. */
    glow: string;
    accent: string;
    night: string;
    paper: string;
    ink: string;
    display: "bricolage" | "schibsted";
  };
  /** The worked examples the home page animates. Businesses and numbers are made up and labelled as examples. */
  showcase: Showcase;
};

export type Showcase = {
  /** Hero visual: apps joined to the business with work flowing between them, or a customer chat. */
  hero: { kind: "graph"; hub: string; nodes: string[] } | { kind: "chat"; chat: Chat };
  /** One evening at an example business, as a live feed. */
  feed: { title: string; rows: { time: string; event: string; result: string }[]; done: string };
  /** Where the hours go, before and after: a workday bar or one order's steps. */
  story: DayStory | FlowStory;
};

export type Chat = {
  business: string;
  status: string;
  caption: string;
  messages: { from: "them" | "us"; text: string; time: string; options?: string[] }[];
};

export type DayStory = {
  kind: "day";
  title: string;
  who: string;
  tasks: { label: string; minutes: number }[];
  /** Minutes the same tasks take once automated. */
  afterMinutes: number;
  after: string;
};

export type FlowStory = {
  kind: "flow";
  title: string;
  who: string;
  steps: { label: string; before: string; after: string }[];
  after: string;
};
