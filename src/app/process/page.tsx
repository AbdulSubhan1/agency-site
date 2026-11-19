import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ProofBar } from "@/components/home/sections";
import { currentContent } from "@/content/current";
import { PAGES } from "@/content/pages";

export function generateMetadata(): Metadata {
  const { title, lead } = currentContent().company.process;
  return { title, description: lead, alternates: { canonical: "/process" } };
}

/** Each step in full: what happens, what you get from it and what we need from you. */
export default function ProcessPage() {
  const copy = currentContent().company.process;
  return (
    <>
      <PageHero title={copy.title} lead={copy.lead} />
      <ol className="mx-auto max-w-6xl divide-y divide-line px-5 py-12 md:px-8 md:py-20">
        {copy.steps.map((s, i) => (
          <li key={s.title} className="grid gap-6 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div className="flex gap-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{s.title}</h2>
                <p className="mt-3 max-w-md text-lg text-muted">{s.detail}</p>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <List title={copy.get} items={s.get} />
              <List title={copy.need} items={s.need} />
            </div>
          </li>
        ))}
      </ol>
      <ProofBar title={PAGES.process.promises} items={copy.promises} />
      <p className="mx-auto max-w-6xl px-5 py-16 text-lg text-muted md:px-8 md:py-20">
        {PAGES.process.more}{" "}
        <Link href="/faq" className="font-semibold text-brand underline-offset-4 hover:underline">
          {PAGES.process.faq}
        </Link>
      </p>
    </>
  );
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="border-t-2 border-brand pt-5">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <ul className="mt-3 grid gap-2 text-lg leading-relaxed text-muted">
        {items.map((t) => (
          <li key={t} className="flex gap-3">
            <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-brand" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
