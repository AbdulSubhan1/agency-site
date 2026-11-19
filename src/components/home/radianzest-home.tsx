import type { Brand } from "@/brands/types";
import { RADIANZEST_HOME as r } from "@/content/home-radianzest";
import { ContactCta } from "./contact-cta";
import { EditorialHero } from "./editorial-hero";
import { Feed } from "./feed";
import { Process } from "./process";
import { CapabilityGrid, Faq, ProofBar, Visibility } from "./sections";

/** Radian Zest, a US digital growth and technology agency (brand masterplan, section 13). */
export function RadianzestHome({ brand }: { brand: Brand }) {
  const { hero } = brand;
  return (
    <>
      <EditorialHero
        headline={hero.headline}
        subline={hero.subline}
        primary={hero.primary}
        secondary={hero.secondary}
      />
      <ProofBar title={r.proof.title} items={r.proof.items} />
      <CapabilityGrid title={r.services.title} text={r.services.text} cta={r.services.cta} items={r.services.items} />
      <Process title={r.process.title} steps={r.process.steps} tone="white" />
      <Visibility
        title={r.visibility.title}
        text={r.visibility.text}
        items={r.visibility.items}
        note={r.visibility.note}
      />
      <Feed title={r.systems.title} text={r.systems.text} feed={r.systems.feed} />
      <Faq title={r.faq.title} items={r.faq.items} />
      <ContactCta title={r.cta.title} text={r.cta.text} primary={hero.primary} secondary={hero.secondary} />
    </>
  );
}
