"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Children marked `data-reveal` rise in, one after another, as they scroll into view. */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        revealOnScroll(ref.current!);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function revealOnScroll(root: HTMLElement) {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
  gsap.set(items, { y: 40, opacity: 0 });
  items.forEach((item, i) => {
    gsap.to(item, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      // Items side by side in a grid start together; a small offset keeps the order readable
      delay: (i % 3) * 0.08,
      scrollTrigger: { trigger: item, start: "top 88%", once: true },
    });
  });
}
