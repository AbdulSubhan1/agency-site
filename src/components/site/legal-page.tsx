import { PAGES } from "@/content/pages";
import { PageHero } from "./page-hero";

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Privacy and Terms: a title, the date, a list of the sections to jump to, and the sections, numbered. */
export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: readonly { title: string; text: string }[];
}) {
  return (
    <>
      <PageHero title={title} lead={updated} />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[0.6fr_1.4fr]">
        <nav aria-label={PAGES.legal.contents} className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display font-semibold text-ink">{PAGES.legal.contents}</h2>
          <ol className="mt-4 grid gap-1 border-l-2 border-line">
            {sections.map((s) => (
              <li key={s.title}>
                <a
                  href={`#${slug(s.title)}`}
                  className="-ml-0.5 flex min-h-11 items-center border-l-2 border-transparent pl-4 text-muted transition-colors duration-150 ease-ui hover:border-brand hover:text-ink"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <ol className="grid max-w-3xl gap-12">
          {sections.map((s, i) => (
            <li key={s.title} id={slug(s.title)} className="grid scroll-mt-32 grid-cols-[1.75rem_1fr] gap-3 md:grid-cols-[2.5rem_1fr] md:gap-4">
              <span aria-hidden className="pt-1 font-display text-lg font-bold text-brand">
                {i + 1}.
              </span>
              <section aria-labelledby={`${slug(s.title)}-title`}>
                <h2 id={`${slug(s.title)}-title`} className="font-display text-2xl font-bold text-ink">
                  {s.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-muted">{s.text}</p>
              </section>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
