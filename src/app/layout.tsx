import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import { BRANDS } from "@/brands";
import { BrandMark } from "@/components/site/brand-mark";
import { ScrollRefresh } from "@/components/site/scroll-refresh";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { HOME } from "@/content/home";
import { currentBrand } from "@/lib/brand";
import { PULSE_URL } from "@/lib/pulse";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--ff-text", display: "swap" });

const DISPLAY = { bricolage, schibsted };

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
      className={`${DISPLAY[theme.display].variable} ${publicSans.variable} h-full antialiased`}
      style={vars}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader
          name={brand.name}
          mark={<BrandMark brand={brand} size={30} />}
          cta={{ ...hero.primary, label: HOME.headerCta[hero.primary.kind] }}
        />
        <main id="top" className="flex-1">
          {children}
        </main>
        <SiteFooter name={brand.name} />
        <ScrollRefresh />
        {pulseProject && (
          <Script src={`${PULSE_URL}/beacon.js`} data-project={pulseProject} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
