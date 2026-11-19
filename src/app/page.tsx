import type { Metadata } from "next";
import { BRANDS } from "@/brands";
import { ContactCta } from "@/components/home/contact-cta";
import { Feed } from "@/components/home/feed";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Process } from "@/components/home/process";
import { ServicesRail } from "@/components/home/services-rail";
import { JsonLd } from "@/components/site/json-ld";
import { StoryDay } from "@/components/home/story-day";
import { StoryFlow } from "@/components/home/story-flow";
import { CapabilityGrid, Faq, ProofBar, Team, Values } from "@/components/home/sections";
import { TechStack } from "@/components/home/tech-stack";
import { HOME } from "@/content/home";
import { DEVXONIC_HOME } from "@/content/home-devxonic";
import { PAGES } from "@/content/pages";
import { siteContent } from "@/content/resolve";
import { currentBrand } from "@/lib/brand";
import { siteUrl } from "@/lib/site-url";
import { graph, organization, website } from "@/lib/structured-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const brand = BRANDS[currentBrand()];
  const { region, services } = siteContent(brand, brand.defaultRegion);
  const { hero, showcase } = brand;

  const base = siteUrl();

  // DevXonic has its own page (brand masterplan section 12); the US brand keeps the automation page for now
  if (brand.id === "asia") {
    const d = DEVXONIC_HOME;
    return (
      <>
        <JsonLd data={graph(organization(brand, base), website(brand, base))} />
        <Hero
          headline={hero.headline}
          subline={hero.subline}
          primary={hero.primary}
          secondary={hero.secondary}
          visual={showcase.hero}
          results={[...d.heroEvents]}
        />
        <ProofBar title={d.proof.title} items={d.proof.items} />
        <CapabilityGrid title={d.services.title} text={d.services.text} cta={d.services.cta} items={d.services.items} />
        <Process title={d.process.title} steps={d.process.steps} tone="white" />
        <TechStack title={d.stack.title} text={d.stack.text} all={d.stack.all} groups={d.stack.groups} />
        {showcase.story.kind === "flow" && <StoryFlow story={showcase.story} />}
        <Values title={d.values.title} items={d.values.items} />
        <Team title={d.team.title} link={d.team.link} people={PAGES.about.people} />
        <Faq title={d.faq.title} items={d.faq.items} />
        <ContactCta title={d.cta.title} text={d.cta.text} primary={hero.primary} secondary={hero.secondary} />
      </>
    );
  }

  return (
    <>
      <JsonLd data={graph(organization(brand, base), website(brand, base))} />
      <Hero
        headline={hero.headline}
        subline={hero.subline}
        primary={hero.primary}
        secondary={hero.secondary}
        visual={showcase.hero}
        results={showcase.feed.rows.map((r) => r.result)}
      />
      <Marquee label={HOME.marquee} items={region.industries} />
      {showcase.story.kind === "day" ? <StoryDay story={showcase.story} /> : <StoryFlow story={showcase.story} />}
      <Feed title={HOME.feed.title} text={HOME.feed.text} feed={showcase.feed} />
      <ServicesRail title={HOME.services.title} text={HOME.services.text} services={services} />
      <Process title={HOME.process.title} steps={HOME.process.steps} />
      <ContactCta title={HOME.cta.title} text={HOME.cta.text} primary={hero.primary} secondary={hero.secondary} />
    </>
  );
}
