import Link from "next/link";
import type { Capability } from "@/content/home-devxonic";
import { ctaClass } from "@/components/site/cta-link";

// Plain sections for the brand home pages: no scroll animation of their own, so the animated ones around them
// (hero, process, demo) stay the moments that move.

const H2 = "font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance";

type Item = { title: string; text: string };

/** Commitments right under the hero, on the same dark ground. */
export function ProofBar({ title, items }: { title: string; items: readonly Item[] }) {
  return (
    <section className="border-t border-white/10 bg-night py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <li key={i.title} className="border-l-2 border-glow pl-5">
              <h3 className="font-display text-lg font-semibold">{i.title}</h3>
              <p className="mt-2 leading-relaxed text-mist">{i.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const ICONS: Record<Capability["icon"], string> = {
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5",
  web: "M3 5h18v14H3zM3 9h18M6 7h.01M9 7h.01",
  mobile: "M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2",
  design: "M4 20l4-1L19 8l-3-3L5 16zM14 7l3 3",
  ai: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  flow: "M4 5h6v4H4zM14 15h6v4h-6zM7 9v4a3 3 0 0 0 3 3h4",
  plug: "M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0zM12 16v5",
  cloud: "M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 8.5 4.75 4.75 0 0 1 17.5 18z",
};

/** Every capability with the same weight: what it does for you and what you receive. */
export function CapabilityGrid({
  title,
  text,
  cta,
  items,
}: {
  title: string;
  text: string;
  cta: string;
  items: readonly Capability[];
}) {
  return (
    <section id="services" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className={`${H2} text-ink`}>{title}</h2>
        <p className="mt-4 max-w-xl text-lg text-muted">{text}</p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <li key={s.id} className="flex flex-col rounded-[20px] bg-white p-6 ring-1 ring-line">
              <svg viewBox="0 0 24 24" className="size-9 text-brand" aria-hidden="true">
                <path
                  d={ICONS[s.icon]}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="mt-5 font-display text-xl leading-tight font-semibold text-ink">{s.name}</h3>
              <p className="mt-2 text-muted">{s.outcome}</p>
              <p className="mt-auto pt-5 text-sm text-ink/80">{s.deliverables}</p>
            </li>
          ))}
        </ul>
        <Link href="/contact" data-pulse-event="cta_capabilities" className={`mt-10 ${ctaClass("solid")}`}>
          {cta}
        </Link>
      </div>
    </section>
  );
}

/** What we hold ourselves to, as four plain statements. */
export function Values({ title, items }: { title: string; items: readonly Item[] }) {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className={`${H2} text-ink`}>{title}</h2>
        <dl className="grid gap-8 sm:grid-cols-2">
          {items.map((v) => (
            <div key={v.title} className="border-t-2 border-brand pt-5">
              <dt className="font-display text-xl font-semibold text-ink">{v.title}</dt>
              <dd className="mt-2 text-lg leading-relaxed text-muted">{v.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

type Person = { name: string; initials: string; role: string; text: string };

/** The real team, from the About page copy. */
export function Team({ title, link, people }: { title: string; link: string; people: readonly Person[] }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className={`${H2} text-ink`}>{title}</h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {people.map((p) => (
            <li key={p.name} className="flex gap-6 rounded-[20px] bg-paper p-7 ring-1 ring-line">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-brand font-display text-xl font-bold text-white">
                {p.initials}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">{p.name}</h3>
                <p className="font-semibold text-brand">{p.role}</p>
                <p className="mt-3 text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link
          href="/about"
          className="mt-8 inline-flex min-h-11 items-center font-semibold text-brand underline-offset-4 hover:underline"
        >
          {link}
        </Link>
      </div>
    </section>
  );
}

/** Buyer questions as native disclosures: keyboard and screen-reader friendly, and the answers are in the HTML. */
export function Faq({ title, items }: { title: string; items: readonly { q: string; a: string }[] }) {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className={`${H2} text-ink`}>{title}</h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full ring-1 ring-line transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-lg leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
