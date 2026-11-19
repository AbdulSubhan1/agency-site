import type { Brand } from "./types";

export const asia: Brand = {
  id: "asia",
  name: "Devxonic",
  positioning:
    "We design, engineer and improve software products, applications and business systems for organisations around the world.",
  tagline: "Custom software development",
  tone: "Technically confident, precise and professional. Outcome first, then the technical detail; no unexplained jargon. International English.",
  hero: {
    headline: "Build software that moves your business forward",
    subline:
      "From custom web and mobile applications to SaaS platforms, integrations and AI workflows, we engineer products around real business needs.",
    primary: { label: "Start a project", kind: "book-call" },
    secondary: { label: "See what we build", kind: "enquiry", href: "#services" },
  },
  close: {
    headline: "Tell us what you are building.",
    text: "We will start with the scope, not the sales pitch.",
  },
  locale: "en-GB",
  regions: {
    ae: {
      label: "United Arab Emirates",
      currency: "AED",
      timeZone: "Asia/Dubai",
      industries: ["Real estate", "Clinics", "Restaurants", "Online stores", "Travel agencies"],
      featured: ["audit", "workflows", "chat-agent", "lead-response", "crm", "documents", "content", "website"],
      products: ["speed-to-lead-starter", "workflow-bundles", "assistant-kits", "prompt-libraries"],
    },
    pk: {
      label: "Pakistan",
      currency: "PKR",
      timeZone: "Asia/Karachi",
      industries: ["Online sellers", "Real estate", "Academies", "Clinics"],
      featured: ["audit", "workflows", "chat-agent", "crm", "lead-response", "website"],
      products: ["cod-confirmation", "speed-to-lead-starter", "workflow-bundles"],
    },
  },
  defaultRegion: "ae",
  // WhatsApp only allows business-specific assistants, so the Asia brand names it after the channel and the business
  serviceOverrides: {
    "chat-agent": {
      name: "WhatsApp Business Assistant",
      summary:
        "Your own assistant on WhatsApp and your website, trained on your business, with your team one tap away.",
    },
  },
  theme: {
    brand: "#6b21e8",
    glow: "#a57bff",
    accent: "#c9b6ff",
    night: "#0e0420",
    paper: "#faf8ff",
    ink: "#1c1330",
    display: "space-grotesk",
    text: "inter",
  },
};
