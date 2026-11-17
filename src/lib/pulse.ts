import "server-only";
import { after } from "next/server";

// Pulse is a small monitor (github.com/AbdulSubhan1/monitor). The server reports every call it makes to the CRM, with
// this site's own token. Off until MONITOR_LOG_TOKEN is set, and it can never break a request: a 2-second timeout,
// every failure ignored, and calls reported after the response.

export const PULSE_URL = "https://abdulsubhan-pulse.vercel.app";
const TIMEOUT_MS = 2_000;

export type PulseApiCall = {
  method: string;
  host: string;
  path: string;
  // null when no response came back (timeout, network)
  status: number | null;
  ms: number;
  error?: string;
};

async function post(body: unknown): Promise<void> {
  const token = process.env.MONITOR_LOG_TOKEN?.trim();
  if (!token) return;
  try {
    await fetch(`${PULSE_URL}/api/calls`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    // Monitoring is best effort; the visitor's request matters more
  }
}

/** Reports one API call: route, status and time, never the body. Sent after the response when inside a request. */
export function reportApiCall(call: PulseApiCall): void {
  if (!process.env.MONITOR_LOG_TOKEN?.trim()) return;
  try {
    after(() => post(call));
  } catch {
    void post(call);
  }
}
