import Link from "next/link";
import type { Cta } from "@/brands/types";

// Calls and WhatsApp both start on the contact page, where each brand's form leads with its own channel
const HREF: Record<Cta["kind"], string> = { "book-call": "/contact", whatsapp: "/contact", enquiry: "/services" };

const STYLE = {
  primary: "bg-accent text-ink shadow-[0_10px_40px_-10px_var(--accent)] hover:brightness-105",
  ghost: "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/40 hover:bg-white/10",
  solid: "bg-brand text-white hover:brightness-110",
  outline: "border border-ink/15 text-ink hover:border-brand hover:text-brand",
} as const;

export const ctaClass = (variant: keyof typeof STYLE) =>
  // Hover only changes colour (seen often, so it stays quick); pressing scales down a touch so the tap feels heard
  `inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-[transform,filter,background-color,border-color,color] duration-150 ease-ui select-none active:scale-[0.97] focus-visible:ring-4 focus-visible:ring-glow/40 focus-visible:outline-none ${STYLE[variant]}`;

/** A call to action as a pill link; every one is a Pulse event so clicks show up in the monitor. */
export function CtaLink({ cta, variant, href }: { cta: Cta; variant: keyof typeof STYLE; href?: string }) {
  return (
    <Link href={href ?? cta.href ?? HREF[cta.kind]} data-pulse-event={`cta_${cta.kind}`} className={ctaClass(variant)}>
      {cta.label}
    </Link>
  );
}
