import type { BrandId } from "@/lib/brand";
import { asia } from "./asia";
import type { Brand } from "./types";
import { us } from "./us";

export const BRANDS: Record<BrandId, Brand> = { us, asia };
