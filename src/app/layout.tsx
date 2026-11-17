import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans, Schibsted_Grotesk } from "next/font/google";
import { BRANDS } from "@/brands";
import { currentBrand } from "@/lib/brand";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--ff-text", display: "swap" });

const DISPLAY = { bricolage, schibsted };

export const metadata: Metadata = {
  title: "AI automation agency",
  description: "We help businesses streamline their processes with AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { theme } = BRANDS[currentBrand()];
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
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
