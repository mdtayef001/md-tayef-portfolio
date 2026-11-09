import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  title: ReactNode;
  /** Short title-block note on the right of the rule, e.g. "3 sheets". */
  note: string;
  lead?: ReactNode;
};

export function SectionHeading({ id, title, note, lead }: SectionHeadingProps) {
  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-end justify-between gap-6 border-b border-line-strong pb-4">
        <h2 id={`${id}-title`} className="text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">
          {title}
        </h2>
        <p className="field-label shrink-0 pb-1.5">{note}</p>
      </div>
      {lead ? <p className="mt-5 max-w-5xl text-lg leading-relaxed text-ink-soft">{lead}</p> : null}
    </header>
  );
}
