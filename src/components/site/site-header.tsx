"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Cta } from "@/brands/types";
import { NAV } from "@/content/pages";
import { CtaLink } from "./cta-link";

/**
 * Floats over each page's dark top; once the page scrolls it becomes a frosted bar so it stays readable over any
 * section. On phones the links sit behind a Menu button.
 */
export function SiteHeader({ name, mark, cta }: { name: string; mark: React.ReactNode; cta: Cta }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div
        className={`mx-auto max-w-6xl rounded-[1.6rem] px-4 py-2 text-white transition-all duration-500 md:px-5 ${
          scrolled || open ? "bg-night/80 shadow-lg ring-1 ring-white/10 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
            {mark}
            {name}
          </Link>
          <nav aria-label="Main" className="hidden gap-7 text-sm md:flex">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={current(l.href) ? "page" : undefined}
                className={`transition hover:text-white ${current(l.href) ? "text-white" : "text-white/70"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <CtaLink cta={cta} variant="primary" />
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="min-h-11 rounded-full border border-white/20 px-4 text-sm font-semibold md:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Main" className="grid gap-1 pt-3 pb-2 md:hidden">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={current(l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 sm:hidden">
              <CtaLink cta={cta} variant="primary" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
