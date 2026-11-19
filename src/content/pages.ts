// Copy for the pages other than home, shared by both brands. Brand-specific wording stays in src/brands/.

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
] as const;

export const PAGES = {
  services: {
    title: "Services",
    lead: "Every project starts with a short call, then a written scope and a fixed price. You own everything we build.",
    timeline: "Timeline",
    timelineValue: "Agreed in your written scope",
    deliverables: "What you get",
    steps: "How we do it",
    outcome: "The result",
    price: "Price",
    priceValue: "Custom quote after a short call",
    cta: "Ask about this",
    all: "All services",
  },
  about: {
    title: "Who you talk to",
    lead: "A small team of two. The people who scope your project are the people who build it, and they stay your contact after launch.",
    people: [
      {
        name: "Abdul Subhan",
        initials: "AS",
        role: "Engineering",
        text: "Builds the software, the integrations between your tools and the systems behind them.",
      },
      {
        name: "Osama",
        initials: "O",
        role: "Client work",
        text: "Runs the first calls and project reviews with you, and stays your contact after launch.",
      },
    ],
    principles: [
      {
        title: "Your accounts, your code",
        text: "We build on your own tools and accounts, so nothing stops working if we part ways.",
      },
      {
        title: "A price before we start",
        text: "Every project has a fixed scope and a clear price. Changes are agreed in writing first.",
      },
      {
        title: "Plain answers",
        text: "If something won't pay back for your business, we say so, even if it means a smaller project.",
      },
    ],
  },
  contact: {
    title: "Tell us what you need",
    lead: "We reply within one working day. No sales script: you talk to the people who would build it.",
    next: [
      {
        title: "You tell us the problem",
        text: "A few lines are enough: what you want to build or improve, and why now.",
      },
      {
        title: "We reply within a working day",
        text: "With questions, or a time for a short call to understand your goals.",
      },
      {
        title: "You get a plan and a price",
        text: "What we would do first, what it costs and how long it takes. No obligation.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    updated: "Last updated 17 November 2026",
    sections: [
      {
        title: "What we collect",
        text: "Only what you type into our contact form: your name, email, phone or WhatsApp number, company and message, the service you asked about, and your time zone so we contact you at a sensible hour. We also count page visits without cookies to see which pages help.",
      },
      {
        title: "What we use it for",
        text: "To answer your enquiry and, if we work together, to run the project. We never sell your details or add you to a mailing list.",
      },
      {
        title: "Where it goes",
        text: "Enquiries go straight to our own customer system. Only the two of us and any advisor answering your enquiry can see them.",
      },
      {
        title: "How long we keep it",
        text: "If we don't end up working together, your details are erased automatically after 24 months without contact. Clients' details are kept while we work together and for 24 months after.",
      },
      {
        title: "Your choices",
        text: "You can ask for a copy of what we hold about you, or for it to be erased, at any time. Reply to any message from us or use the contact form, and we act within 30 days.",
      },
    ],
  },
  terms: {
    title: "Terms",
    updated: "Last updated 17 November 2026",
    sections: [
      {
        title: "This website",
        text: "This site describes our services and lets you send us an enquiry. Prices shown are starting points; your quote is confirmed in writing before any work starts.",
      },
      {
        title: "Examples",
        text: "The businesses, numbers and chats in examples on this site are illustrations, not results from named clients.",
      },
      {
        title: "Projects",
        text: "Each project has its own written agreement covering scope, price, timeline and ownership. That agreement takes precedence over anything on this site.",
      },
    ],
  },
  notFound: {
    title: "This page doesn't exist",
    text: "It may have moved. These pages will get you going again.",
    home: "Home page",
  },
  shell: {
    start: "Start a project",
    services: "Services",
    allServices: "All services",
    company: "Company",
    legal: "Legal",
    menu: "Menu",
    close: "Close",
  },
  footer: {
    examples: "Examples on this site are illustrations, not client results.",
    privacy: "Privacy",
    terms: "Terms",
  },
} as const;
