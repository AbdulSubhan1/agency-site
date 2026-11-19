import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Values } from "@/components/home/sections";
import { TechStack } from "@/components/home/tech-stack";
import { currentContent } from "@/content/current";

export function generateMetadata(): Metadata {
  const { title, lead } = currentContent().company.capabilities;
  return { title, description: lead, alternates: { canonical: "/capabilities" } };
}

/** The tools, filterable by area, then the practices every project is held to. */
export default function CapabilitiesPage() {
  const { title, lead, stack, practices } = currentContent().company.capabilities;
  return (
    <>
      <PageHero title={title} lead={lead} />
      <Values title={practices.title} items={practices.items} />
      <TechStack title={stack.title} text={stack.text} all={stack.all} groups={stack.groups} />
    </>
  );
}
