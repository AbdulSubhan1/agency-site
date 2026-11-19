import { ImageResponse } from "next/og";
import { BRANDS } from "@/brands";
import { LOGOS } from "@/components/site/brand-mark";
import { logoDataUrl } from "@/lib/brand-assets";
import { currentBrand } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** The browser tab icon: the brand symbol on a dark tile, since the symbol is drawn for dark backgrounds. */
export default async function Icon() {
  const brand = BRANDS[currentBrand()];
  const { symbol } = LOGOS[brand.id];
  const h = 22;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        background: brand.theme.night,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og draws plain img only */}
      <img src={await logoDataUrl(brand.id, "symbol")} alt="" height={h} width={(h * symbol.width) / symbol.height} />
    </div>,
    size,
  );
}
