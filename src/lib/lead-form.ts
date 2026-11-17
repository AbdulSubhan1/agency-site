import { z } from "zod";
import { SERVICE_IDS } from "@/content/schema";

// The enquiry form's rules, shared by the browser (checks before sending) and the server action (checks again). Field
// names and values match the CRM's website API (agencydesk docs/10-website-api.md).

/** Which wording of the consent tick box the visitor saw. Change it whenever that text changes. */
export const CONSENT_TEXT_VERSION = "2026-11";

export const SERVICE_CHOICES = [...SERVICE_IDS, "not-sure"] as const;
export const BUDGET_BANDS = ["under_1k", "1k_5k", "5k_15k", "15k_plus", "not_sure"] as const;
export const TIMELINES = ["asap", "1_3_months", "3_plus_months", "exploring"] as const;

export const BUDGET_LABELS: Record<(typeof BUDGET_BANDS)[number], string> = {
  under_1k: "Under $1,000",
  "1k_5k": "$1,000–5,000",
  "5k_15k": "$5,000–15,000",
  "15k_plus": "Over $15,000",
  not_sure: "Not sure yet",
};

export const TIMELINE_LABELS: Record<(typeof TIMELINES)[number], string> = {
  asap: "As soon as possible",
  "1_3_months": "In 1–3 months",
  "3_plus_months": "Later this year",
  exploring: "Just exploring",
};

/** Calling codes the Asia form offers, and the region each one means. */
export const ASIA_CODES = [
  { code: "+971", region: "ae", label: "UAE +971" },
  { code: "+92", region: "pk", label: "Pakistan +92" },
] as const;

export const MESSAGES = {
  name: "Enter your name",
  email: "Enter an email like name@company.com",
  emailRequired: "Enter your work email so we can reply",
  phone: "Enter a phone number with its country code, like +1 512 555 0143",
  phoneRequired: "Enter your WhatsApp number",
  service: "Pick what you'd like help with",
  budgetBand: "Pick a budget, or Not sure yet",
  timeline: "Pick when you'd like to start",
  whatsappOptIn: "Tick this so we can message you on WhatsApp, or add an email below",
  message: "Keep the message under 2,000 characters",
} as const;

/**
 * A phone number in international form (+ and digits), or "" when nothing was typed. Spaces, dashes and brackets are
 * dropped; a leading 0 after a chosen calling code is dropped too (0300… → +92300…). A 10-digit US number gets +1.
 */
export function normalizePhone(raw: string, callingCode?: string): string {
  const digits = raw.replace(/[\s\-().]/g, "");
  if (!digits) return "";
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  if (callingCode) return `${callingCode}${digits.replace(/^0+/, "")}`;
  if (/^\d{10}$/.test(digits)) return `+1${digits}`;
  return digits;
}

const E164 = /^\+[1-9]\d{7,14}$/;

const text = (max: number) => z.string().trim().max(max).default("");

const base = {
  name: z.string().trim().min(2, MESSAGES.name).max(80, MESSAGES.name),
  company: text(120),
  message: z.string().trim().max(2000, MESSAGES.message).default(""),
  service: z.enum(SERVICE_CHOICES, { error: MESSAGES.service }),
  timeline: z.enum(TIMELINES, { error: MESSAGES.timeline }),
};

const optionalEmail = z.union([z.literal(""), z.email(MESSAGES.email)]).default("");

/** US form: email is the main channel; phone is optional. */
export const usLeadSchema = z.object({
  ...base,
  budgetBand: z.enum(BUDGET_BANDS, { error: MESSAGES.budgetBand }),
  email: z.string().trim().min(1, MESSAGES.emailRequired).pipe(z.email(MESSAGES.email)),
  phone: z
    .string()
    .trim()
    .default("")
    .transform((v) => normalizePhone(v))
    .refine((v) => v === "" || E164.test(v), MESSAGES.phone),
});

/** Asia form: WhatsApp first. The number is required; email is optional unless they don't tick WhatsApp. */
export const asiaLeadSchema = z
  .object({
    ...base,
    callingCode: z.enum(ASIA_CODES.map((c) => c.code) as ["+971", "+92"]).default("+971"),
    phone: z.string().trim().min(1, MESSAGES.phoneRequired),
    email: optionalEmail,
    whatsappOptIn: z
      .union([z.literal("on"), z.literal("true"), z.literal(""), z.boolean()])
      .default("")
      .transform((v) => v === true || v === "on" || v === "true"),
  })
  .transform((v) => ({ ...v, phone: normalizePhone(v.phone, v.callingCode) }))
  .superRefine((v, ctx) => {
    if (!E164.test(v.phone)) ctx.addIssue({ code: "custom", path: ["phone"], message: MESSAGES.phone });
    if (!v.whatsappOptIn && !v.email)
      ctx.addIssue({ code: "custom", path: ["whatsappOptIn"], message: MESSAGES.whatsappOptIn });
  });

export type FieldErrors = Partial<Record<string, string>>;

/** The first message per field, in the order the fields appear. */
export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

/** What the form shows after a send: field errors to fix, a general problem, or the reference of the saved enquiry. */
export type FormState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "failed"; message: string }
  | { status: "sent"; reference: string; name: string };
