import type { Service } from "../schema";

export const crm: Service = {
  id: "crm",
  name: "CRM Setup and Automation",
  summary: "One place for every customer and deal, with the follow-ups and reports set up for you.",
  deliverables: [
    "Your CRM set up, or a custom CRM built for how your team works",
    "Pipelines, lead assignment, reminders and reports",
    "Your existing data imported and cleaned",
    "Training for your team and 30 days of support",
  ],
  steps: [
    { title: "Workflow interview", detail: "How deals, customers and tasks move today, and where they get lost." },
    { title: "Design", detail: "Stages, fields, roles and reports, agreed before we build." },
    { title: "Build", detail: "The CRM and its automations." },
    { title: "Import", detail: "Your spreadsheets and old tools brought in, with duplicates removed." },
    { title: "Train and support", detail: "A training session and 30 days of help." },
  ],
  timeline: "2–4 weeks",
  outcome: "Every lead and customer in one place, and no follow-up forgotten.",
  price: {
    us: { setup: { min: 4000, max: 20000 } },
    ae: { setup: { min: 8000 } },
    pk: { setup: { min: 150000 } },
  },
};
