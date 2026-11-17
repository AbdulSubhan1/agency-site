import type { Brand } from "./types";

export const us: Brand = {
  id: "us",
  name: "Agency (US)",
  positioning: "We help US businesses streamline their processes with AI: fixed scope, fixed price, live in weeks.",
  tone: "Direct and outcome first. Short sentences, real numbers, no hype. Say what it costs and how long it takes.",
  hero: {
    headline: "Streamline your business with AI, without hiring an AI team",
    subline:
      "We find the work that slows you down, automate it and hand you the keys. Fixed scope, fixed price, and you own everything we build.",
    primary: { label: "Book a free 20-minute call", kind: "book-call" },
    secondary: { label: "See what we automate", kind: "enquiry" },
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
  theme: { brand: "#1f4fd1", accent: "#f2b33d" },
};
