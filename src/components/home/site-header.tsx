"use client";

import { useEffect, useState } from "react";
import type { Cta } from "@/brands/types";
import { CtaLink } from "./cta-link";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How it works" },
  { href: "#contact", label: "Contact" },
];

/** Floats over the hero; once the page scrolls it becomes a frosted bar so it stays readable over any section. */
export function SiteHeader({ name, cta }: { name: string; cta: Cta }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2 text-white transition-all duration-500 md:px-5 ${
          scrolled ? "bg-night/75 shadow-lg ring-1 ring-white/10 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {name}
        </a>
        <nav aria-label="Main" className="hidden gap-7 text-sm text-white/75 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="scale-90 md:scale-100">
          <CtaLink cta={cta} variant="primary" />
        </div>
      </div>
    </header>
  );
}
