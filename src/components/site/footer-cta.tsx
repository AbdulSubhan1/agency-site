"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES } from "@/content/pages";
import { ctaClass } from "./cta-link";

// These pages already end with their own call to action (or are the form itself), so the footer doesn't repeat it
const OWN_CTA = (path: string) =>
  path === "/" || path === "/about" || path === "/contact" || path.startsWith("/services/");

/** The footer's big "start a project" band, on the pages that don't close with one of their own. */
export function FooterCta({ headline, text }: { headline: string; text: string }) {
  const pathname = usePathname();
  if (OWN_CTA(pathname)) return null;
  return (
    <div className="relative isolate overflow-hidden border-b border-white/10">
      <div className="aurora absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="max-w-4xl font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance text-white">
          {headline}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-mist">{text}</p>
        <Link href="/contact" data-pulse-event="cta_start_project" className={`mt-9 ${ctaClass("primary")}`}>
          {PAGES.shell.start}
        </Link>
      </div>
    </div>
  );
}
