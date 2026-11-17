"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Web fonts change text heights after load; re-measure so pinned sections start and end in the right place. */
export function ScrollRefresh() {
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);
  return null;
}
