"use client";

import { gsap } from "gsap";
import { useEffect } from "react";

/** How far (as a share of the pointer offset) a button leans toward the cursor. */
const PULL = 0.35;

/**
 * Magnetic buttons: any element with [data-magnetic] leans toward the mouse
 * while hovered and springs back on leave. Desktop mouse only; skipped for
 * reduced motion. Elements added later are picked up via event delegation.
 */
export function Magnetic() {
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!query.matches) return;

    const movers = new WeakMap<HTMLElement, { x: gsap.QuickToFunc; y: gsap.QuickToFunc }>();
    const moverFor = (el: HTMLElement) => {
      let mover = movers.get(el);
      if (!mover) {
        mover = {
          x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" }),
        };
        movers.set(el, mover);
      }
      return mover;
    };

    let active: HTMLElement | null = null;

    const release = () => {
      if (!active) return;
      gsap.to(active, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)", overwrite: true });
      movers.delete(active);
      active = null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const el = (event.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (el !== active) release();
      if (!el) return;
      active = el;
      const rect = el.getBoundingClientRect();
      const { x, y } = moverFor(el);
      x((event.clientX - (rect.left + rect.width / 2)) * PULL);
      y((event.clientY - (rect.top + rect.height / 2)) * PULL);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", release);
      release();
    };
  }, []);

  return null;
}
