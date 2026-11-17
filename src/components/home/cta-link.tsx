import type { Cta } from "@/brands/types";

// Until the forms land, every CTA goes to the contact section on the page
const HREF: Record<Cta["kind"], string> = { "book-call": "#contact", whatsapp: "#contact", enquiry: "#services" };

const STYLE = {
  primary:
    "bg-accent text-ink shadow-[0_10px_40px_-10px_var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-12px_var(--accent)]",
  ghost: "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/40 hover:bg-white/10",
  solid: "bg-brand text-white hover:-translate-y-0.5 hover:brightness-110",
} as const;

/** A call to action as a pill link; every one is a Pulse event so clicks show up in the monitor. */
export function CtaLink({ cta, variant }: { cta: Cta; variant: keyof typeof STYLE }) {
  return (
    <a
      href={HREF[cta.kind]}
      data-pulse-event={`cta_${cta.kind}`}
      className={`inline-flex min-h-12 items-center rounded-full px-6 text-[15px] font-semibold transition duration-300 focus-visible:ring-4 focus-visible:ring-glow/40 focus-visible:outline-none ${STYLE[variant]}`}
    >
      {cta.label}
    </a>
  );
}
