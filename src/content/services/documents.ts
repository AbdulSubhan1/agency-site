import type { Service } from "../schema";

export const documents: Service = {
  id: "documents",
  name: "AI Document Processing",
  summary: "Forms, PDFs and receipts are read for you, and the data goes straight into your sheets or CRM.",
  deliverables: [
    "Automatic reading of your PDFs, forms and receipts",
    "The fields you need, sent to a spreadsheet or your CRM",
    "Unsure results flagged for a person to check",
    "An accuracy report measured on your own documents",
  ],
  steps: [
    { title: "Collect samples", detail: "50 real documents of each kind you handle." },
    { title: "Define the fields", detail: "Exactly what to pull out and where it goes." },
    { title: "Build", detail: "Reading, checking and sending, with a review queue for unsure cases." },
    { title: "Measure", detail: "We run the samples and show you the accuracy before go-live." },
    { title: "Go live", detail: "With alerts and two weeks of fixes included." },
  ],
  timeline: "2–4 weeks",
  outcome: "Data entry drops from hours to minutes, at an accuracy you have seen measured.",
  price: {
    us: { setup: { min: 3000, max: 10000 } },
    ae: { setup: { min: 6000 } },
    pk: { setup: { min: 100000 } },
  },
};
