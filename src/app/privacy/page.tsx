import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { PAGES } from "@/content/pages";

export const metadata: Metadata = { title: PAGES.privacy.title };

export default function PrivacyPage() {
  return <LegalPage {...PAGES.privacy} />;
}
