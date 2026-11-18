import { ImageResponse } from "next/og";
import { BRANDS } from "@/brands";
import { BrandMark } from "@/components/site/brand-mark";
import { currentBrand } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** The browser tab icon: the brand mark. */
export default function Icon() {
  return new ImageResponse(<BrandMark brand={BRANDS[currentBrand()]} size={32} />, size);
}
