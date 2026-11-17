"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// One place registers the plugins, so every animated section imports GSAP from here
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Animations run only inside this media query; with "reduce motion" on, every section renders in its final state. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
