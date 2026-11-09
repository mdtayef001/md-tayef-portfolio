import type { BrandGlyph } from "@/data/site";

type BrandIconProps = {
  glyph: BrandGlyph;
  className?: string;
  /** Pass a label only when the icon stands alone without visible text. */
  label?: string;
};

export function BrandIcon({ glyph, className = "size-4", label }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={glyph.path} />
    </svg>
  );
}
