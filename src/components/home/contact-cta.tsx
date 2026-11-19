"use client";

import { useRef } from "react";
import type { Cta } from "@/brands/types";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { CtaLink } from "@/components/site/cta-link";

/** The closing call to action: the headline lights up word by word as it scrolls into view. The forms come next. */
export function ContactCta({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: Cta;
  secondary: Cta;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        SplitText.create("[data-cta-title]", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              opacity: 0.15,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: { trigger: ref.current, start: "top 75%", end: "top 25%", scrub: true },
            }),
        });
        gsap.from("[data-cta-rise]", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 45%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section id="contact" ref={ref} className="relative isolate overflow-hidden bg-night py-28 text-white md:py-40">
      <div aria-hidden className="aurora absolute -inset-[20%] -z-10 opacity-60" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <h2
          data-cta-title
          className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance"
        >
          {title}
        </h2>
        <p data-cta-rise className="mx-auto mt-6 max-w-xl text-lg text-mist">
          {text}
        </p>
        <div data-cta-rise className="mt-10 flex flex-wrap justify-center gap-3">
          <CtaLink cta={primary} variant="primary" />
          <CtaLink cta={secondary} variant="ghost" />
        </div>
      </div>
    </section>
  );
}
