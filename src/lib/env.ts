import "server-only";
import { z } from "zod";

const envSchema = z.object({
  AGENCYDESK_API_URL: z.url("must be a URL like http://localhost:3070"),
  WEBSITE_SECRET: z.string().min(16, "is required (the same value as this brand's secret in AgencyDesk)"),
});

export type Env = z.infer<typeof envSchema>;

/** Reads the server env on first use (not at import, so `next build` works without it); null when it isn't set up. */
export function crmEnv(): Env | null {
  const parsed = envSchema.safeParse({
    AGENCYDESK_API_URL: process.env.AGENCYDESK_API_URL,
    WEBSITE_SECRET: process.env.WEBSITE_SECRET,
  });
  if (!parsed.success) {
    const problems = parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ");
    console.error(`The enquiry form can't reach the CRM: ${problems}. See .env.example.`);
    return null;
  }
  return parsed.data;
}

/** A booking page (e.g. Cal.com) shown after a US enquiry is sent; optional. */
export function bookingUrl(): string | null {
  const url = process.env.BOOKING_URL?.trim();
  return url && URL.canParse(url) ? url : null;
}
