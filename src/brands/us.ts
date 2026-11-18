import type { Brand } from "./types";

export const us: Brand = {
  id: "us",
  name: "Radianzest",
  positioning: "We help US businesses streamline their processes with AI: fixed scope, fixed price, live in weeks.",
  tone: "Direct and outcome first. Short sentences, real numbers, no hype. Say what it costs and how long it takes.",
  hero: {
    headline: "Streamline your business with AI, without hiring an AI team",
    subline:
      "We find the work that slows you down, automate it and hand you the keys. Fixed scope, fixed price, and you own everything we build.",
    primary: { label: "Book a free 20-minute call", kind: "book-call" },
    secondary: { label: "See what we automate", kind: "enquiry" },
  },
  locale: "en-US",
  regions: {
    us: {
      label: "United States",
      currency: "USD",
      timeZone: "America/New_York",
      industries: ["Home services", "Real estate", "Law firms", "Online stores", "Marketing agencies"],
      featured: [
        "audit",
        "workflows",
        "lead-response",
        "chat-agent",
        "crm",
        "documents",
        "voice",
        "content",
        "website",
      ],
      products: ["speed-to-lead-starter", "workflow-bundles", "assistant-kits", "prompt-libraries"],
    },
  },
  defaultRegion: "us",
  theme: {
    brand: "#1f4fd1",
    glow: "#5b8cff",
    accent: "#f2b33d",
    night: "#070d24",
    paper: "#f5f7fb",
    ink: "#0e1530",
    display: "bricolage",
  },
  showcase: {
    hero: {
      kind: "graph",
      hub: "Your business",
      nodes: ["Missed calls", "Web forms", "CRM", "Invoices", "Calendar", "Email"],
    },
    feed: {
      title: "Example: a home services company, Tuesday evening",
      rows: [
        {
          time: "6:12 pm",
          event: "Missed call from a new customer while the team was on a job",
          result: "Texted back in 38 seconds",
        },
        {
          time: "6:20 pm",
          event: "Web form: “AC not cooling, can someone come tomorrow?”",
          result: "Booked Wed 9:00 am, added to the CRM",
        },
        { time: "7:05 pm", event: "Invoice #2214 paid by card", result: "Matched in QuickBooks, receipt sent" },
        {
          time: "9:40 pm",
          event: "Quote follow-up due for 3 customers",
          result: "Reminders sent, 1 reply waiting for you",
        },
      ],
      done: "Done tonight without anyone at a desk",
    },
    story: {
      kind: "day",
      title: "Where an office manager's day goes",
      who: "Example: a 12-person company",
      tasks: [
        { label: "Answering the same questions", minutes: 100 },
        { label: "Copying leads into the CRM", minutes: 55 },
        { label: "Chasing unpaid invoices", minutes: 50 },
        { label: "Writing quotes by hand", minutes: 70 },
      ],
      afterMinutes: 20,
      after: "The repeat work runs by itself, and the day goes back to the work you're paid for.",
    },
  },
};
