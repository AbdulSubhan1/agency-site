// Section copy for the home page that both brands share. The brand-specific parts (hero, examples) are in src/brands/.

export const HOME = {
  marquee: "Built for",
  /** Short labels for the header button, where the hero's full CTA text doesn't fit. */
  headerCta: { "book-call": "Book a call", whatsapp: "WhatsApp us", enquiry: "Get in touch" },
  feed: {
    title: "While you're off the clock",
    text: "Every enquiry, order and follow-up is handled the moment it arrives. You check the results in the morning.",
  },
  services: {
    title: "What we automate",
    text: "Each one starts with a fixed scope and a clear price. You own everything we build.",
  },
  process: {
    title: "How a project runs",
    steps: [
      { title: "We map the work", detail: "A call with you and your team. We find the tasks that pay back fastest." },
      { title: "We build it", detail: "On your own accounts, so every workflow is yours from day one." },
      {
        title: "You get the keys",
        detail: "A short video and a one-page guide for each workflow, and a walkthrough with your team.",
      },
    ],
  },
  cta: {
    title: "Tell us what slows your team down",
    text: "A short call, no slides. You leave with the first thing worth automating, even if you never hire us.",
  },
  example: "Example",
} as const;
