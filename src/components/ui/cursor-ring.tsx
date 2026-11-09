"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

/** What the ring says over a control; empty means "just grow". */
function labelFor(target: Element): string {
  const explicit = target.getAttribute("data-cursor");
  if (explicit !== null) return explicit;
  const href = target.getAttribute("href") ?? "";
  if (target.hasAttribute("download")) return "Save";
  if (href.startsWith("mailto:")) return "Email";
  if (/^https?:\/\//.test(href)) return "Open";
  return "";
}

/**
 * Desktop-only cursor companion: the system cursor stays, a ring in the pen
 * colour follows it and grows over links and buttons, with a short label.
 * Off for touch, coarse pointers and reduced motion.
 */
export function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ring || !label || !query.matches) return;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
    let visible = false;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!visible) {
        gsap.set(ring, { x: event.clientX, y: event.clientY });
        ring.dataset.visible = "true";
        visible = true;
      }
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest("a, button, [data-cursor]");
      if (!target) {
        ring.dataset.state = "";
        return;
      }
      const text = labelFor(target);
      label.textContent = text;
      ring.dataset.state = text ? "label" : "hover";
    };

    const onLeave = () => {
      ring.dataset.visible = "false";
      visible = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ringRef} className="cursor-ring" aria-hidden="true">
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
