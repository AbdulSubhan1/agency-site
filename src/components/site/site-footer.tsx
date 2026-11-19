import Link from "next/link";
import { NAV, PAGES } from "@/content/pages";
import { FooterCta } from "./footer-cta";
import type { NavService } from "./site-header";

type Props = {
  logo: React.ReactNode;
  name: string;
  positioning: string;
  services: NavService[];
  close: { headline: string; text: string };
};

const linkClass = "inline-flex min-h-11 items-center hover:text-white md:min-h-9";

/** A closing call to action, then every service, the company pages and the legal pages. */
export function SiteFooter({ logo, name, positioning, services, close }: Props) {
  const company = NAV.filter((l) => l.href !== "/services");
  return (
    <footer className="bg-night text-sm text-mist">
      <FooterCta headline={close.headline} text={close.text} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-10 md:grid-cols-2 md:px-8 lg:grid-cols-[1.3fr_1.4fr_0.7fr_0.6fr]">
        <div>
          <Link href="/" className="inline-flex">
            {logo}
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">{positioning}</p>
        </div>
        <nav aria-label={PAGES.shell.services}>
          <h2 className="font-display font-semibold text-white">{PAGES.shell.services}</h2>
          <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.id}`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={PAGES.shell.company}>
          <h2 className="font-display font-semibold text-white">{PAGES.shell.company}</h2>
          <ul className="mt-3">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={PAGES.shell.legal}>
          <h2 className="font-display font-semibold text-white">{PAGES.shell.legal}</h2>
          <ul className="mt-3">
            <li>
              <Link href="/privacy" className={linkClass}>
                {PAGES.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                {PAGES.footer.terms}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 px-5 py-6 text-xs md:flex-row md:justify-between md:px-8">
        <p>© {name}</p>
        <p>{PAGES.footer.examples}</p>
      </div>
    </footer>
  );
}
