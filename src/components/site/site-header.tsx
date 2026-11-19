"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, PAGES } from "@/content/pages";
import { ctaClass } from "./cta-link";

export type NavService = { id: string; name: string; summary: string };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A floating glass bar over each page's dark top; once the page scrolls it fills in so it stays readable over any
 * section, and browsers without backdrop blur get a solid bar. Services open a solid panel listing every service
 * (blur inside the blurred bar would only blur the bar). On phones
 * everything sits in a full-screen menu that keeps focus inside, closes on Escape and stops the page scrolling behind.
 */
export function SiteHeader({ logo, services }: { logo: React.ReactNode; services: NavService[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Menus remember the page they were opened on, so moving to another page closes them without an effect
  const [menuOn, setMenuOn] = useState<string | null>(null);
  const [panelOn, setPanelOn] = useState<string | null>(null);
  const menuOpen = menuOn === pathname;
  const panelOpen = panelOn === pathname;

  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panelButton = useRef<HTMLButtonElement>(null);
  const panelWrap = useRef<HTMLDivElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-screen menu: the page behind doesn't scroll, focus starts on the first link
  useEffect(() => {
    if (!menuOpen) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNav.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      document.body.style.overflow = before;
    };
  }, [menuOpen]);

  // Escape closes whichever menu is open and hands focus back to its button; a click outside closes the panel
  useEffect(() => {
    if (!menuOpen && !panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOn(null);
        menuButton.current?.focus();
      } else {
        setPanelOn(null);
        panelButton.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (panelOpen && !panelWrap.current?.contains(e.target as Node)) setPanelOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen, panelOpen]);

  // Tab and Shift+Tab wrap around inside the open phone menu
  const trapFocus = (e: React.KeyboardEvent) => {
    if (!menuOpen || e.key !== "Tab" || !headerRef.current) return;
    const items = [...headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent);
    const first = items[0];
    const last = items.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  const current = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solid = scrolled || menuOpen || panelOpen;

  return (
    <header ref={headerRef} onKeyDown={trapFocus} className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div
        className={`relative z-10 mx-auto max-w-6xl rounded-[1.6rem] px-4 py-2 text-white transition-[background-color,box-shadow] duration-200 ease-ui md:px-5 ${
          solid
            ? "bg-night/95 shadow-lg ring-1 ring-white/10 supports-[backdrop-filter:blur(0)]:bg-night/70 supports-[backdrop-filter:blur(0)]:backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-h-11 items-center">
            {logo}
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
            {NAV.map((l) =>
              l.href === "/services" ? (
                <div key={l.href} ref={panelWrap}>
                  <button
                    ref={panelButton}
                    type="button"
                    aria-expanded={panelOpen}
                    aria-controls="services-panel"
                    onClick={() => setPanelOn(panelOpen ? null : pathname)}
                    className={`flex min-h-11 items-center gap-1.5 transition hover:text-white ${
                      current(l.href) || panelOpen ? "text-white" : "text-white/70"
                    }`}
                  >
                    {l.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                      className={`transition-transform duration-200 ease-ui ${panelOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                  {panelOpen && (
                    <div
                      id="services-panel"
                      className="absolute inset-x-0 top-full mt-2 rounded-[1.6rem] bg-night p-3 shadow-2xl ring-1 ring-white/10"
                    >
                      <ul className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((s) => (
                          <li key={s.id}>
                            <Link
                              href={`/services/${s.id}`}
                              aria-current={pathname === `/services/${s.id}` ? "page" : undefined}
                              className="block rounded-2xl p-4 transition hover:bg-white/8 focus-visible:bg-white/8 focus-visible:outline-none"
                            >
                              <span className="block font-display font-semibold text-white">{s.name}</span>
                              <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-white/60">
                                {s.summary}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/services"
                        className="mt-2 flex min-h-11 items-center rounded-2xl px-4 font-semibold text-glow hover:bg-white/8"
                      >
                        {PAGES.shell.allServices}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={current(l.href) ? "page" : undefined}
                  className={`flex min-h-11 items-center transition hover:text-white ${current(l.href) ? "text-white" : "text-white/70"}`}
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            {/* Wrapped, because the button's own inline-flex would override `hidden` */}
            <div className="hidden sm:block">
              <Link href="/contact" data-pulse-event="cta_start_project" className={ctaClass("primary")}>
                {PAGES.shell.start}
              </Link>
            </div>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOn(menuOpen ? null : pathname)}
              className="min-h-11 rounded-full border border-white/20 px-4 text-sm font-semibold md:hidden"
            >
              {menuOpen ? PAGES.shell.close : PAGES.shell.menu}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <nav
          ref={mobileNav}
          id="mobile-nav"
          aria-label="Main"
          className="fixed inset-0 overflow-y-auto bg-night px-6 pt-24 pb-10 text-white md:hidden"
        >
          <ul className="grid gap-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={current(l.href) ? "page" : undefined}
                  className="flex min-h-14 items-center font-display text-3xl font-semibold tracking-tight"
                >
                  {l.label}
                </Link>
                {l.href === "/services" && (
                  <ul className="mb-3 grid gap-0.5 border-l border-white/15 pl-4">
                    {services.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`/services/${s.id}`}
                          aria-current={pathname === `/services/${s.id}` ? "page" : undefined}
                          className="flex min-h-11 items-center text-white/70 hover:text-white"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" data-pulse-event="cta_start_project" className={`mt-8 w-full ${ctaClass("primary")}`}>
            {PAGES.shell.start}
          </Link>
        </nav>
      )}
    </header>
  );
}
