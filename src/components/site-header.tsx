"use client";

import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { navItems, site, type SectionId } from "@/data/site";

function useActiveSection(ids: readonly SectionId[]) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      // A thin band across the upper middle of the screen decides "current".
      { rootMargin: "-35% 0px -60% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navItems.map((item) => item.id);

/**
 * Rolling label: on hover the letters slide up one after another while a
 * green copy rolls in from below. The copy is hidden from screen readers.
 */
function RollText({ text }: { text: string }) {
  const letters = (prefix: string) =>
    [...text].map((char, i) => (
      <span key={`${prefix}${i}`} className="roll-char" style={{ "--i": i } as CSSProperties}>
        {char === " " ? "\u00a0" : char}
      </span>
    ));
  return (
    <span className="roll">
      <span className="roll-row">{letters("a")}</span>
      <span className="roll-row roll-copy" aria-hidden="true">
        {letters("b")}
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu and hands focus back to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-ground/95" : "border-transparent bg-ground/0"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-pen focus:px-3 focus:py-2 focus:text-pen-ink"
      >
        Skip to content
      </a>

      <div className="shell flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${site.name}, back to top`}>
          {/* The intro's mark; hovering the logo draws it again, stroke by stroke. */}
          <svg
            viewBox="0 0 132 60"
            aria-hidden="true"
            className="logo-mark h-6 w-auto"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path pathLength={1} style={{ "--d": "0s" } as CSSProperties} className="stroke-pen" d="M14 52 26 8" />
            <path pathLength={1} style={{ "--d": "0.09s" } as CSSProperties} className="stroke-pen" d="M34 52 46 8" />
            <path
              pathLength={1}
              style={{ "--d": "0.2s" } as CSSProperties}
              className="stroke-ink"
              d="M60 52V9l15 25 15-25v43"
            />
            <path pathLength={1} style={{ "--d": "0.36s" } as CSSProperties} className="stroke-ink" d="M100 9h28" />
            <path pathLength={1} style={{ "--d": "0.44s" } as CSSProperties} className="stroke-ink" d="M114 9v43" />
          </svg>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-label={item.label}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative block px-3 py-2 text-[0.95rem] font-medium transition-colors ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <RollText text={item.label} />
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-pen transition-transform duration-500 ease-out-expo ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            aria-label="Resume"
            href="/resume"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            <FileText aria-hidden="true" className="size-4" />
            <RollText text="Resume" />
          </Link>
          <a
            data-magnetic
            href={`mailto:${site.email}`}
            className="inline-flex items-center border border-pen px-4 py-2 text-sm font-semibold text-pen transition-colors hover:bg-pen hover:text-pen-ink rounded-[4px]"
          >
            Hire me
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-ground md:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-10 pt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className="block py-5 font-display text-3xl font-bold tracking-tight text-ink aria-[current=location]:text-pen"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="border-b border-line">
              <Link href="/resume" className="block py-5 font-display text-3xl font-bold tracking-tight text-ink">
                Resume
              </Link>
            </li>
          </ul>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 flex items-center justify-center bg-pen px-5 py-4 font-semibold text-pen-ink rounded-[4px]"
          >
            Email me about a project
          </a>
        </nav>
      </div>
    </header>
  );
}
