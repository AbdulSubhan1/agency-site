import { ImageResponse } from "next/og";
import { BRANDS } from "@/brands";
import { BrandMark } from "@/components/site/brand-mark";
import { currentBrand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The home-screen icon, also the logo in the structured data (src/lib/structured-data.ts). */
export default function AppleIcon() {
  return new ImageResponse(<BrandMark brand={BRANDS[currentBrand()]} size={180} square />, size);
}
