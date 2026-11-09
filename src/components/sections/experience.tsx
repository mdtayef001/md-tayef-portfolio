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

function RoleCard({ role }: { role: Role }) {
  return (
    <li
      data-reveal
      data-hscroll-panel
      className={`relative flex flex-col rounded-[4px] border bg-ground-raised p-6 sm:p-8 ${
        role.current ? "border-pen/50" : "border-line-strong"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <RevMarker rev={role.rev} current={role.current} />
        <span className="font-mono text-sm text-ink-soft">
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
        </span>
      </div>

      <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">{role.title}</h3>
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

      <div data-panel-body className="mt-5 flex flex-1 flex-col">
        <p className="flex-1 leading-relaxed text-ink-soft">{role.summary}</p>

        {role.current && role.orgUrl ? (
          <a
            data-magnetic
            href={role.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex w-fit items-center gap-3 rounded-[4px] border border-pen px-5 py-3 font-semibold text-pen transition-colors hover:bg-pen hover:text-pen-ink"
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

/** Oldest first, so the horizontal path reads as a journey from left to right. */
const journey = [...roles].reverse();

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      data-hscroll
      className="overflow-hidden border-y border-line bg-ground-sunk/70"
    >
      {/* Giant outlined revision letters, drifting behind the cards (desktop scroll mode). */}
      <div data-hscroll-backdrop aria-hidden="true" className="hscroll-backdrop">
        {journey.map((role) => (
          <span key={role.rev}>{role.rev}</span>
        ))}
      </div>
      <div data-hscroll-frame className="shell py-20 md:py-28">
        <SectionHeading
          id="experience"
          title="Experience"
          note="Revision history"
          lead="From a full-time role at SM Technology, to freelancing for clients in Bangladesh, to running my own agency."
        />
        <ol data-hscroll-track className="grid gap-6 lg:grid-cols-3">
          {journey.map((role) => (
            <RoleCard key={role.rev} role={role} />
          ))}
        </ol>

        {/* Dimension line that fills as the journey scrolls (horizontal mode only). */}
        <div data-hscroll-progress aria-hidden="true" className="mt-10 hidden items-center gap-3">
          {journey.map((role, index) => (
            <span key={role.rev} className="contents">
              <span className="font-mono text-xs font-bold text-ink-muted">{role.rev}</span>
              {index < journey.length - 1 ? (
                <span className="relative h-px flex-1 overflow-hidden bg-line-strong">
                  <span
                    data-hscroll-fill
                    className="absolute inset-0 origin-left bg-pen"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
