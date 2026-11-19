import type { BrandId } from "@/lib/brand";
import { DEVXONIC_HOME } from "./home-devxonic";
import { RADIANZEST_HOME } from "./home-radianzest";

// The Process, Capabilities and FAQ pages (brand masterplan, phase 5). Like the home pages, every line describes how
// we work; nothing names a client, a result or a number we can't show. Industries, Insights and Careers wait until
// there is real work, real articles and real openings to put in them. Written in US spelling; siteContent() spells it
// for the brand.

type Step = { title: string; detail: string; get: readonly string[]; need: readonly string[] };
type Item = { title: string; text: string };
type Link = { href: string; label: string };
export type FaqGroup = { title: string; items: readonly { q: string; a: string; link?: Link }[] };

export type CompanyContent = {
  process: { title: string; lead: string; get: string; need: string; steps: readonly Step[]; promises: Item[] };
  capabilities: {
    title: string;
    lead: string;
    stack: { title: string; text: string; all: string; groups: readonly { name: string; tools: readonly string[] }[] };
    practices: { title: string; items: readonly Item[] };
  };
  faq: { title: string; lead: string; groups: readonly FaqGroup[] };
};

const reply: Item = {
  title: "Answers within a working day",
  text: "Questions get a reply within one working day, from the people doing the work.",
};

const DEVXONIC: CompanyContent = {
  process: {
    title: "How a project runs",
    lead: "Four steps, the same for every project, so you always know what happens next and what it costs.",
    get: "You get",
    need: "We need from you",
    steps: [
      {
        ...DEVXONIC_HOME.process.steps[0],
        get: ["A written scope: what we build first and what comes later", "A fixed price and an agreed timeline"],
        need: ["A call about how the work runs today", "Access to the tools you already use, if we connect to them"],
      },
      {
        ...DEVXONIC_HOME.process.steps[1],
        get: [
          "User flows and screens for the main tasks",
          "A clickable prototype where it helps",
          "The data model, written down",
        ],
        need: ["Feedback on the screens before any code is written"],
      },
      {
        ...DEVXONIC_HOME.process.steps[2],
        get: [
          "Working releases you can use and test as we go",
          "The code in your own repository, tested on every change",
        ],
        need: ["Trying each release and telling us what feels wrong"],
      },
      {
        ...DEVXONIC_HOME.process.steps[3],
        get: [
          "A walkthrough with your team and written guides",
          "Hosting, monitoring and backups on your accounts",
          "The same people as your contact as it grows",
        ],
        need: ["Telling us what to improve next"],
      },
    ],
    promises: [
      {
        title: "A price that holds",
        text: "The price in your scope is the price. Anything added is agreed, with its cost, in writing first.",
      },
      {
        title: "Progress you can try",
        text: "You get working software to use during the build, not a big reveal at the end.",
      },
      reply,
    ],
  },
  capabilities: {
    title: "Capabilities",
    lead: "The tools we build with and the practices behind every project.",
    stack: DEVXONIC_HOME.stack,
    practices: DEVXONIC_HOME.values,
  },
  faq: {
    title: "Questions and answers",
    lead: "What clients ask before and during a project. If yours isn't here, ask us directly.",
    groups: [
      {
        title: "Price and scope",
        items: [
          DEVXONIC_HOME.faq.items[1],
          {
            q: "How long does a project take?",
            a: "It depends on the scope. The timeline is agreed in your written scope, next to the price, before any work starts.",
          },
          {
            q: "What if we want changes during the project?",
            a: "We agree the change, its cost and its effect on the timeline in writing before doing it.",
            link: { href: "/process", label: "How a project runs" },
          },
        ],
      },
      {
        title: "Ownership",
        items: [
          DEVXONIC_HOME.faq.items[2],
          {
            q: "What happens if we stop working together?",
            a: "Everything keeps running. The code, accounts and data are already yours, and a handover guide lets another developer pick it up.",
          },
        ],
      },
      {
        title: "Working together",
        items: [
          DEVXONIC_HOME.faq.items[3],
          {
            q: "What do you need from us to start?",
            a: "A few lines about what you want to build and why now. We reply within one working day with questions or a time for a call.",
            link: { href: "/contact", label: "Start a project" },
          },
          DEVXONIC_HOME.faq.items[5],
        ],
      },
      {
        title: "Services",
        items: [
          { ...DEVXONIC_HOME.faq.items[0], link: { href: "/services", label: "All services" } },
          { ...DEVXONIC_HOME.faq.items[4], link: { href: "/services/integrations", label: "API integrations" } },
          {
            q: "Do you build AI features?",
            a: "Yes, where they help: AI that reads documents, answers questions or drafts work, with a person approving what matters. We also tell you where AI won't help.",
            link: { href: "/services/ai", label: "AI and intelligent systems" },
          },
        ],
      },
    ],
  },
};

