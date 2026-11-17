"use client";

import { useRef } from "react";
import type { FlowStory } from "@/brands/types";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * One order's steps as they are today, each with what it costs. A line runs through them and flips every step to how
 * it works after automation. With reduced motion both states show, one under the other.
 */
export function StoryFlow({ story }: { story: FlowStory }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      // Flips one card from "today" to "after": border, tint and the two lines of text
      const flip = (tl: gsap.core.Timeline, step: HTMLElement, at: string | number) =>
        tl
          .to(
            step,
            {
              // An inset shadow tints the card while its solid background keeps hiding the line behind it
              borderColor: "var(--glow)",
              boxShadow: "inset 0 0 0 999px rgb(255 255 255 / 0.06)",
              duration: 0.3,
            },
            at,
          )
          .to(step.querySelector("[data-before-text]"), { opacity: 0, y: -10, duration: 0.25 }, at)
          .to(step.querySelector("[data-after-text]"), { opacity: 1, y: 0, duration: 0.3 }, ">-0.1");

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Start states are set here, not in classes: Tailwind's scale utilities use the CSS `scale` property, which
        // GSAP's transforms would not override
        gsap.set("[data-after-text]", { opacity: 0, y: 10 });
        gsap.set("[data-line-x]", { scaleX: 0 });
        gsap.set("[data-line-y]", { scaleY: 0 });
      });
      // From md up the four cards fit on one row, so the section pins and the scroll drives the whole story
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top top", end: "+=180%", pin: true, scrub: 0.8 },
        });
        tl.from(steps, { opacity: 0, y: 40, stagger: 0.15, duration: 0.5 });
        steps.forEach((step, i) => {
          tl.to("[data-line-x]", { scaleX: (i + 1) / steps.length, duration: 0.5 }, `fix${i}`);
          flip(tl, step, `fix${i}+=0.2`);
        });
        tl.from("[data-after]", { opacity: 0, y: 20, duration: 0.4 });
      });
      // On phones the cards stack taller than the screen, so nothing pins: each card flips as it scrolls into view
      mm.add(`${MOTION_OK} and (max-width: 767px)`, () => {
        gsap.to("[data-line-y]", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: 0.5 },
        });
        steps.forEach((step) => {
          flip(
            gsap.timeline({
              scrollTrigger: { trigger: step, start: "top 65%", toggleActions: "play none none reverse" },
            }),
            step,
            0,
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex items-center overflow-hidden bg-night text-white md:min-h-svh">
      <div aria-hidden className="grid-lines absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
        <p className="text-sm font-medium text-mist">{story.who}</p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em]">
          {story.title}
        </h2>
        <div className="relative mt-14">
          {/* Phones: the line runs down the left of the steps; from md up it runs across behind them */}
          <div aria-hidden className="absolute top-0 bottom-0 left-5 w-0.5 bg-white/10 md:hidden">
            <div data-line-y className="size-full origin-top bg-accent" />
          </div>
          <div aria-hidden className="absolute inset-x-0 top-1/2 hidden h-0.5 bg-white/10 md:block">
            <div data-line-x className="size-full origin-left bg-accent" />
          </div>
          <ol data-steps className="relative grid gap-5 md:grid-cols-4">
            {story.steps.map((s, i) => (
              <li
                key={s.label}
                data-step
                className="ml-12 rounded-2xl border border-dashed border-white/25 bg-night p-5 md:ml-0"
              >
                <span className="text-sm text-mist tabular-nums">Step {i + 1}</span>
                <p className="mt-1 font-display text-xl font-semibold">{s.label}</p>
                <div className="relative mt-3 min-h-12 text-sm">
                  <p data-before-text className="text-[#ffb59a]">
                    {s.before}
                  </p>
                  <p
                    data-after-text
                    className="absolute inset-0 font-semibold text-glow motion-reduce:static motion-reduce:mt-1"
                  >
                    {s.after}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p data-after className="mt-12 max-w-xl text-xl font-medium">
          {story.after}
        </p>
      </div>
    </section>
  );
}
