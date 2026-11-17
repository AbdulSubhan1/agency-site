import { z } from "zod";

// One codebase, two brands. Each Vercel project sets BRAND; the brand is fixed for the whole build.
export const BRAND_IDS = ["us", "asia"] as const;
export type BrandId = (typeof BRAND_IDS)[number];

const brandSchema = z.enum(BRAND_IDS);

/** The brand from BRAND (default "us" for local work); an unknown value fails the build instead of showing the wrong site. */
export function brandFrom(value: string | undefined): BrandId {
  if (value === undefined || value.trim() === "") return "us";
  const parsed = brandSchema.safeParse(value.trim());
  if (!parsed.success)
    throw new Error(`BRAND must be one of ${BRAND_IDS.join(", ")}, got "${value}". See .env.example.`);
  return parsed.data;
}

export function currentBrand(): BrandId {
  return brandFrom(process.env.BRAND);
}
