import { BRANDS } from "@/brands";
import { ContactCta } from "@/components/home/contact-cta";
import { Feed } from "@/components/home/feed";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Process } from "@/components/home/process";
import { ScrollRefresh } from "@/components/home/scroll-refresh";
import { ServicesRail } from "@/components/home/services-rail";
import { SiteHeader } from "@/components/home/site-header";
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
      <SiteHeader name={brand.name} cta={{ ...hero.primary, label: HOME.headerCta[hero.primary.kind] }} />
      <main id="top" className="flex-1">
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
      </main>
      <footer className="bg-night px-5 py-10 text-sm text-mist md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
          <span>{brand.name}</span>
          <span>Examples on this page are illustrations, not client results.</span>
        </div>
      </footer>
      <ScrollRefresh />
    </>
  );
}
