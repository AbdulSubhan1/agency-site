"use client";

import { useRef } from "react";
import type { ResolvedService } from "@/content/resolve";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * From md up the section pins and the cards slide sideways as you scroll down; on phones they scroll sideways with a
 * swipe, snapping to each card. With reduced motion every width keeps the swipe row.
 */
export function ServicesRail({ title, text, services }: { title: string; text: string; services: ResolvedService[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - track.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      id="services"
      ref={ref}
      className="relative overflow-hidden bg-night py-24 text-white md:flex md:min-h-svh md:flex-col md:justify-center"
    >
      <div aria-hidden className="aurora absolute -inset-[30%] opacity-30" />
      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em]">
          {title}
        </h2>
        <p className="mt-4 max-w-lg text-lg text-mist">{text}</p>
      </div>
      <div
        data-track
        className="relative mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-[max(2rem,calc((100vw-72rem)/2+2rem))] md:motion-safe:snap-none md:motion-safe:overflow-visible"
      >
        {services.map((s) => (
          <article
            key={s.id}
            className="glow-border flex w-[82vw] shrink-0 snap-start flex-col rounded-3xl p-6 md:w-[380px] md:p-8"
          >
            <h3 className="font-display text-2xl leading-tight font-bold">{s.name}</h3>
            <p className="mt-3 text-mist">{s.summary}</p>
            <p className="mt-4 text-sm text-white/70">{s.timeline}</p>
            <div className="mt-auto pt-8">
              {s.price.free ? (
                <p className="text-lg font-semibold text-accent">Free</p>
              ) : (
                <>
                  {s.price.setup && <p className="text-lg font-semibold text-accent">{s.price.setup}</p>}
                  {s.price.monthly && <p className="text-sm text-white/80">+ {s.price.monthly}</p>}
                </>
              )}
              {s.price.note && <p className="mt-1 text-sm text-mist">{s.price.note}</p>}
            </div>
          </article>
        ))}
      </div>
      <div aria-hidden className="relative mx-auto mt-8 hidden h-0.5 w-full max-w-6xl bg-white/10 md:block">
        <div data-progress className="size-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
      </div>
    </section>
  );
}
