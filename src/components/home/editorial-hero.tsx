"use client";

import { useRef } from "react";
import type { Cta } from "@/brands/types";
import { CtaLink } from "@/components/site/cta-link";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * A type-led opening: the headline's statements, one per line, stepping in from the left like an editorial spread.
 * Each line rises out of its own mask; the subline and buttons follow. With reduced motion everything is simply there.
 */
export function EditorialHero({
  headline,
  subline,
  primary,
  secondary,
}: {
  headline: string;
  subline: string;
  primary: Cta;
  secondary: Cta;
}) {
  const ref = useRef<HTMLElement>(null);
  // "Create attention. Earn trust. Build momentum." -> one line per sentence
  const lines = headline.split(/(?<=\.)\s+/);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline()
          .from("[data-line]", { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.14 })
          .from("[data-rise]", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }, "-=0.4");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="aurora absolute -inset-[20%] -z-10 opacity-80" />
      <div className="mx-auto max-w-6xl px-5 pt-36 pb-20 md:px-8 lg:pt-44 lg:pb-28">
        <h1 className="font-display text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.95] font-bold tracking-[-0.04em]">
          {lines.map((line, i) => (
            // The mask reaches a little lower than the line so descenders aren't clipped
            <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span data-line className={`block ${["", "md:pl-[10%]", "md:pl-[20%]"][i] ?? ""}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="mt-12 grid gap-8 md:ml-[20%] md:grid-cols-[1fr_auto] md:items-end">
          <p data-rise className="max-w-xl text-lg leading-relaxed text-mist md:text-xl">
            {subline}
          </p>
          <div data-rise className="flex flex-wrap gap-3">
            <CtaLink cta={primary} variant="primary" />
            <CtaLink cta={secondary} variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}
