import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { PAGES } from "@/content/pages";

export const metadata: Metadata = {
  title: PAGES.terms.title,
  description: PAGES.terms.description,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage {...PAGES.terms} />;
}
