import type { ReactNode } from "react";
import { SplitChars } from "@/components/ui/split-chars";

type SectionHeadingProps = {
  id: string;
  title: string;
  /** Short title-block note on the right of the rule, e.g. "3 sheets". */
  note: string;
  lead?: ReactNode;
};

/** Section title block; its letters, note and lead animate in when it scrolls into view. */
export function SectionHeading({ id, title, note, lead }: SectionHeadingProps) {
  return (
    <header data-entrance className="mb-10 md:mb-14">
      <div className="flex items-end justify-between gap-6 border-b border-line-strong pb-4">
        <h2 id={`${id}-title`} className="text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">
          <SplitChars text={title} />
        </h2>
        <p data-entrance-item className="field-label shrink-0 pb-1.5">
          {note}
        </p>
      </div>
      {lead ? (
        <p data-entrance-item className="mt-5 max-w-5xl text-lg leading-relaxed text-ink-soft">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
