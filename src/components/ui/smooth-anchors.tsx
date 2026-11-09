"use client";

import { useEffect } from "react";

/** Space kept above a section when jumping to it, so the sticky header never covers its title. */
const HEADER_OFFSET = 72;

/**
 * Smooth in-page navigation for "#section" links, done in JS instead of CSS
 * `scroll-behavior: smooth`, which fights GSAP ScrollTrigger snapping.
 * Respects reduced motion and keeps the URL hash and keyboard focus in sync.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!link || id === undefined) return;

      const target = id === "" || id === "top" ? document.body : document.getElementById(id);
      if (!target) return;
      event.preventDefault();

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = target === document.body ? 0 : target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      history.pushState(null, "", `#${id}`);

      // Move keyboard focus with the jump (skip link → main, nav → section).
      const focusable = target.hasAttribute("tabindex") ? target : null;
      focusable?.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
