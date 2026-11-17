// The visitor's IP, sent to the CRM, which allows 5 enquiries per visitor per hour. On Vercel the platform sets
// x-forwarded-for; its first address is the visitor.

export const UNKNOWN_IP = "unknown";

/** The first x-forwarded-for address, else x-real-ip, else "unknown". */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  return headers.get("x-real-ip")?.trim() || UNKNOWN_IP;
}
