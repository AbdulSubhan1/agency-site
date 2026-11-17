"use client";

import { useRef } from "react";
import type { DayStory } from "@/brands/types";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const hm = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h ? `${h} h ${m} m` : `${m} m`;
};

const WORKDAY = 8 * 60;

/**
 * The repeat tasks fill most of the day, then shrink to slivers and the counter runs down. From md up it is pinned
 * and driven by the scroll; scrolling back plays it in reverse. With reduced motion the "before" numbers show, with the "after" line below.
 */
export function StoryDay({ story }: { story: DayStory }) {
  const ref = useRef<HTMLElement>(null);
  const lost = story.tasks.reduce((sum, t) => sum + t.minutes, 0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // From md up the section pins and the scroll drives it; on phones it is taller than the screen, so it plays
      // once when it comes into view instead
      mm.add({ wide: `${MOTION_OK} and (min-width: 768px)`, narrow: `${MOTION_OK} and (max-width: 767px)` }, (ctx) => {
        gsap.set("[data-strike]", { scaleX: 0 });
        const counter = { v: lost };
        const out = ref.current!.querySelector("[data-counter]")!;
        const tl = gsap.timeline({
          scrollTrigger: ctx.conditions?.wide
            ? { trigger: ref.current, start: "top top", end: "+=170%", pin: true, scrub: 0.8 }
            : { trigger: "[data-bar]", start: "top 70%", toggleActions: "play none none reverse" },
        });
        tl.from("[data-seg]", { flexGrow: 0.0001, stagger: 0.1, duration: 0.5, ease: "power2.out" })
          .from("[data-task]", { opacity: 0, x: -20, stagger: 0.08, duration: 0.3 }, "<")
          .addLabel("after", "+=0.3")
          .to(
            "[data-seg]",
            { flexGrow: story.afterMinutes / story.tasks.length, duration: 1, ease: "power2.inOut" },
            "after",
          )
          .to("[data-seg]", { backgroundColor: "var(--glow)", duration: 1 }, "after")
          .to("[data-strike]", { scaleX: 1, stagger: 0.1, duration: 0.6 }, "after")
          .to(
            counter,
            {
              v: story.afterMinutes,
              duration: 1,
              ease: "power2.inOut",
              onUpdate: () => void (out.textContent = hm(counter.v)),
            },
            "after",
          )
          .from("[data-after]", { opacity: 0, y: 20, duration: 0.5 }, "after+=0.7");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex items-center overflow-hidden bg-paper md:min-h-svh">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-muted">{story.who}</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em] text-ink">
            {story.title}
          </h2>
          <p className="mt-8 font-display text-[clamp(3.5rem,9vw,6.5rem)] leading-none font-bold tracking-tight text-brand tabular-nums">
            <span data-counter>{hm(lost)}</span>
          </p>
          <p className="mt-2 text-muted">a day on repeat work</p>
          <p data-after className="mt-8 max-w-md text-lg font-medium text-ink">
            {story.after}
          </p>
        </div>
        <div>
          <div data-bar className="flex h-24 overflow-hidden rounded-2xl bg-ink/5 md:h-28" aria-hidden>
            {story.tasks.map((t) => (
              <div
                key={t.label}
                data-seg
                className="border-r-2 border-paper bg-ink/25"
                style={{ flexGrow: t.minutes }}
              />
            ))}
            <div className="bg-accent" style={{ flexGrow: WORKDAY - lost }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted tabular-nums" aria-hidden>
            <span>9 am</span>
            <span>1 pm</span>
            <span>5 pm</span>
          </div>
          <ul className="mt-8 grid gap-4">
            {story.tasks.map((t) => (
              <li
                key={t.label}
                data-task
                className="flex items-baseline justify-between gap-4 border-b border-line pb-3"
              >
                <span className="relative text-lg text-ink">
                  {t.label}
                  <span
                    data-strike
                    className="absolute inset-x-0 top-1/2 h-0.5 origin-left bg-brand motion-reduce:hidden"
                    aria-hidden
                  />
                </span>
                <span className="font-semibold text-ink tabular-nums">{hm(t.minutes)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
