import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { currentContent } from "@/content/current";
import { PAGES } from "@/content/pages";

const copy = PAGES.services;

export const metadata: Metadata = { title: copy.title, description: copy.lead, alternates: { canonical: "/services" } };

export default function ServicesPage() {
  const { services } = currentContent();
  return (
    <>
      <PageHero title={copy.title} lead={copy.lead} />
      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-20 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.id}
            href={`/services/${s.id}`}
            data-pulse-event="service_opened"
            data-pulse-label={s.id}
            className="group flex flex-col rounded-3xl bg-white p-7 ring-1 ring-line transition-shadow duration-150 ease-ui hover:ring-brand/40"
          >
            <h2 className="font-display text-2xl leading-tight font-bold text-ink">{s.name}</h2>
            <p className="mt-3 text-muted">{s.summary}</p>
            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <div>
                <p className="font-semibold text-brand">{s.price.free ? "Free" : s.price.setup}</p>
                {s.price.monthly && <p className="text-sm text-muted">+ {s.price.monthly}</p>}
              </div>
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-full bg-ink/5 text-ink transition-colors duration-150 ease-ui group-hover:bg-brand group-hover:text-white"
              >
                <svg viewBox="0 0 16 16" className="size-4">
                  <path
                    d="M4 8h8M8.5 4.5 12 8l-3.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
