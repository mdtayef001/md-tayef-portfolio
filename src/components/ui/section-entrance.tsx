"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/**
 * The hero's entrance, replayed for every section as it scrolls into view:
 * inside each [data-entrance] block the split heading letters rise out of
 * their masks, then each [data-entrance-item] slides up in turn. GSAP sets the
 * hidden starting state itself, so without JS (or with reduced motion) the
 * content is simply visible.
 */
export function SectionEntrance() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-entrance]").forEach((block) => {
        const chars = block.querySelectorAll("[data-split-char]");
        const items = block.querySelectorAll(":scope [data-entrance-item]");
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: block, start: "top 85%", once: true },
        });
        if (chars.length) {
          tl.fromTo(chars, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.8, stagger: 0.03 });
        }
        if (items.length) {
          tl.fromTo(
            items,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 },
            chars.length ? "-=0.5" : 0,
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
