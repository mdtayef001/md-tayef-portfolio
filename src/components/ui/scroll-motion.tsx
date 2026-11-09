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
 * - On desktop, Experience pins and scrolls sideways through the roles, oldest
 *   first, over drifting revision letters, with a dimension line from A to C.
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

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 700px)", () => {
      const section = document.querySelector<HTMLElement>("[data-hscroll]");
      const frame = section?.querySelector<HTMLElement>("[data-hscroll-frame]");
      const track = section?.querySelector<HTMLElement>("[data-hscroll-track]");
      if (!section || !frame || !track) return;
      section.classList.add("is-horizontal");

      const panels = gsap.utils.toArray<HTMLElement>("[data-hscroll-panel]", section);
      const fills = gsap.utils.toArray<HTMLElement>("[data-hscroll-fill]", section);
      const backdrop = section.querySelector<HTMLElement>("[data-hscroll-backdrop]");

      // How far the row of cards must travel so the last one ends flush right.
      const distance = () => {
        const style = getComputedStyle(frame);
        const visible = frame.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        return Math.max(0, track.scrollWidth - visible);
      };

      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            fills.forEach((fill, i) => {
              gsap.set(fill, { scaleX: gsap.utils.clamp(0, 1, progress * fills.length - i) });
            });
          },
        },
      });

      // Backdrop letters drift at less than half the cards' speed, for depth.
      if (backdrop) {
        gsap.to(backdrop, {
          x: () => -distance() * 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      // Each card comes into focus as it reaches the middle of the screen.
      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { autoAlpha: 0.35, scale: 0.94 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: slide,
              start: "left 92%",
              end: "left 50%",
              scrub: true,
            },
          },
        );
      });
      ScrollTrigger.refresh();

      return () => section.classList.remove("is-horizontal");
    });

    return () => mm.revert();
  }, []);

  return null;
}
