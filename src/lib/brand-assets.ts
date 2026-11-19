import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { LOGOS } from "@/components/site/brand-mark";
import type { BrandId } from "@/lib/brand";

/** A logo file as a data URL, for next/og images (they can't fetch a relative /brand/... path). */
export async function logoDataUrl(id: BrandId, kind: "logo" | "symbol"): Promise<string> {
  const file = await readFile(join(process.cwd(), "public", LOGOS[id][kind].src));
  return `data:image/png;base64,${file.toString("base64")}`;
}
