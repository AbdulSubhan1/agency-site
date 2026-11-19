import type { Metadata } from "next";
import { Inter, Manrope, Sora, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { BRANDS } from "@/brands";
import { BrandLogo } from "@/components/site/brand-mark";
import { ScrollRefresh } from "@/components/site/scroll-refresh";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { HOME } from "@/content/home";
import { currentBrand } from "@/lib/brand";
import { PULSE_URL } from "@/lib/pulse";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--ff-text", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--ff-text", display: "swap" });

const DISPLAY = { "space-grotesk": spaceGrotesk, sora };
const TEXT = { inter, manrope };

export function generateMetadata(): Metadata {
  const brand = BRANDS[currentBrand()];
  return {
    metadataBase: siteUrl(),
    title: { default: `${brand.name}: AI automation for your business`, template: `%s | ${brand.name}` },
    description: brand.positioning,
    openGraph: { siteName: brand.name, type: "website", locale: brand.locale.replace("-", "_") },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const brand = BRANDS[currentBrand()];
  const { theme, hero } = brand;
  // Pulse (github.com/AbdulSubhan1/monitor) needs each site registered with its live URL, so it's off until set
  const pulseProject = process.env.NEXT_PUBLIC_PULSE_PROJECT?.trim();
  // The brand's colours become CSS variables, so globals.css and every component read one source
  const vars = {
    "--brand": theme.brand,
    "--glow": theme.glow,
    "--accent": theme.accent,
    "--night": theme.night,
    "--paper": theme.paper,
    "--ink": theme.ink,
  } as React.CSSProperties;
  return (
    <html
      lang="en"
      className={`${DISPLAY[theme.display].variable} ${TEXT[theme.text].variable} h-full antialiased`}
      style={vars}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader
          logo={<BrandLogo brand={brand} height={brand.id === "asia" ? 34 : 28} />}
          cta={{ ...hero.primary, label: HOME.headerCta[hero.primary.kind] }}
        />
        <main id="top" className="flex-1">
          {children}
        </main>
        <SiteFooter logo={<BrandLogo brand={brand} height={brand.id === "asia" ? 44 : 36} />} />
        <ScrollRefresh />
        {pulseProject && (
          <Script src={`${PULSE_URL}/beacon.js`} data-project={pulseProject} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
