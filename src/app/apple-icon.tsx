import { ImageResponse } from "next/og";
import { BRANDS } from "@/brands";
import { LOGOS } from "@/components/site/brand-mark";
import { logoDataUrl } from "@/lib/brand-assets";
import { currentBrand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * The home-screen icon, also the logo in the structured data (src/lib/structured-data.ts): the symbol on a square
 * dark tile (the OS rounds the corners).
 */
export default async function AppleIcon() {
  const brand = BRANDS[currentBrand()];
  const { symbol } = LOGOS[brand.id];
  const h = 112;
  const src = await logoDataUrl(brand.id, "symbol");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brand.theme.night,
      }}
    >
      <img src={src} alt="" height={h} width={(h * symbol.width) / symbol.height} />
    </div>,
    size,
  );
}
