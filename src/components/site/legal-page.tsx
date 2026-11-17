import { PageHero } from "./page-hero";

/** Privacy and Terms: a title, the date, and plain sections. */
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
      <div className="mx-auto grid max-w-3xl gap-10 px-5 py-20 md:px-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-2xl font-bold text-ink">{s.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{s.text}</p>
          </section>
        ))}
      </div>
    </>
  );
}
