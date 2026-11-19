"use client";

import { useState } from "react";

type Group = { name: string; tools: readonly string[] };

/**
 * The tools we build with, filterable by area. Every tool is in the HTML from the start; the filter only narrows
 * what shows, and the count is announced to screen readers.
 */
export function TechStack({
  title,
  text,
  all,
  groups,
}: {
  title: string;
  text: string;
  all: string;
  groups: readonly Group[];
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const shown = groups.filter((g) => picked === null || g.name === picked);
  const count = shown.reduce((n, g) => n + g.tools.length, 0);
  const filters = [{ name: all, value: null }, ...groups.map((g) => ({ name: g.name, value: g.name }))];

  return (
    <section className="relative isolate overflow-hidden bg-night py-24 text-white md:py-32">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-mist">{text}</p>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={title}>
          {filters.map((f) => (
            <button
              key={f.name}
              type="button"
              aria-pressed={picked === f.value}
              onClick={() => setPicked(f.value)}
              className="min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold transition hover:border-white/40 aria-pressed:border-glow aria-pressed:bg-glow aria-pressed:text-night"
            >
              {f.name}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {count} tools
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((g) => (
            <div key={g.name}>
              <h3 className="text-sm font-semibold text-glow">{g.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.tools.map((t) => (
                  <li key={t} className="rounded-full bg-white/8 px-4 py-2 text-[15px] ring-1 ring-white/10">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
