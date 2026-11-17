import type { Brand } from "./types";

export const asia: Brand = {
  id: "asia",
  name: "Agency (Asia)",
  positioning:
    "We help businesses in the UAE and Pakistan streamline their processes with AI, on the channels their customers already use.",
  tone: "Warm and personal. Show the founders, local examples and prices in local currency. WhatsApp is the main channel.",
  hero: {
    headline: "Run your business smoothly with AI, on WhatsApp and beyond",
    subline:
      "We map where your team loses time, then automate it: replies, orders, follow-ups and admin. You talk to the people who build it.",
    primary: { label: "Chat with us on WhatsApp", kind: "whatsapp" },
    secondary: { label: "Book a free process review", kind: "book-call" },
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
  theme: { brand: "#0f6b5c", accent: "#e3a33b" },
};
