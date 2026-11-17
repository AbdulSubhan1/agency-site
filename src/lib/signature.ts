import { createHmac } from "node:crypto";

// Request signing shared with AgencyDesk's server/website/signature.ts. Both sides must agree byte for byte:
// signature = lowercase hex HMAC-SHA256(secret, `${timestamp}.${METHOD}.${pathAndQuery}.${rawBody}`).

export const SITE_HEADER = "x-agency-site";
export const TIMESTAMP_HEADER = "x-agency-timestamp";
export const SIGNATURE_HEADER = "x-agency-signature";
export const CLIENT_IP_HEADER = "x-agency-client-ip";

export function signRequest(secret: string, ts: number, method: string, pathAndQuery: string, body: string): string {
  return createHmac("sha256", secret).update(`${ts}.${method.toUpperCase()}.${pathAndQuery}.${body}`).digest("hex");
}
