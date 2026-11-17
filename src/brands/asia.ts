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
  theme: {
    brand: "#0f6b5c",
    glow: "#2fc4a7",
    accent: "#e8a93c",
    night: "#03201b",
    paper: "#f2f7f5",
    ink: "#0e2a24",
    display: "schibsted",
  },
  showcase: {
    hero: {
      kind: "chat",
      chat: {
        business: "Example: a dental clinic in Dubai",
        status: "Assistant, replies instantly",
        caption: "Booked before midnight, with nobody at reception.",
        messages: [
          { from: "them", text: "Hi, do you do teeth whitening? How much?", time: "11:48 pm" },
          {
            from: "us",
            text: "Yes, we do. In-clinic whitening is AED 1,200 and takes about an hour. Would you like to book a visit?",
            time: "11:48 pm",
          },
          { from: "them", text: "Yes, this weekend if possible", time: "11:49 pm" },
          {
            from: "us",
            text: "These times are free with Dr Sara:",
            time: "11:49 pm",
            options: ["Sat 10:30", "Sat 4:00", "Sun 11:00"],
          },
          { from: "them", text: "Sat 10:30 please", time: "11:50 pm" },
          { from: "us", text: "Booked. You'll get a reminder the day before. See you Saturday!", time: "11:50 pm" },
        ],
      },
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
