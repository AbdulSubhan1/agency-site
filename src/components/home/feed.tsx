"use client";

import { useRef } from "react";
import type { FeedExample } from "@/content/examples";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** An example evening as a live log: each event drops in, then its result ticks green, and the tally counts up. */
export function Feed({ title, text, feed }: { title: string; text: string; feed: FeedExample }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tally = { v: 0 };
        const out = ref.current!.querySelector("[data-tally]")!;
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-board]", start: "top 75%" } });
        tl.from("[data-board]", { y: 60, opacity: 0, duration: 0.8, ease: "power3.out" });
        gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
          tl.from(row, { opacity: 0, x: 30, duration: 0.45, ease: "power3.out" }, i === 0 ? "-=0.3" : "+=0.15")
            .from(
              row.querySelector("[data-result]"),
              { opacity: 0, scale: 0.8, duration: 0.35, ease: "back.out(2)" },
              "+=0.2",
            )
            .to(
              tally,
              { v: i + 1, duration: 0.2, onUpdate: () => void (out.textContent = String(Math.round(tally.v))) },
              "<",
            );
        });
        gsap.from("[data-feed-copy] > *", {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div data-feed-copy>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em] text-ink">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted">{text}</p>
        </div>
        <div
          data-board
          className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-40px_rgb(14_21_48/0.45)] ring-1 ring-line"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            <p className="text-sm font-semibold text-ink">{feed.title}</p>
            <span className="flex shrink-0 items-center gap-2 text-xs font-semibold text-brand">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-60 motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-brand" />
              </span>
              Running
            </span>
          </div>
          <ul>
            {feed.rows.map((r) => (
              <li
                key={r.time}
                data-row
                className="grid grid-cols-[4.5rem_1fr] gap-3 border-b border-line px-5 py-4 text-[15px]"
              >
                <span className="font-semibold text-ink tabular-nums">{r.time}</span>
                <span>
                  <span className="text-ink">{r.event}</span>
                  <span
                    data-result
                    className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand"
                  >
                    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                      <path
                        d="M3 8.5l3 3 7-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {r.result}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between bg-night px-5 py-4 text-sm text-white">
            <span>{feed.done}</span>
            <span className="shrink-0 font-display text-lg font-bold whitespace-nowrap text-accent tabular-nums">
              <span data-tally>{feed.rows.length}</span> of {feed.rows.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
