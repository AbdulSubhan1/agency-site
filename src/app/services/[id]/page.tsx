import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Process } from "@/components/home/process";
import { ctaClass } from "@/components/site/cta-link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { currentContent } from "@/content/current";
import { PAGES } from "@/content/pages";

const copy = PAGES.services;

// Only the services this brand features are built; any other id hits notFound() below, a real 404
export function generateStaticParams() {
  return currentContent().services.map((s) => ({ id: s.id }));
}

function find(id: string) {
  return currentContent().services.find((s) => s.id === id);
}

export async function generateMetadata({ params }: PageProps<"/services/[id]">): Promise<Metadata> {
  const service = find((await params).id);
  return service ? { title: service.name, description: service.summary } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[id]">) {
  const service = find((await params).id);
  if (!service) notFound();
  const others = currentContent().services.filter((s) => s.id !== service.id);

  return (
    <>
      <PageHero title={service.name} lead={service.summary}>
        <dl className="mt-10 flex flex-wrap gap-3">
          <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
            <dt className="text-xs text-mist">{copy.price}</dt>
            <dd className="font-semibold text-accent">
              {service.price.free ? "Free" : service.price.setup}
              {service.price.monthly && <span className="text-white/80"> + {service.price.monthly}</span>}
            </dd>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
            <dt className="text-xs text-mist">{copy.timeline}</dt>
            <dd className="font-semibold">{service.timeline}</dd>
          </div>
        </dl>
        {service.price.note && <p className="mt-3 text-sm text-mist">{service.price.note}</p>}
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] font-bold tracking-[-0.03em] text-ink">
          {copy.deliverables}
        </h2>
        <Reveal className="mt-10 grid gap-4 md:grid-cols-2">
          {service.deliverables.map((d) => (
            <div key={d} data-reveal className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-line">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white">
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                  <path
                    d="M3 8.5l3 3 7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-lg text-ink">{d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <Process title={copy.steps} steps={service.steps.map((s) => ({ title: s.title, detail: s.detail }))} />

      <section className="relative isolate overflow-hidden bg-night px-5 py-24 text-white md:px-8 md:py-32">
        <div aria-hidden className="aurora absolute -inset-[30%] -z-10 opacity-40" />
        <Reveal className="mx-auto max-w-4xl text-center">
          <p data-reveal className="text-sm font-medium text-mist">
            {copy.outcome}
          </p>
          <p
            data-reveal
            className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-bold tracking-tight text-balance"
          >
            {service.outcome}
          </p>
          <div data-reveal className="mt-10">
            <Link
              href={`/contact?service=${service.id}`}
              data-pulse-event="service_enquiry"
              data-pulse-label={service.id}
              className={ctaClass("primary")}
            >
              {copy.cta}
            </Link>
          </div>
        </Reveal>
      </section>

      <nav aria-label={copy.all} className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="font-display text-xl font-bold text-ink">{copy.all}</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((s) => (
            <li key={s.id}>
              <Link href={`/services/${s.id}`} className={ctaClass("outline")}>
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
