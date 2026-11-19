import type { BrandId } from "@/lib/brand";
import type { ProductId, RegionId, Service, ServiceId } from "@/content/schema";

/** `href` overrides where the kind would send the visitor, e.g. to a section of the same page. */
export type Cta = { label: string; kind: "book-call" | "whatsapp" | "enquiry"; href?: string };

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
  /** What the brand does in a few words: the home page title and the share image's alt text. */
  tagline: string;
  /** Notes for whoever writes copy for this brand. */
  tone: string;
  hero: { headline: string; subline: string; primary: Cta; secondary: Cta };
  /** The footer's closing call to action, on pages that don't end with their own. */
  close: { headline: string; text: string };
  /** Number and date formatting, e.g. "en-US"; also picks the spelling (en-GB = UK). */
  locale: "en-US" | "en-GB";
  regions: Partial<Record<RegionId, RegionSettings>>;
  defaultRegion: RegionId;
  /** Wording a brand changes for a service, e.g. "WhatsApp Assistant" instead of "AI Chat Assistant". */
  serviceOverrides?: Partial<Record<ServiceId, Partial<Pick<Service, "name" | "summary" | "outcome">>>>;
  /**
   * Visual identity. Colours become CSS variables on <html>; `night` is the dark hero and band colour. `accent` stays
   * light enough for `ink` text on it (the primary buttons).
   */
  theme: {
    brand: string;
    /** The brand colour where it sits on `night`: brighter, so it keeps its contrast. */
    glow: string;
    accent: string;
    night: string;
    paper: string;
    ink: string;
    /** Headline face. */
    display: "space-grotesk" | "sora";
    /** Body and interface face. */
    text: "inter" | "manrope";
  };
  /** The worked examples the home page animates. Businesses and numbers are made up and labelled as examples. */
  showcase: Showcase;
};

export type Showcase = {
  /** Hero visual: the parts of a system joined to the middle, with work flowing between them. */
  hero: { kind: "graph"; hub: string; nodes: string[] };
  /** One evening at an example business, as a live feed. */
  feed: { title: string; rows: { time: string; event: string; result: string }[]; done: string };
  /** Where the hours go, before and after: a workday bar or one order's steps. */
  story: DayStory | FlowStory;
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
