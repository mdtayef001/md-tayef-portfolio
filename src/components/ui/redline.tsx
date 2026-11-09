/**
 * Amber "redline" pen marks. Every path declares pathLength="1" so the
 * global CSS can draw it on with stroke-dashoffset when its [data-reveal]
 * ancestor enters the viewport.
 */
import type { CSSProperties } from "react";

type MarkProps = {
  className?: string;
  /** Seconds to wait before drawing, for marks that follow another. */
  delay?: number;
  strokeWidth?: number;
};

const delayStyle = (delay?: number) =>
  (delay === undefined ? undefined : { "--draw-delay": `${delay}s` }) as CSSProperties | undefined;

export function WavyRule({ className = "h-3 w-44", delay, strokeWidth = 2.5 }: MarkProps) {
  return (
    <svg viewBox="0 0 180 12" preserveAspectRatio="none" className={`redline ${className}`} aria-hidden="true">
      <path
        pathLength={1}
        strokeWidth={strokeWidth}
        style={delayStyle(delay)}
        d="M2 8c7.5 0 7.5-5 15-5s7.5 5 15 5 7.5-5 15-5 7.5 5 15 5 7.5-5 15-5 7.5 5 15 5 7.5-5 15-5 7.5 5 15 5 7.5-5 15-5 7.5 5 15 5 7.5-5 15-5 7.5 5 15 5"
      />
    </svg>
  );
}

/** A loose hand-drawn ellipse that slightly overshoots its start. */
export function CircleMark({ className = "", delay, strokeWidth = 2 }: MarkProps) {
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" className={`redline ${className}`} aria-hidden="true">
      <path
        pathLength={1}
        strokeWidth={strokeWidth}
        style={delayStyle(delay)}
        d="M150 9C117 1 52 3 22 19 2 30 4 54 33 66c35 14 110 13 145-3 23-11 21-35-6-47-21-9-61-12-96-8"
      />
    </svg>
  );
}

/** Curved leader arrow, pointing to the lower-left by default. */
export function LeaderArrow({ className = "", delay, strokeWidth = 2 }: MarkProps) {
  return (
    <svg viewBox="0 0 120 70" className={`redline ${className}`} aria-hidden="true">
      <path pathLength={1} strokeWidth={strokeWidth} style={delayStyle(delay)} d="M114 6C92 8 52 18 14 60" />
      <path pathLength={1} strokeWidth={strokeWidth} style={delayStyle((delay ?? 0.15) + 0.5)} d="M12 42l2 18 18-5" />
    </svg>
  );
}

/** Scalloped revision cloud, the drafting mark for "this changed". */
export function RevisionCloud({ className = "", delay, strokeWidth = 1.75 }: MarkProps) {
  return (
    <svg viewBox="0 0 220 70" preserveAspectRatio="none" className={`redline ${className}`} aria-hidden="true">
      <path
        pathLength={1}
        strokeWidth={strokeWidth}
        style={delayStyle(delay)}
        d="M20 14c4-9 18-9 22 0 4-9 18-9 22 0 4-9 18-9 22 0 4-9 18-9 22 0 4-9 18-9 22 0 4-9 18-9 22 0 4-9 18-9 22 0 4-9 18-9 22 0 9 2 12 15 4 21 8 6 5 19-4 21-4 9-18 9-22 0-4 9-18 9-22 0-4 9-18 9-22 0-4 9-18 9-22 0-4 9-18 9-22 0-4 9-18 9-22 0-4 9-18 9-22 0-4 9-18 9-22 0-9-2-12-15-4-21-8-6-5-19 4-21Z"
      />
    </svg>
  );
}
