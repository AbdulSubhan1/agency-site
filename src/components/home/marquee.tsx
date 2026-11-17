/** The region's industries scrolling past in a loop. The list is doubled so the loop has no gap. */
export function Marquee({ label, items }: { label: string; items: string[] }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <section
      aria-label={`${label}: ${items.join(", ")}`}
      className="overflow-hidden border-y border-white/10 bg-night py-6 text-white"
    >
      <div className="marquee-track flex w-max items-center gap-10" aria-hidden>
        {[...loop, ...loop].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl font-semibold tracking-tight whitespace-nowrap text-white/80 md:text-4xl"
          >
            {i % items.length === 0 ? <span className="text-accent">{label}</span> : null}
            {item}
            <span className="size-2 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}
