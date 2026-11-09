"use client";

import { gsap } from "gsap";
import { useEffect } from "react";

/**
 * Hero entrance on page load: the name rises letter by letter out of a mask,
 * then the copy and buttons slide up, the portrait is revealed from the bottom
 * and the title-block cells follow. Starts as the intro sheet lifts on a first
 * visit, at once on later visits. CSS hides these pieces only while this can
 * run (JS on, motion allowed) and reveals them anyway after a few seconds.
 */
export function HeroEntrance() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const introPlaying = !document.documentElement.classList.contains("intro-seen");
      const tl = gsap.timeline({ delay: introPlaying ? 1.2 : 0.1, defaults: { ease: "power4.out" } });

      // y: 0 clears the pixel offset GSAP reads from the CSS starting transform.
      tl.fromTo("[data-hero-char]", { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.9, stagger: 0.045 })
        .fromTo(
          '[data-hero="item"]',
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.55",
        )
        .fromTo(
          '[data-hero="photo"]',
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
          "<-0.35",
        )
        .fromTo(
          '[data-hero="cell"]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.6",
        );

      return () => tl.kill();
    });
    return () => mm.revert();
  }, []);

  return null;
}
