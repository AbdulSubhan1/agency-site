"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const W = 560;
const H = 500;
const CX = W / 2;
const CY = H / 2;

/** Pill width for a label: about 8.6 px a character at 16 px, plus the dot and padding. */
const pill = (label: string) => label.length * 8.6 + 46;

/**
 * The business in the middle, its apps around it, and work flowing between them as moving light. A toast cycles
 * through what just got done.
 */
export function HeroGraph({ hub, nodes, results }: { hub: string; nodes: string[]; results: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const points = nodes.map((label, i) => {
    const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    const x = CX + Math.cos(a) * 205;
    const y = CY + Math.sin(a) * 195;
    // Bend each link a little, alternating sides, so the lines don't all point straight at the hub
    const bend = i % 2 ? 0.35 : -0.35;
    const mx = (x + CX) / 2 + Math.cos(a + Math.PI / 2) * 60 * bend;
    const my = (y + CY) / 2 + Math.sin(a + Math.PI / 2) * 60 * bend;
    return { label, x, y, d: `M ${x} ${y} Q ${mx} ${my} ${CX} ${CY}` };
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-node]", {
          scale: 0,
          opacity: 0,
          transformOrigin: "50% 50%",
          stagger: 0.08,
          delay: 0.7,
          ease: "back.out(2)",
        });
        gsap.from("[data-link]", {
          strokeDashoffset: 400,
          duration: 1.2,
          delay: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        });
        gsap.utils.toArray<SVGPathElement>("[data-pulse]").forEach((p, i) => {
          gsap.fromTo(
            p,
            { strokeDashoffset: 420 },
            {
              strokeDashoffset: -20,
              duration: 2.2,
              repeat: -1,
              delay: 1.4 + i * 0.45,
              ease: "power1.inOut",
              repeatDelay: 1.6,
            },
          );
        });
        gsap.to("[data-ring]", { rotate: 360, duration: 30, repeat: -1, ease: "none", transformOrigin: "50% 50%" });

        const toasts = gsap.utils.toArray<HTMLElement>("[data-toast]");
        const tl = gsap.timeline({ repeat: -1, delay: 1.8 });
        toasts.forEach((t) => {
          tl.fromTo(
            t,
            { y: 16, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
          ).to(t, { y: -12, opacity: 0, duration: 0.4, ease: "power2.in" }, "+=2");
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative mx-auto max-w-[600px] pb-16 lg:-mr-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={`${hub}, connected to ${nodes.join(", ")}`}
      >
        <defs>
          <radialGradient id="hub" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="var(--glow)" />
            <stop offset="100%" stopColor="var(--brand)" />
          </radialGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        {points.map((p) => (
          <g key={p.label}>
            <path
              data-link
              d={p.d}
              fill="none"
              stroke="white"
              strokeOpacity="0.16"
              strokeWidth="1.5"
              strokeDasharray="400"
            />
            <path
              data-pulse
              d={p.d}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="22 420"
              strokeDashoffset="420"
              filter="url(#soft)"
            />
            <path
              data-pulse
              d={p.d}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="22 420"
              strokeDashoffset="420"
            />
          </g>
        ))}
        <circle
          data-ring
          cx={CX}
          cy={CY}
          r="96"
          fill="none"
          stroke="white"
          strokeOpacity="0.22"
          strokeDasharray="2 10"
        />
        <circle cx={CX} cy={CY} r="120" fill="var(--glow)" opacity="0.08" />
        <circle cx={CX} cy={CY} r="70" fill="url(#hub)" />
        <text x={CX} y={CY + 6} textAnchor="middle" className="fill-white font-display text-[19px] font-bold">
          {hub}
        </text>
        {points.map((p) => (
          <g key={p.label} data-node>
            <rect
              x={p.x - pill(p.label) / 2}
              y={p.y - 20}
              width={pill(p.label)}
              height="40"
              rx="20"
              fill="var(--night)"
              stroke="white"
              strokeOpacity="0.22"
            />
            <circle cx={p.x - pill(p.label) / 2 + 18} cy={p.y} r="4" fill="var(--accent)" />
            <text x={p.x - pill(p.label) / 2 + 30} y={p.y + 5.5} className="fill-white text-[16px] font-medium">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 grid place-items-center">
        {results.map((r) => (
          <p
            key={r}
            data-toast
            className="glow-border col-start-1 row-start-1 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white opacity-0 shadow-2xl first:opacity-100"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-ink">
              <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                <path
                  d="M3 8.5l3 3 7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {r}
          </p>
        ))}
      </div>
    </div>
  );
}
