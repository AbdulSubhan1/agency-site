// DevXonic's home page: a full-service software company (brand masterplan, section 12). Every line describes how we
// work or what we build; nothing here claims a client, a result or a number we can't show. "Selected work" and
// "Insights" wait until there are real projects and articles to put in them.

import type { FlowStory, GraphVisual } from "./examples";

export const DEVXONIC_HOME = {
  graph: {
    hub: "Your product",
    nodes: ["Web app", "Mobile app", "APIs", "Database", "AI models", "Cloud"],
  } satisfies GraphVisual,
  /** Short system events for the hero graph's toasts: a picture of software at work, not results from a client. */
  heroEvents: ["Tests passed", "Release deployed", "Orders synced to the CRM", "Nightly backup complete"],
  proof: {
    title: "Engineering you can verify",
    items: [
      {
        title: "Scope and price before we build",
        text: "Every project starts with a written scope and a fixed price. Changes are agreed in writing first.",
      },
      {
        title: "Your code, your accounts",
        text: "We work in your repositories and on your accounts, so you own everything from day one.",
      },
      {
        title: "Tested on every change",
        text: "Type checks and automated tests run before anything reaches your users.",
      },
      {
        title: "The builders stay your contact",
        text: "The people who build your software are the people you talk to, before and after launch.",
      },
    ],
  },
  services: {
    title: "What we build",
    text: "One engineering partner. Every major capability your product needs.",
    cta: "Talk to us about your project",
  },
  process: {
    title: "From requirements to reliable systems",
    steps: [
      {
        title: "Discover",
        detail: "We learn how the work moves today and agree what to build first, with a written scope and price.",
      },
      { title: "Design", detail: "Flows, screens and the data model, reviewed with you before code starts." },
      { title: "Build", detail: "Working software in short rounds on your own accounts, tested on every change." },
      {
        title: "Improve",
        detail: "After launch you get guides and a walkthrough, and we stay your contact as it grows.",
      },
    ],
  },
  stack: {
    title: "The right tools for the problem",
    text: "Tools we have shipped production software with. Using a tool is not a partnership with its maker.",
    all: "All",
    groups: [
      { name: "Frontend", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"] },
      { name: "Backend", tools: ["Node.js", "Next.js server actions", "Zod", "Auth.js", "JWT"] },
      { name: "Data", tools: ["PostgreSQL", "Neon", "Drizzle ORM", "Redis", "PGlite"] },
      { name: "AI", tools: ["Vercel AI SDK", "OpenAI", "Anthropic Claude", "Google Gemini", "Groq", "Tesseract OCR"] },
      { name: "Cloud", tools: ["Vercel", "GitHub Actions"] },
      { name: "Testing", tools: ["Playwright", "Vitest"] },
    ],
  },
  story: {
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
  } satisfies FlowStory,
  values: {
    title: "Software is more than a launch",
    items: [
      {
        title: "Security",
        text: "Secrets stay on the server, every form is checked on both sides, and calls between systems are signed.",
      },
      {
        title: "Maintainability",
        text: "Typed code and written notes on every important decision, so another developer can pick it up.",
      },
      {
        title: "Ownership",
        text: "Your repositories, your accounts, your data. Nothing stops working if we part ways.",
      },
      {
        title: "Testing",
        text: "Automated tests and type checks run on every change, before it reaches your users.",
      },
    ],
  },
  team: { title: "Meet the people building it", link: "About DevXonic" },
  faq: {
    title: "Questions worth answering",
    items: [
      {
        q: "What kind of projects do you take on?",
        a: "Custom software, web and mobile apps, integrations, AI features and automation, for startups and growing businesses. If a project is outside what we do well, we tell you.",
      },
      {
        q: "How is a project priced?",
        a: "Each project gets a written scope and a fixed price before work starts. If something changes, we agree it in writing first.",
      },
      {
        q: "Who owns the code?",
        a: "You do. We work in your repositories and on your accounts from the first day.",
      },
      {
        q: "Who will I be talking to?",
        a: "The people who build your software. There is no account manager in between.",
      },
      {
        q: "Can you work with the systems we already use?",
        a: "Usually, yes. We connect to your tools through their official APIs, and if an integration isn't possible we tell you before quoting.",
      },
      {
        q: "What happens after launch?",
        a: "You get a walkthrough and written guides, and we stay your contact as the product grows.",
      },
    ],
  },
  cta: {
    title: "Tell us what you are building",
    text: "We will start with the scope, not the sales pitch.",
  },
} as const;
