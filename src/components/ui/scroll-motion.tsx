"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/** Header height plus the peek each stacked sheet leaves above the next (px). */
const STACK_TOP = 80;
const STACK_STEP = 14;

/**
 * Home-page scroll motion, built with GSAP ScrollTrigger:
 * - "How it works" diagrams build step by step as they enter the viewport.
 * - On tall desktop screens, project sheets stack like a drawing set: each one
 *   pins (CSS sticky) and the sheet underneath recedes as the next slides over.
 * Everything is skipped for reduced motion; content is visible without JS.
 */
export function ScrollMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-flow]").forEach((flow) => {
        gsap.from(flow.querySelectorAll("[data-flow-step]"), {
          autoAlpha: 0,
          y: 12,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: flow, start: "top 85%", once: true },
        });
      });
    });

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 800px)", () => {
      const stack = document.querySelector<HTMLElement>("[data-sheet-stack]");
      if (!stack) return;
      stack.classList.add("is-stacking");

      const sheets = gsap.utils.toArray<HTMLElement>(".sheet", stack);
      sheets.forEach((sheet, i) => {
        const next = sheets[i + 1];
        const paper = sheet.querySelector<HTMLElement>("[data-sheet-paper]");
        if (!next || !paper) return;
        gsap.to(paper, {
          scale: 0.95,
          "--shade": 0.6,
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 70%",
            end: `top ${STACK_TOP + (i + 1) * STACK_STEP}px`,
            scrub: true,
          },
        });
      });
      ScrollTrigger.refresh();

      return () => stack.classList.remove("is-stacking");
    });

    return () => mm.revert();
  }, []);

  return null;
}
