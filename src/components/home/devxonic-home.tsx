import type { Brand } from "@/brands/types";
import { siteContent } from "@/content/resolve";
import { DEVXONIC_HOME as d } from "@/content/home-devxonic";
import { PAGES } from "@/content/pages";
import { ContactCta } from "./contact-cta";
import { Hero } from "./hero";
import { Process } from "./process";
import { CapabilityGrid, Faq, ProofBar, Team, Values } from "./sections";
import { StoryFlow } from "./story-flow";
import { TechStack } from "./tech-stack";

/** DevXonic, a full-service software company (brand masterplan, section 12). */
export function DevxonicHome({ brand }: { brand: Brand }) {
  const { hero } = brand;
  const { services } = siteContent(brand);
  return (
    <>
      <Hero
        headline={hero.headline}
        subline={hero.subline}
        primary={hero.primary}
        secondary={hero.secondary}
        visual={d.graph}
        results={d.heroEvents}
      />
      <ProofBar title={d.proof.title} items={d.proof.items} />
      <CapabilityGrid title={d.services.title} text={d.services.text} cta={d.services.cta} services={services} />
      <Process title={d.process.title} steps={d.process.steps} tone="white" />
      <TechStack title={d.stack.title} text={d.stack.text} all={d.stack.all} groups={d.stack.groups} />
      <StoryFlow story={d.story} />
      <Values title={d.values.title} items={d.values.items} />
      <Team title={d.team.title} link={d.team.link} people={PAGES.about.people} />
      <Faq title={d.faq.title} items={d.faq.items} />
      <ContactCta title={d.cta.title} text={d.cta.text} primary={hero.primary} secondary={hero.secondary} />
    </>
  );
}
