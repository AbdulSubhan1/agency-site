import { ImageResponse } from "next/og";
import { BRANDS } from "@/brands";
import { LOGOS } from "@/components/site/brand-mark";
import { logoDataUrl } from "@/lib/brand-assets";
import { currentBrand } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AI automation for your business";

/** The preview shown when a page is shared: the brand's dark hero colours, its logo and its headline. */
export default async function OpenGraphImage() {
  const brand = BRANDS[currentBrand()];
  const { theme } = brand;
  const { logo } = LOGOS[brand.id];
  const logoHeight = 64;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "white",
        background: `radial-gradient(circle at 15% 20%, ${theme.glow}88, transparent 45%), radial-gradient(circle at 90% 10%, ${theme.accent}55, transparent 40%), ${theme.night}`,
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          src={await logoDataUrl(brand.id, "logo")}
          alt={brand.name}
          height={logoHeight}
          width={(logoHeight * logo.width) / logo.height}
        />
      </div>
      <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
        {brand.hero.headline}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
        <div style={{ width: 18, height: 18, background: theme.accent, transform: "rotate(45deg)" }} />
        <div style={{ color: "#ffffffcc" }}>{brand.hero.primary.label}</div>
      </div>
    </div>,
    size,
  );
}
