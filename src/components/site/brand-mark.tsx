import type { Brand } from "@/brands/types";

// Each brand's square mark, drawn in plain SVG so the same shapes render in the header, the favicon, the home-screen
// icon and the share image (next/og draws SVG too). Radianzest: an R whose leg radiates out in the accent colour.
// Devxonic: two code brackets meeting as an X.

type Props = {
  brand: Pick<Brand, "id" | "theme">;
  size: number;
  /** Home-screen icons get square corners; the OS rounds them. */
  square?: boolean;
};

export function BrandMark({ brand, size, square }: Props) {
  const { theme } = brand;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ display: "block" }}>
      <rect width="32" height="32" rx={square ? 0 : 8} fill={theme.brand} />
      {brand.id === "us" ? (
        <>
          <path
            d="M11 24V8H16.5A5 5 0 0 1 16.5 18H11"
            fill="none"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16.5 18L22.5 24" fill="none" stroke={theme.accent} strokeWidth="3.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path
            d="M8.5 9L16 16L8.5 23"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.5 9L16 16L23.5 23"
            fill="none"
            stroke={theme.accent}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
