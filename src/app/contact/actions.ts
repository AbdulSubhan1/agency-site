"use server";

import { BRANDS } from "@/brands";
import { sendLead } from "@/lib/agencydesk";
import { currentBrand } from "@/lib/brand";
import {
  ASIA_CODES,
  asiaLeadSchema,
  CONSENT_TEXT_VERSION,
  fieldErrors,
  type FormState,
  usLeadSchema,
} from "@/lib/lead-form";

const FAILED = "We couldn't send your message just now. Please try again in a minute.";
const RATE_LIMITED = "You've sent a few messages this hour. Please try again later.";
const CHECK = "Check this and send again";

/** A page path the visitor came from, or the contact page. Never a full URL from another site. */
function pagePath(value: FormDataEntryValue | null): string {
  const path = typeof value === "string" ? value : "";
  return /^\/[\w\-/]*$/.test(path) && path.length <= 200 ? path : "/contact";
}

/** Checks the form again on the server, then sends it to AgencyDesk with this site's brand and region. */
export async function submitLead(_prev: FormState, formData: FormData): Promise<FormState> {
  const brandId = currentBrand();
  const brand = BRANDS[brandId];
  const input = Object.fromEntries(formData);
  const common = {
    brand: brandId,
    sourcePage: pagePath(formData.get("sourcePage")),
    timeZone: String(formData.get("timeZone") ?? "").slice(0, 64),
    consentTextVersion: CONSENT_TEXT_VERSION,
  };

  let body;
  if (brand.id === "us") {
    const parsed = usLeadSchema.safeParse(input);
    if (!parsed.success) return { status: "invalid", errors: fieldErrors(parsed.error) };
    const v = parsed.data;
    body = { ...common, ...pick(v), region: "us" as const, budgetBand: v.budgetBand, whatsappOptIn: false };
  } else {
    const parsed = asiaLeadSchema.safeParse(input);
    if (!parsed.success) return { status: "invalid", errors: fieldErrors(parsed.error) };
    const v = parsed.data;
    const region = ASIA_CODES.find((c) => c.code === v.callingCode)?.region ?? "ae";
    // The short WhatsApp form doesn't ask about budget
    body = { ...common, ...pick(v), region, budgetBand: "not_sure", whatsappOptIn: v.whatsappOptIn };
  }

  const result = await sendLead(body);
  if (result.ok) return { status: "sent", reference: result.reference, name: body.name };
  if (result.reason === "rate_limited") return { status: "failed", message: RATE_LIMITED };
  if (result.reason === "invalid" && result.field) return { status: "invalid", errors: { [result.field]: CHECK } };
  return { status: "failed", message: FAILED };
}

function pick(v: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  service: string;
  timeline: string;
}) {
  return {
    name: v.name,
    email: v.email,
    phone: v.phone,
    company: v.company,
    message: v.message,
    service: v.service,
    timeline: v.timeline,
  };
}
