import type { Service } from "../schema";

export const leadResponse: Service = {
  id: "lead-response",
  name: "Instant Lead Response",
  summary: "Every new enquiry gets a helpful reply in under a minute, day or night, and lands in your CRM.",
  deliverables: [
    "A reply in under 60 seconds to every lead from your website, ads, WhatsApp and missed calls",
    "Qualifying questions, then booking straight into your calendar",
    "Every lead and conversation saved in your CRM",
    "A 7-day follow-up for leads who go quiet, with a hand-off to your team",
    "A weekly report on reply times, bookings and lost leads",
  ],
  steps: [
    {
      title: "List your lead sources",
      detail: "Forms, ads, WhatsApp, phone: where leads come from and where they get stuck.",
    },
    { title: "Write the script", detail: "Your tone, your qualifying questions and when a person takes over." },
    { title: "Build", detail: "The replies, the booking and the CRM link, built on n8n with AI." },
    { title: "Test with 20 leads", detail: "Real-looking test leads through every source before anything goes live." },
    { title: "Go live and tune", detail: "Two weeks of tuning on real conversations." },
  ],
  timeline: "2–3 weeks",
  outcome: "Your first reply drops from hours to under a minute, and you see how many leads it saves.",
  price: {
    us: { setup: { min: 2500, max: 5000 }, monthly: { min: 400, max: 900 } },
    ae: { setup: { min: 3500, max: 9000 }, monthly: { min: 1000, max: 2500 } },
    pk: { setup: { min: 60000, max: 150000 }, monthly: { min: 25000, max: 60000 } },
  },
};
