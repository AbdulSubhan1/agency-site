import type { BrandId } from "@/lib/brand";
import type { Service } from "../schema";
import { DEVXONIC_SERVICES } from "./devxonic";
import { RADIANZEST_SERVICES } from "./radianzest";

/** Each brand's own services, in the order its pages show them. */
export const SERVICES: Record<BrandId, Service[]> = {
  asia: DEVXONIC_SERVICES,
  us: RADIANZEST_SERVICES,
};
