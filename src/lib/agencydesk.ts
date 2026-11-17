import "server-only";
import { headers as requestHeaders } from "next/headers";
import { z } from "zod";
import type { BrandId } from "./brand";
import { clientIpFrom, UNKNOWN_IP } from "./client-ip";
import { crmEnv } from "./env";
import { reportApiCall } from "./pulse";
import { CLIENT_IP_HEADER, SIGNATURE_HEADER, signRequest, SITE_HEADER, TIMESTAMP_HEADER } from "./signature";

// Signed server-to-server client for AgencyDesk's website API. The browser never sees the secret.

const PATH = "/api/website/v1/leads";
const TIMEOUT_MS = 8_000;

/** The body AgencyDesk accepts; it allows no other keys. */
export type LeadBody = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  brand: BrandId;
  region: "us" | "ae" | "pk";
  service: string;
  budgetBand: string;
  timeline: string;
  sourcePage: string;
  timeZone: string;
  whatsappOptIn: boolean;
  consentTextVersion: string;
};

export type LeadResult =
  | { ok: true; reference: string }
  | { ok: false; reason: "invalid"; field?: string }
  | { ok: false; reason: "rate_limited" | "unavailable" };

const created = z.object({ reference: z.string() });
const failed = z.object({ error: z.object({ code: z.string(), field: z.string().optional() }) });

async function visitorIp(): Promise<string> {
  try {
    return clientIpFrom(await requestHeaders());
  } catch {
    return UNKNOWN_IP;
  }
}

/** Sends one enquiry. Never throws: anything but a saved lead or a field problem is "unavailable". */
export async function sendLead(body: LeadBody): Promise<LeadResult> {
  const env = crmEnv();
  if (!env) return { ok: false, reason: "unavailable" };
  const url = new URL(PATH, env.AGENCYDESK_API_URL);
  const raw = JSON.stringify(body);
  const ts = Math.floor(Date.now() / 1000);
  const started = performance.now();
  const report = (status: number | null, error?: string) =>
    reportApiCall({
      method: "POST",
      host: url.host,
      path: url.pathname,
      status,
      ms: Math.round(performance.now() - started),
      error,
    });

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        [SITE_HEADER]: body.brand,
        [TIMESTAMP_HEADER]: String(ts),
        [SIGNATURE_HEADER]: signRequest(env.WEBSITE_SECRET, ts, "POST", url.pathname, raw),
        [CLIENT_IP_HEADER]: await visitorIp(),
        "content-type": "application/json",
        accept: "application/json",
      },
      body: raw,
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    report(res.status);
  } catch (err) {
    report(null, err instanceof Error ? `${err.name}: ${err.message}` : "fetch failed");
    return { ok: false, reason: "unavailable" };
  }

  const json: unknown = await res.json().catch(() => null);
  if (res.status === 201) {
    const ok = created.safeParse(json);
    return ok.success ? { ok: true, reference: ok.data.reference } : { ok: false, reason: "unavailable" };
  }
  if (res.status === 429) return { ok: false, reason: "rate_limited" };
  const err = failed.safeParse(json);
  if (res.status === 400 && err.success) return { ok: false, reason: "invalid", field: err.data.error.field };
  // 401/403/503 are setup problems on our side, not something the visitor can fix
  console.error(`AgencyDesk refused an enquiry: ${res.status} ${err.success ? err.data.error.code : ""}`);
  return { ok: false, reason: "unavailable" };
}
