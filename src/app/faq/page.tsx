import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { currentContent } from "@/content/current";

export function generateMetadata(): Metadata {
  const { title, lead } = currentContent().company.faq;
  return { title, description: lead, alternates: { canonical: "/faq" } };
}

/** Real questions, grouped, each answer linking on to the page that covers it in full. */
export default function FaqPage() {
  const { title, lead, groups } = currentContent().company.faq;
  return (
    <>
      <PageHero title={title} lead={lead} />
      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-20 md:px-8">
        {groups.map((g) => (
          <section key={g.title} className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl lg:sticky lg:top-32 lg:self-start">
              {g.title}
            </h2>
            <div className="divide-y divide-line border-y border-line">
              {g.items.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full ring-1 ring-line transition-transform duration-200 ease-ui group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="max-w-2xl pb-6 text-lg leading-relaxed text-muted">
                    <p>{f.a}</p>
                    {f.link && (
                      <Link
                        href={f.link.href}
                        className="mt-3 inline-flex min-h-11 items-center font-semibold text-brand underline-offset-4 hover:underline"
                      >
                        {f.link.label}
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
