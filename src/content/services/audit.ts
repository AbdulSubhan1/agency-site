import type { Service } from "../schema";

export const audit: Service = {
  id: "audit",
  name: "AI Automation Audit",
  summary: "We find where your business loses time and show what to automate first, with the payback for each.",
  deliverables: [
    "A 45-minute discovery call with the people who run the work",
    "A map of how leads, orders and admin move through your business today",
    "Your top 5 automations, each with the hours saved and the expected payback",
    "A 90-day roadmap in the order that pays back fastest",
    "Fixed quotes for each automation, with the audit fee credited to the first build",
  ],
  steps: [
    { title: "Intake", detail: "A short form about your tools, team and the work that eats the most time." },
    { title: "Discovery call", detail: "45 minutes on how the work really happens, step by step." },
    { title: "Process map", detail: "We map the flow and mark every manual step, delay and repeat entry." },
    { title: "Report", detail: "The top 5 automations, ranked by payback, with fixed quotes." },
    { title: "Walkthrough", detail: "A call to go through the report and answer your questions." },
  ],
  timeline: "5 working days",
  outcome: "You know exactly what to automate first and what it pays back, before you spend on a build.",
  price: {
    us: { setup: { min: 750, max: 1500 }, note: "Credited to your first build" },
    ae: { setup: { min: 1500, max: 3000 }, note: "Credited to your first build" },
    pk: { free: true, note: "Free while we take on our first clients in Pakistan" },
  },
};
