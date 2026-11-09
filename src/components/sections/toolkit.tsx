import { Database } from "lucide-react";
import { skillGroups } from "@/data/site";
import { BrandIcon } from "@/components/ui/brand-icon";
import { SectionHeading } from "@/components/ui/section-heading";

/** Toolkit set as a drawing's materials schedule: one row per discipline. */
export function Toolkit() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="shell py-20 md:py-28">
      <SectionHeading
        id="toolkit"
        title="Toolkit"
        note="Schedule of materials"
        lead="The technologies I build with and the ideas underneath them, grouped by where they sit in a project."
      />

      <div className="border-t border-line-strong" role="list">
        {skillGroups.map((group) => (
          <div key={group.code} role="listitem" className="border-b border-line-strong py-1">
            <div className="group grid gap-x-8 gap-y-4 rounded-[4px] py-6 transition-colors duration-300 hover:bg-pen/10 md:grid-cols-[4.5rem_15rem_1fr] md:items-center md:px-4">
              <span className="hidden font-mono text-sm tracking-[0.14em] text-ink-muted md:block transition-colors duration-300 group-hover:text-pen">
                {group.code}
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">{group.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{group.note}</p>
              </div>
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-2.5 text-lg font-medium text-ink">
                    {skill.glyph ? (
                      <BrandIcon
                        glyph={skill.glyph}
                        className="size-5 shrink-0 text-ink-soft transition-colors duration-300 group-hover:text-pen"
                      />
                    ) : skill.name === "SQL" ? (
                      <Database
                        aria-hidden="true"
                        className="size-5 shrink-0 text-ink-soft transition-colors duration-300 group-hover:text-pen"
                      />
                    ) : null}
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
