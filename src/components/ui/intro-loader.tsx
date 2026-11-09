import { site } from "@/data/site";

/**
 * Opening sheet for the home page: the //MT mark is drawn in redline, a
 * dimension line fills, then the sheet lifts away. Pure CSS, so it shows
 * before hydration and never blocks input after it ends. Hidden without JS,
 * for reduced motion, and after the first view in a session (see layout.tsx).
 */
export function IntroLoader() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-inner">
        <svg viewBox="0 0 132 60" className="intro-mark" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* slashes, in the pen colour */}
          <path className="intro-stroke intro-pen" style={{ animationDelay: "0.05s" }} pathLength={1} d="M14 52 26 8" />
          <path className="intro-stroke intro-pen" style={{ animationDelay: "0.17s" }} pathLength={1} d="M34 52 46 8" />
          {/* M */}
          <path
            className="intro-stroke intro-ink"
            style={{ animationDelay: "0.32s" }}
            pathLength={1}
            d="M60 52V9l15 25 15-25v43"
          />
          {/* T */}
          <path className="intro-stroke intro-ink" style={{ animationDelay: "0.55s" }} pathLength={1} d="M100 9h28" />
          <path className="intro-stroke intro-ink" style={{ animationDelay: "0.66s" }} pathLength={1} d="M114 9v43" />
        </svg>

        <p className="intro-caption">
          {site.name} <span>&middot;</span> {site.role}
        </p>

        {/* Dimension line that fills like a progress bar */}
        <div className="intro-rule">
          <span className="intro-tick" />
          <span className="intro-track">
            <span className="intro-fill" />
          </span>
          <span className="intro-tick" />
        </div>
      </div>
    </div>
  );
}
