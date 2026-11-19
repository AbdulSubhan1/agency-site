// Radian Zest's home page: a US digital growth and technology agency (brand masterplan, section 13). Like DevXonic's,
// it claims nothing we can't show: featured stories, the work showcase, testimonials and insights wait until there
// are real projects, reviews and articles.

import type { Capability } from "./capability";
import type { FeedExample } from "./examples";

export const RADIANZEST_HOME = {
  /** The hero headline, one statement per line. */
  headline: ["Create attention.", "Earn trust.", "Build momentum."],
  proof: {
    title: "How we work with you",
    items: [
      {
        title: "A plan and a price first",
        text: "Every project starts with a written scope and a fixed price. Changes are agreed in writing first.",
      },
      {
        title: "Everything in your name",
        text: "Your website, design files, domain and accounts belong to you from day one.",
      },
      {
        title: "Plain answers",
        text: "If something won't pay back for your business, we say so, even if it means a smaller project.",
      },
      {
        title: "The makers stay your contact",
        text: "The people who design and build your work are the people you talk to, before and after launch.",
      },
    ],
  },
  services: {
    title: "What we can do for your business",
    text: "The right creative and technical services, working together.",
    cta: "Talk to us about your goals",
    items: [
      {
        id: "websites",
        icon: "web",
        name: "Website design and development",
        outcome: "A fast website that explains what you do and turns visitors into enquiries.",
        deliverables: "Site map, design, build, launch checklist",
      },
      {
        id: "branding",
        icon: "brand",
        name: "Brand identity and creative design",
        outcome: "A look and voice people recognize, used the same way everywhere.",
        deliverables: "Logo use, colors, type, brand guide",
      },
      {
        id: "seo",
        icon: "search",
        name: "SEO, AEO and GEO",
        outcome: "Pages search engines and AI answers can find, understand and quote.",
        deliverables: "Technical audit, page fixes, structured data",
      },
      {
        id: "marketing",
        icon: "megaphone",
        name: "Digital marketing and content",
        outcome: "Content that answers your buyers' real questions, published on a plan.",
        deliverables: "Content plan, articles, social posts",
      },
      {
        id: "conversion",
        icon: "target",
        name: "Conversion optimization",
        outcome: "More of your existing visitors becoming leads and customers.",
        deliverables: "Conversion audit, form and page changes",
      },
      {
        id: "automation",
        icon: "flow",
        name: "CRM and marketing automation",
        outcome: "Every lead answered fast, followed up, and tracked in one place.",
        deliverables: "CRM setup, lead routing, follow-ups",
      },
      {
        id: "strategy",
        icon: "compass",
        name: "Digital growth strategy",
        outcome: "A clear plan for which channels to use first, and why.",
        deliverables: "Channel plan, priorities, 90-day roadmap",
      },
      {
        id: "reporting",
        icon: "chart",
        name: "Marketing technology and reporting",
        outcome: "Reports that show where leads come from and what they turn into.",
        deliverables: "Tracking setup, dashboards, monthly review",
      },
    ] satisfies Capability[],
  },
  process: {
    title: "Strategy and craft, working together",
    steps: [
      {
        title: "Discover",
        detail: "We learn your market, your buyers and what you need most, then agree a plan and a price.",
      },
      { title: "Build", detail: "Design, website, content and tracking, made on your own accounts." },
      { title: "Optimize", detail: "We watch how visitors use what we launched and fix what slows them down." },
      { title: "Learn", detail: "We review what moved with you and decide the next round together." },
    ],
  },
  visibility: {
    title: "Be easier to find. Easier to choose.",
    text: "Search now includes AI answers. The work that helps is the same as ever: clear pages, sound structure and honest content.",
    items: [
      "Technical audit: speed, indexing, broken pages",
      "Page titles, descriptions and headings that match what people search",
      "Structured data that describes your business and services",
      "Pages that answer buyer questions directly, ready to be quoted",
      "Content plan built around your services",
      "Search Console set up and reviewed with you",
    ],
    note: "Nobody can honestly guarantee rankings or AI citations. We tell you what we change, then show you what moved.",
  },
  systems: {
    title: "Make every interaction count",
    text: "Your website, CRM and follow-ups connected, so no enquiry waits until morning.",
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
    } satisfies FeedExample,
  },
  faq: {
    title: "Before we begin",
    items: [
      {
        q: "How is a project priced?",
        a: "Every project gets a written scope and a fixed price before work starts. If something changes, we agree it in writing first.",
      },
      {
        q: "Can you guarantee rankings or AI citations?",
        a: "No, and be careful with anyone who does. We tell you what we will change, then report what moved.",
      },
      {
        q: "Who owns the website and brand files?",
        a: "You do. The site, the design files, the domain and every account are in your name.",
      },
      {
        q: "Who will I work with?",
        a: "The people doing the work. There is no account manager in between.",
      },
      {
        q: "Can you improve our current website instead of rebuilding it?",
        a: "Often, yes. We look at what you have first and tell you whether improving it beats starting over.",
      },
      {
        q: "What happens after launch?",
        a: "You get a walkthrough and written guides, and we stay your contact for the next round of improvements.",
      },
    ],
  },
  cta: {
    title: "Let's build what's next",
    text: "Tell us about your goals. You talk to the people who would build it.",
  },
} as const;
