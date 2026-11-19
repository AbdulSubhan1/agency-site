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
    brand: "#1248ff",
    glow: "#6e8bff",
    accent: "#a99bff",
    night: "#080e23",
    paper: "#f7f9fd",
    ink: "#151b30",
    display: "space-grotesk",
    text: "inter",
  },
  showcase: {
    hero: {
      kind: "graph",
      hub: "Your product",
      nodes: ["Web app", "Mobile app", "APIs", "Database", "AI models", "Cloud"],
    },
    feed: {
      title: "Example: an online store in Lahore, one evening",
      rows: [
        {
          time: "7:02 pm",
          event: "New cash-on-delivery order on WhatsApp",
          result: "Confirmed with the customer in 2 minutes",
        },
        {
          time: "7:30 pm",
          event: "Customer asks where their parcel is",
          result: "Tracking link sent from the courier's system",
        },
        {
          time: "8:15 pm",
          event: "Order with a wrong address",
          result: "Customer fixed it in the chat, sheet updated",
        },
        { time: "10:40 pm", event: "Daily orders report due", result: "Sent to the owner's WhatsApp" },
      ],
      done: "Handled tonight without anyone at a desk",
    },
    story: {
      kind: "flow",
      title: "How one order moves",
      who: "Example: an online clothing store, about 60 cash-on-delivery orders a day",
      steps: [
        {
          label: "Order arrives on WhatsApp",
          before: "Waits up to 3 hours for a reply",
          after: "Answered in a minute",
        },
        {
          label: "Typed into a spreadsheet",
          before: "2 hours a day, with typos",
          after: "Lands in the sheet by itself",
        },
        {
          label: "Customer called to confirm",
          before: "1 in 5 orders turns out fake",
          after: "Confirmed on WhatsApp first",
        },
        { label: "Courier booked", before: "Fake orders go out too", after: "Only real orders go out" },
      ],
      after: "Your team only handles the orders that need a person.",
    },
  },
};
