import type { Metadata } from "next";
import { CtaLink } from "@/components/site/cta-link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { BRANDS } from "@/brands";
import { PAGES } from "@/content/pages";
import { currentBrand } from "@/lib/brand";

const copy = PAGES.about;

export const metadata: Metadata = { title: "About us", description: copy.lead, alternates: { canonical: "/about" } };

export default function AboutPage() {
  const { hero } = BRANDS[currentBrand()];
  return (
    <>
      <PageHero title={copy.title} lead={copy.lead} />
      <Reveal className="mx-auto grid max-w-6xl gap-5 px-5 py-20 md:grid-cols-2 md:px-8">
        {copy.people.map((p) => (
          <article key={p.name} data-reveal className="rounded-3xl bg-white p-8 ring-1 ring-line md:p-10">
            <span className="grid size-20 place-items-center rounded-full bg-accent font-display text-2xl font-bold text-ink">
              {p.initials}
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold text-ink">{p.name}</h2>
            <p className="mt-1 font-semibold text-brand">{p.role}</p>
            <p className="mt-4 text-lg text-muted">{p.text}</p>
          </article>
        ))}
      </Reveal>
      <section className="bg-night px-5 py-20 text-white md:px-8 md:py-28">
        <Reveal className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          {copy.principles.map((p) => (
            <div key={p.title} data-reveal>
              <span aria-hidden className="block h-1 w-12 rounded-full bg-accent" />
              <h3 className="mt-5 font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-3 text-mist">{p.text}</p>
            </div>
          ))}
        </Reveal>
        <div className="mx-auto mt-16 max-w-6xl">
          <CtaLink cta={hero.primary} variant="primary" />
        </div>
      </section>
    </>
  );
}
