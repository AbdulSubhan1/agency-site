"use client";

import { useRef } from "react";
import type { Cta, Showcase } from "@/brands/types";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { CtaLink } from "./cta-link";
import { HeroChat } from "./hero-chat";
import { HeroGraph } from "./hero-graph";

type Props = {
  headline: string;
  subline: string;
  primary: Cta;
  secondary: Cta;
  visual: Showcase["hero"];
  /** Results shown as live toasts beside the graph. */
  results: string[];
};

/**
 * The opening: the headline rises in word by word, then the visual. Scrolling away lifts and fades the text, so the
 * next section slides over it.
 */
export function Hero({ headline, subline, primary, secondary, visual, results }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create("[data-headline]", {
          type: "words,lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, { yPercent: 110, opacity: 0, duration: 0.9, ease: "power4.out", stagger: 0.06 }),
        });
        gsap
          .timeline({ delay: 0.5 })
          .from("[data-rise]", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 })
          .from("[data-visual]", { y: 40, opacity: 0, scale: 0.94, duration: 1.1, ease: "power3.out" }, 0.1);
        gsap.to("[data-copy]", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="aurora absolute -inset-[20%] -z-10 opacity-70" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pt-32 pb-20 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pt-40 lg:pb-32">
        <div data-copy>
          <h1
            data-headline
            className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance"
          >
            {headline}
          </h1>
          <p data-rise className="mt-6 max-w-xl text-lg leading-relaxed text-mist md:text-xl">
            {subline}
          </p>
          <div data-rise className="mt-9 flex flex-wrap gap-3">
            <CtaLink cta={primary} variant="primary" />
            <CtaLink cta={secondary} variant="ghost" />
          </div>
        </div>
        <div data-visual className="relative">
          {visual.kind === "graph" ? (
            <HeroGraph hub={visual.hub} nodes={visual.nodes} results={results} />
          ) : (
            <HeroChat chat={visual.chat} />
          )}
        </div>
      </div>
    </section>
  );
}
