import type { Service } from "../schema";

export const workflows: Service = {
  id: "workflows",
  name: "Workflow Automation",
  summary: "The copy-paste work between your apps runs by itself: invoices, onboarding, reports and data entry.",
  deliverables: [
    "Automated workflows between the apps you already use, built on n8n",
    "Error alerts and monitoring, so a failed run never goes unnoticed",
    "A short video guide for each workflow",
    "Full ownership: the workflows run on your account, not ours",
  ],
  steps: [
    { title: "Pick one workflow", detail: "We start with the task that costs the most hours each week." },
    { title: "Map it", detail: "Every step, app and exception, written down and agreed with you." },
    { title: "Build", detail: "We build it, with AI where judgement is needed and rules everywhere else." },
    { title: "Test with real samples", detail: "Last month's real cases run through it before it goes live." },
    { title: "Hand over", detail: "Video guide, alerts switched on, and two weeks of fixes included." },
  ],
  timeline: "1–3 weeks per workflow",
  outcome: "Hours back every week, and no more errors from typing the same data twice.",
  price: {
    us: { setup: { min: 1500, max: 15000 }, monthly: { min: 300, max: 500 }, note: "Monthly care is optional" },
    ae: { setup: { min: 3000 }, monthly: { min: 1000 }, note: "Monthly care is optional" },
    pk: { setup: { min: 50000 }, monthly: { min: 15000 }, note: "Monthly care is optional" },
  },
};
