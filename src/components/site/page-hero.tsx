"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

/** The dark band at the top of every inner page: the title rises in word by word, the lead and extras follow. */
export function PageHero({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create("[data-title]", {
          type: "words,lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => gsap.from(self.words, { yPercent: 110, duration: 0.8, ease: "power4.out", stagger: 0.05 }),
        });
        gsap.from("[data-rise]", { y: 20, opacity: 0, duration: 0.7, delay: 0.35, ease: "power3.out", stagger: 0.1 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="aurora absolute -inset-[30%] -z-10 opacity-50" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24">
        <h1
          data-title
          className="max-w-4xl font-display text-[clamp(2.5rem,6vw,4.6rem)] leading-[1] font-bold tracking-[-0.03em] text-balance"
        >
          {title}
        </h1>
        {lead && (
          <p data-rise className="mt-6 max-w-2xl text-lg text-mist md:text-xl">
            {lead}
          </p>
        )}
        {children && <div data-rise>{children}</div>}
      </div>
    </section>
  );
}
