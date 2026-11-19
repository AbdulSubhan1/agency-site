import type { Brand } from "./types";

export const us: Brand = {
  id: "us",
  name: "Radianzest",
  positioning:
    "We build brands, digital experiences and growth systems that help US businesses get discovered, win trust and convert demand.",
  tagline: "Web design, branding and digital growth",
  tone: "Bold, creative and approachable, focused on growth. Say what it costs and what it changes; no hype, no guarantees. US English.",
  hero: {
    headline: "Create attention. Earn trust. Build momentum.",
    subline:
      "We unite websites, brand identity, search visibility and marketing technology into digital experiences designed to move US businesses forward.",
    primary: { label: "Start a project", kind: "book-call" },
    secondary: { label: "See what we do", kind: "enquiry", href: "#services" },
  },
  close: {
    headline: "Ready to make your digital presence work harder?",
    text: "Tell us about your goals. You talk to the people who would build it.",
  },
  locale: "en-US",
  regions: {
    us: {
      label: "United States",
      currency: "USD",
      timeZone: "America/New_York",
      industries: ["Home services", "Real estate", "Law firms", "Online stores", "Marketing agencies"],
      featured: [
        "audit",
        "workflows",
        "lead-response",
        "chat-agent",
        "crm",
        "documents",
        "voice",
        "content",
        "website",
      ],
      products: ["speed-to-lead-starter", "workflow-bundles", "assistant-kits", "prompt-libraries"],
    },
  },
  defaultRegion: "us",
  theme: {
    brand: "#0a7c71",
    glow: "#2ad4c2",
    accent: "#f4b942",
    night: "#05191b",
    paper: "#f4fbfa",
    ink: "#0c2a2a",
    display: "sora",
    text: "manrope",
  },
};
