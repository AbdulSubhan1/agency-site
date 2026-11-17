import Link from "next/link";
import { ctaClass } from "@/components/site/cta-link";
import { PageHero } from "@/components/site/page-hero";
import { NAV, PAGES } from "@/content/pages";

export default function NotFound() {
  return (
    <PageHero title={PAGES.notFound.title} lead={PAGES.notFound.text}>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={ctaClass("primary")}>
          {PAGES.notFound.home}
        </Link>
        {NAV.map((l) => (
          <Link key={l.href} href={l.href} className={ctaClass("ghost")}>
            {l.label}
          </Link>
        ))}
      </div>
    </PageHero>
  );
}
