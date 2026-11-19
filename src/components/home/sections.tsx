import Link from "next/link";
import type { Service } from "@/content/schema";
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
        <ul className={`mt-8 grid gap-8 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
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

const ICONS: Record<Service["icon"], string> = {
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5",
  web: "M3 5h18v14H3zM3 9h18M6 7h.01M9 7h.01",
  mobile: "M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2",
  design: "M4 20l4-1L19 8l-3-3L5 16zM14 7l3 3",
  ai: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  flow: "M4 5h6v4H4zM14 15h6v4h-6zM7 9v4a3 3 0 0 0 3 3h4",
  plug: "M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0zM12 16v5",
  cloud: "M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 8.5 4.75 4.75 0 0 1 17.5 18z",
  brand: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
  megaphone: "M4 10v4h3l7 4V6l-7 4zM18 9a4 4 0 0 1 0 6",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z",
  chart: "M5 20v-8M12 20V5M19 20v-5M3 20h18",
};

/** Every service with the same weight: what it does for you and what you receive, each opening its own page. */
export function CapabilityGrid({
  title,
  text,
  cta,
  services,
}: {
  title: string;
  text: string;
  cta: string;
  services: readonly Pick<Service, "id" | "icon" | "name" | "summary" | "brief">[];
}) {
  return (
    <section id="services" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className={`${H2} text-ink`}>{title}</h2>
        <p className="mt-4 max-w-xl text-lg text-muted">{text}</p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.id} className="flex">
              <Link
                href={`/services/${s.id}`}
                data-pulse-event="service_opened"
                data-pulse-label={s.id}
                className="flex w-full flex-col rounded-[20px] bg-white p-6 ring-1 ring-line transition-shadow duration-150 ease-ui hover:ring-brand/40 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
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
                <p className="mt-2 text-muted">{s.summary}</p>
                <p className="mt-auto pt-5 text-sm text-ink/80">{s.brief}</p>
              </Link>
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

/** What search and AI-answer work covers, and the honest limit on what anyone can promise. */
export function Visibility({
  title,
  text,
  items,
  note,
}: {
  title: string;
  text: string;
  items: readonly string[];
  note: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night py-24 text-white md:py-32">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className={H2}>{title}</h2>
          <p className="mt-5 max-w-md text-lg text-mist">{text}</p>
        </div>
        <div>
          <ul className="grid gap-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-white/6 p-4 ring-1 ring-white/10">
                <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-glow" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-l-2 border-accent pl-4 text-mist">{note}</p>
        </div>
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
