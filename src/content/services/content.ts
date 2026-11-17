import type { Service } from "../schema";

export const content: Service = {
  id: "content",
  name: "AI Content System",
  summary: "One long piece becomes a month of posts, emails and articles, in your voice, with you approving each one.",
  deliverables: [
    "A brand voice guide the AI writes from",
    "A pipeline that turns one long piece into posts, emails and SEO drafts",
    "An approval step, so nothing goes out without your yes",
    "The first month run together with you",
  ],
  steps: [
    { title: "Voice guide", detail: "Your tone, words to use and words to avoid." },
    { title: "Build the pipeline", detail: "From one source piece to every channel you use." },
    { title: "First month together", detail: "We run it with you and tune the output." },
    { title: "Hand over", detail: "Your team runs it, or we keep running it monthly." },
  ],
  timeline: "2 weeks, then monthly",
  outcome: "Steady content every week, with far less of your own time.",
  price: {
    us: { setup: { min: 1500 }, monthly: { min: 500, max: 1500 } },
    ae: { monthly: { min: 1500 } },
    pk: { monthly: { min: 40000 } },
  },
};
