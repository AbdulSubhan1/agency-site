import Link from "next/link";
import { NAV, PAGES } from "@/content/pages";

export function SiteFooter({ logo }: { logo: React.ReactNode }) {
  return (
    <footer className="bg-night px-5 pt-14 pb-10 text-sm text-mist md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="inline-flex">
            {logo}
          </Link>
          <nav aria-label="Footer" className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
            <Link href="/privacy" className="hover:text-white">
              {PAGES.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {PAGES.footer.terms}
            </Link>
          </nav>
        </div>
        <p className="max-w-xs md:text-right">{PAGES.footer.examples}</p>
      </div>
    </footer>
  );
}
