import type { Product, ProductId } from "./schema";

// Enquiry only for now: the site shows the product and an enquiry form. Selling comes later (Polar or Gumroad).
export const PRODUCTS: Record<ProductId, Product> = {
  "speed-to-lead-starter": {
    id: "speed-to-lead-starter",
    name: "Speed-to-Lead Starter",
    summary: "A ready n8n workflow that replies to every new web enquiry within a minute, with a setup checklist.",
    kind: "free",
    delivery: "Download with a 10-minute video walkthrough",
    upsell: "lead-response",
    regions: ["us", "ae", "pk"],
  },
  "workflow-bundles": {
    id: "workflow-bundles",
    name: "Workflow Bundles by Industry",
    summary: "Tested n8n workflows for one industry, such as follow-ups and reports for real estate teams.",
    kind: "paid",
    price: { currency: "USD", range: { min: 29, max: 149 } },
    delivery: "Download with video walkthroughs; installation on request",
    upsell: "workflows",
    regions: ["us", "ae", "pk"],
  },
  "assistant-kits": {
    id: "assistant-kits",
    name: "AI Assistant Kits",
    summary: "A receptionist or WhatsApp assistant set up for one kind of business, ready to adapt to yours.",
    kind: "paid",
    price: { currency: "USD", range: { min: 99, max: 349 } },
    delivery: "Download with a setup guide; an agency edition can be used for your own clients",
    upsell: "chat-agent",
    regions: ["us", "ae", "pk"],
  },
  "prompt-libraries": {
    id: "prompt-libraries",
    name: "Industry Prompt Libraries",
    summary: "Tested prompts and ready Claude Project or GPT setups for the daily work of one industry.",
    kind: "paid",
    price: { currency: "USD", range: { min: 29, max: 79 } },
    delivery: "Download, with a guide to each prompt",
    upsell: "audit",
    regions: ["us", "ae", "pk"],
  },
  "cod-confirmation": {
    id: "cod-confirmation",
    name: "WhatsApp Order Confirmation Kit",
    summary: "Confirms every cash-on-delivery order on WhatsApp before it ships, so fewer fake orders go out.",
    kind: "paid",
    price: { currency: "PKR", range: { min: 4999, max: 9999 } },
    delivery: "Set up on your WhatsApp Business number with you",
    upsell: "chat-agent",
    regions: ["pk"],
  },
};
