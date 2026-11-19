"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Step = { title: string; detail: string };

/** The steps of a project. A line fills down through them as you scroll, lighting each step as it passes. */
export function Process({
  title,
  steps,
  tone = "paper",
}: {
  title: string;
  steps: readonly Step[];
  /** The section's background, so it can sit next to another light section. */
  tone?: "paper" | "white";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-fill]", { scaleY: 0 });
        gsap.to("[data-fill]", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-steps]", start: "top 65%", end: "bottom 55%", scrub: 0.5 },
        });
        gsap.utils.toArray<HTMLElement>("[data-pstep]").forEach((step) => {
          gsap.from(step, {
            opacity: 0.25,
            x: 30,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 62%", toggleActions: "play none none reverse" },
          });
          gsap.from(step.querySelector("[data-dot]"), {
            backgroundColor: "var(--paper)",
            color: "var(--ink)",
            duration: 0.3,
            scrollTrigger: { trigger: step, start: "top 62%", toggleActions: "play none none reverse" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section id="how" ref={ref} className={`${tone === "white" ? "bg-white" : "bg-paper"} py-24 md:py-32`}>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em] text-ink lg:sticky lg:top-32 lg:self-start">
          {title}
        </h2>
        <ol data-steps className="relative grid gap-14">
          <span aria-hidden className="absolute top-2 bottom-2 left-[1.375rem] w-0.5 bg-line">
            <span data-fill className="block size-full origin-top bg-brand" />
          </span>
          {steps.map((s, i) => (
            <li key={s.title} data-pstep className="relative grid grid-cols-[2.75rem_1fr] gap-5">
              <span
                data-dot
                className="relative grid size-11 place-items-center rounded-full border-2 border-brand bg-brand font-display text-lg font-bold text-white"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">{s.title}</h3>
                <p className="mt-2 max-w-md text-lg text-muted">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
