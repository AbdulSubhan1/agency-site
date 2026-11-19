import Image from "next/image";
import type { BrandId } from "@/lib/brand";

// Each brand's own logo, cut from the owner's artwork into white-on-transparent PNGs (public/brand/<id>/) for dark
// surfaces. The full logo sits in the header and footer; the symbol alone is the favicon, home-screen icon and the
// share-image mark (src/lib/brand-assets.ts reads it for next/og).

type Asset = { src: string; width: number; height: number };

export const LOGOS: Record<BrandId, { logo: Asset; symbol: Asset }> = {
  us: {
    logo: { src: "/brand/us/logo.png", width: 1339, height: 260 },
    symbol: { src: "/brand/us/symbol.png", width: 228, height: 256 },
  },
  asia: {
    logo: { src: "/brand/asia/logo.png", width: 507, height: 117 },
    symbol: { src: "/brand/asia/symbol.png", width: 116, height: 117 },
  },
};

/** The full logo at a given height; its alt text is the brand name, so a link around it needs no other label. */
export function BrandLogo({ brand, height }: { brand: { id: BrandId; name: string }; height: number }) {
  const { logo } = LOGOS[brand.id];
  return (
    <Image
      src={logo.src}
      alt={brand.name}
      width={Math.round((height * logo.width) / logo.height)}
      height={height}
      priority
    />
  );
}
