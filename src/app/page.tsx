import { BRANDS } from "@/brands";
import { ContactCta } from "@/components/home/contact-cta";
import { Feed } from "@/components/home/feed";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Process } from "@/components/home/process";
import { ServicesRail } from "@/components/home/services-rail";
import { StoryDay } from "@/components/home/story-day";
import { StoryFlow } from "@/components/home/story-flow";
import { HOME } from "@/content/home";
import { siteContent } from "@/content/resolve";
import { currentBrand } from "@/lib/brand";

export default function Home() {
  const brand = BRANDS[currentBrand()];
  const { region, services } = siteContent(brand, brand.defaultRegion);
  const { hero, showcase } = brand;

  return (
    <>
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
