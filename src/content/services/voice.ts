import type { Service } from "../schema";

export const voice: Service = {
  id: "voice",
  name: "AI Voice Receptionist",
  summary: "AI answers the calls your team can't, books appointments and texts back every missed caller.",
  deliverables: [
    "AI that answers after-hours and overflow calls in a natural voice",
    "Appointment booking during the call",
    "A text back to every missed caller within a minute",
    "A summary of every call in your CRM",
  ],
  steps: [
    { title: "Design the call flow", detail: "What callers ask, what the AI may answer and when it transfers." },
    { title: "Voice and script", detail: "A voice and wording that fit your business." },
    { title: "Build", detail: "The receptionist, the booking and the CRM link." },
    { title: "Test calls", detail: "Dozens of test calls, including the awkward ones." },
    { title: "Go live and tune", detail: "We listen to real calls for two weeks and improve it." },
  ],
  timeline: "2–3 weeks",
  outcome: "No call goes unanswered, even at night or when your team is busy.",
  // Arabic and Urdu voice need more work, so the Asia brand offers it later
  price: {
    us: { setup: { min: 500 }, monthly: { min: 400, max: 900 }, note: "You pay call minutes" },
    ae: null,
    pk: null,
  },
};
