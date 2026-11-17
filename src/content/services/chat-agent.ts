import type { Service } from "../schema";

export const chatAgent: Service = {
  id: "chat-agent",
  name: "AI Chat Assistant",
  summary: "An assistant that knows your business answers customers on your website and WhatsApp, around the clock.",
  deliverables: [
    "An assistant trained on your services, prices and common questions",
    "On your website and on WhatsApp Business",
    "Captures and books leads, and hands complex questions to your team",
    "A monthly review of conversations, with fixes to what it got wrong",
  ],
  steps: [
    { title: "Collect your content", detail: "Services, prices, policies and the questions customers ask most." },
    { title: "Build and train", detail: "Your assistant, in your tone, with clear rules on what it may say." },
    { title: "Test chats", detail: "We try to trip it up before your customers can." },
    { title: "Launch", detail: "On your website and WhatsApp, with a person one tap away." },
    { title: "Monthly tune-up", detail: "We read the conversations and improve the answers." },
  ],
  timeline: "1–2 weeks",
  outcome: "Customers get answers 24/7, and your team stops answering the same questions all day.",
  price: {
    us: { setup: { min: 500 }, monthly: { min: 297, max: 997 }, note: "You pay message and AI usage costs" },
    ae: { setup: { min: 1500 }, monthly: { min: 1000, max: 2500 }, note: "You pay message and AI usage costs" },
    pk: { setup: { min: 25000 }, monthly: { min: 25000, max: 60000 }, note: "You pay message and AI usage costs" },
  },
};
