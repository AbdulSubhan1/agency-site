import type { Brand } from "@/brands/types";
import { spell } from "@/lib/spelling";
import { DEVXONIC_HOME } from "./home-devxonic";
import { RADIANZEST_HOME } from "./home-radianzest";
import { SERVICES } from "./services";

/** Every string in a value, spelt for the brand. */
function spellAll<T>(value: T, locale: Brand["locale"]): T {
  if (typeof value === "string") return spell(value, locale) as T;
  if (Array.isArray(value)) return value.map((v) => spellAll(v, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, spellAll(v, locale)])) as T;
  }
  return value;
}

/** What one brand shows: its services in its own order and spelling, and the project steps its pages walk through. */
export function siteContent(brand: Brand) {
  const process = brand.id === "asia" ? DEVXONIC_HOME.process : RADIANZEST_HOME.process;
  return { brand, services: spellAll(SERVICES[brand.id], brand.locale), steps: process.steps };
}
