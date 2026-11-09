import { ArrowUpRight } from "lucide-react";
import { roles, type Role } from "@/data/site";
import { RevisionCloud } from "@/components/ui/redline";
import { SectionHeading } from "@/components/ui/section-heading";

/** Drafting revision marker: a letter in a triangle. */
function RevMarker({ rev, current }: { rev: string; current?: boolean }) {
  return (
    <span className="relative inline-flex size-11 shrink-0 items-center justify-center">
      <svg viewBox="0 0 44 40" aria-hidden="true" className="absolute inset-0 size-full">
        <path
          d="M22 3 41 37H3Z"
          fill={current ? "var(--color-pen)" : "var(--color-ground)"}
          stroke={current ? "var(--color-pen)" : "var(--color-line-strong)"}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`relative mt-2.5 font-mono text-sm font-bold ${current ? "text-pen-ink" : "text-ink"}`}>
        <span className="sr-only">Revision </span>
        {rev}
      </span>
    </span>
  );
}

function RoleRow({ role }: { role: Role }) {
  return (
    <li
      data-reveal
      className={`relative grid gap-x-8 gap-y-4 border-b border-line-strong py-9 md:grid-cols-[3.5rem_11rem_1fr] ${
        role.current ? "md:py-12" : ""
      }`}
    >
      <div className="flex items-center gap-5 md:contents">
        <RevMarker rev={role.rev} current={role.current} />

        <div className="font-mono text-sm text-ink-soft md:pt-2.5">
          {role.current ? (
            <span className="relative inline-block px-1 font-semibold text-pen">
              {role.period}
              <RevisionCloud
                className="absolute -inset-x-5 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2.5rem)]"
                delay={0.4}
              />
            </span>
          ) : (
            role.period
          )}
        </div>
      </div>

      <div className="min-w-0">
        <h3 className={`font-bold tracking-[-0.02em] text-ink ${role.current ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {role.title}
        </h3>
        <p className="mt-1.5 text-lg text-ink-soft">
          {role.orgUrl ? (
            <a href={role.orgUrl} target="_blank" rel="noopener noreferrer" className="pen-link font-semibold text-ink">
              {role.org}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="font-semibold text-ink">{role.org}</span>
          )}
        </p>

        <ul className="mt-3 flex flex-wrap gap-x-2 text-sm text-ink-muted">
          {role.facts.map((fact, index) => (
            <li key={fact}>
              {fact}
              {index < role.facts.length - 1 ? (
                <span aria-hidden="true" className="pl-2 text-line-strong">
                  ·
                </span>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-soft">{role.summary}</p>

        {role.current && role.orgUrl ? (
          <a
            href={role.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-3 border border-pen px-5 py-3 font-semibold text-pen transition-colors hover:bg-pen hover:text-pen-ink"
          >
            Visit {new URL(role.orgUrl).host}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line bg-ground-sunk/70">
      <div className="shell py-20 md:py-28">
        <SectionHeading
          id="experience"
          title="Experience"
          note="Revision history"
          lead="From a full-time role at SM Technology, to freelancing for clients in Bangladesh, to running my own agency."
        />
        <div
          aria-hidden="true"
          className="hidden grid-cols-[3.5rem_11rem_1fr] gap-x-8 border-t border-line-strong py-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted md:grid"
        >
          <span>Rev</span>
          <span>Date</span>
          <span>Description</span>
        </div>
        <ol className="border-t border-line-strong">
          {roles.map((role) => (
            <RoleRow key={role.rev} role={role} />
          ))}
        </ol>
      </div>
    </section>
  );
}
