import type { Metadata } from "next";
import Link from "next/link";
import { ctaClass } from "@/components/site/cta-link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { currentContent } from "@/content/current";
import { PAGES } from "@/content/pages";

const copy = PAGES.products;

export const metadata: Metadata = { title: copy.title, description: copy.lead };

export default function ProductsPage() {
  const { products } = currentContent();
  return (
    <>
      <PageHero title={copy.title} lead={copy.lead} />
      <Reveal className="mx-auto grid max-w-6xl gap-5 px-5 py-20 md:grid-cols-2 md:px-8">
        {products.map((p) => (
          <article key={p.id} data-reveal className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-line md:p-9">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-2xl leading-tight font-bold text-ink">{p.name}</h2>
              <span className="shrink-0 rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-ink">
                {p.kind === "free" ? copy.free : p.price}
              </span>
            </div>
            <p className="mt-3 text-lg text-muted">{p.summary}</p>
            <p className="mt-5 text-sm text-ink">
              <span className="font-semibold">{copy.delivery}: </span>
              {p.delivery}
            </p>
            <div className="mt-auto pt-8">
              <Link
                href={`/contact?product=${p.id}`}
                data-pulse-event="product_enquiry"
                data-pulse-label={p.id}
                className={ctaClass("outline")}
              >
                {copy.cta}
              </Link>
            </div>
          </article>
        ))}
      </Reveal>
    </>
  );
}
