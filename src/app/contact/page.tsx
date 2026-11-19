import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadForm } from "@/components/contact/lead-form";
import { PageHero } from "@/components/site/page-hero";
import { BRANDS } from "@/brands";
import { currentContent } from "@/content/current";
import { PAGES } from "@/content/pages";
import { currentBrand } from "@/lib/brand";
import { bookingUrl } from "@/lib/env";

const copy = PAGES.contact;

export const metadata: Metadata = { title: "Contact", description: copy.lead, alternates: { canonical: "/contact" } };

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <>
      <PageHero title={copy.title} lead={copy.lead} />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid content-start gap-6">
          {copy.next.map((n, i) => (
            <div key={n.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span className="grid size-10 place-items-center rounded-full bg-brand font-display font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-ink">{n.title}</h2>
                <p className="mt-1 text-muted">{n.text}</p>
              </div>
            </div>
          ))}
        </div>
        {/* The query (?service=) is only known per request, so the form renders inside Suspense */}
        <Suspense fallback={<div className="min-h-[32rem] rounded-3xl bg-white ring-1 ring-line" />}>
          <ContactForm searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}

async function ContactForm({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const brand = BRANDS[currentBrand()];
  const { services } = currentContent();
  const params = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  // Arriving from a service page pre-picks that service
  const asked = one(params.service);
  const service = services.some((s) => s.id === asked) ? asked : undefined;

  return (
    <LeadForm
      variant={brand.id}
      services={[
        ...services.map((s) => ({ value: s.id, label: s.name })),
        { value: "not-sure", label: "Not sure yet" },
      ]}
      initial={{ service }}
      bookingUrl={bookingUrl()}
    />
  );
}