const RADIANZEST: CompanyContent = {
  process: {
    title: "How a project runs",
    lead: "Four steps, the same for every project, so you always know what happens next and what it costs.",
    get: "You get",
    need: "We need from you",
    steps: [
      {
        ...RADIANZEST_HOME.process.steps[0],
        get: ["A look at your market, your buyers and your current site", "A written plan with a fixed price"],
        need: ["A call about your goals and your customers", "Access to your website, analytics and accounts"],
      },
      {
        ...RADIANZEST_HOME.process.steps[1],
        get: ["Designs and pages reviewed with you before launch", "Everything made on your own accounts"],
        need: ["Feedback on designs and copy", "The facts only you know: your services, service areas and offers"],
      },
      {
        ...RADIANZEST_HOME.process.steps[2],
        get: ["A check of how visitors use what we launched", "Fixes for whatever slows them down"],
        need: ["Your view on which enquiries were good ones"],
      },
      {
        ...RADIANZEST_HOME.process.steps[3],
        get: ["A review of what moved, with the numbers", "The next round, agreed together"],
        need: ["Time for a short review call"],
      },
    ],
    promises: [
      {
        title: "A price that holds",
        text: "The price in your plan is the price. Anything added is agreed, with its cost, in writing first.",
      },
      {
        title: "Work you can see early",
        text: "You see designs and pages as they are made, not a big reveal at the end.",
      },
      reply,
    ],
  },
  capabilities: {
    title: "Capabilities",
    lead: "The tools we work with and the standards every website and campaign is held to.",
    stack: {
      title: "The tools behind the work",
      text: "Tools we have shipped real websites with. Using a tool is not a partnership with its maker.",
      all: "All",
      groups: [
        { name: "Design and build", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"] },
        { name: "Search", tools: ["Google Search Console", "Schema.org structured data", "XML sitemaps"] },
        { name: "Data", tools: ["PostgreSQL", "Neon"] },
        { name: "Hosting", tools: ["Vercel", "GitHub Actions"] },
        { name: "Testing", tools: ["Playwright", "Vitest"] },
      ],
    },
    practices: {
      title: "Standards on every page",
      items: [
        {
          title: "Accessibility",
          text: "Readable contrast, keyboard access and clear forms, checked on every page.",
        },
        { title: "Speed", text: "Pages built to load fast on phones, and checked before launch." },
        {
          title: "Honest search work",
          text: "Structure and content search engines understand, with no promise of rankings.",
        },
        {
          title: "Privacy-friendly tracking",
          text: "Only the tracking you need, with consent where it is required.",
        },
      ],
    },
  },
  faq: {
    title: "Questions and answers",
    lead: "What clients ask before and during a project. If yours isn't here, ask us directly.",
    groups: [
      {
        title: "Price and scope",
        items: [
          RADIANZEST_HOME.faq.items[0],
          {
            q: "How long does a project take?",
            a: "It depends on the scope. The timeline is agreed in your written plan, next to the price, before any work starts.",
          },
          {
            q: "What if we want changes during the project?",
            a: "We agree the change, its cost and its effect on the timeline in writing before doing it.",
            link: { href: "/process", label: "How a project runs" },
          },
        ],
      },
      {
        title: "Ownership",
        items: [
          RADIANZEST_HOME.faq.items[2],
          {
            q: "What happens if we stop working together?",
            a: "Your site keeps running. The website, design files, domain and accounts are already in your name.",
          },
        ],
      },
      {
        title: "Working together",
        items: [
          RADIANZEST_HOME.faq.items[3],
          {
            q: "What do you need from us to start?",
            a: "A few lines about your goals and why now. We reply within one working day with questions or a time for a call.",
            link: { href: "/contact", label: "Start a project" },
          },
          RADIANZEST_HOME.faq.items[5],
        ],
      },
      {
        title: "Services",
        items: [
          { ...RADIANZEST_HOME.faq.items[1], link: { href: "/services/seo", label: "SEO, AEO and GEO" } },
          {
            ...RADIANZEST_HOME.faq.items[4],
            link: { href: "/services/websites", label: "Website design and development" },
          },
          {
            q: "Do you set up CRMs and follow-ups too?",
            a: "Yes. New leads go to the right person straight away, and follow-up emails and reminders run by themselves.",
            link: { href: "/services/automation", label: "CRM and marketing automation" },
          },
        ],
      },
    ],
  },
};

export const COMPANY: Record<BrandId, CompanyContent> = { asia: DEVXONIC, us: RADIANZEST };
