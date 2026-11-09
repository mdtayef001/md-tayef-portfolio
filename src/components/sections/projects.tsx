import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { projects, type FlowNode, type Project } from "@/data/site";
import { BrandIcon } from "@/components/ui/brand-icon";
import { CircleMark } from "@/components/ui/redline";
import { SectionHeading } from "@/components/ui/section-heading";

function Flow({ nodes, caption }: { nodes: FlowNode[]; caption: string }) {
  return (
    <figure>
      <ol data-flow className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
        {nodes.map((node, index) => (
          <li key={node.label} data-flow-step className="flex flex-col items-stretch sm:flex-1 sm:flex-row">
            <div className="flex-1 border border-line-strong bg-ground px-3 py-2.5 rounded-[2px]">
              <span className="block text-sm font-semibold leading-snug text-ink">{node.label}</span>
              {node.detail ? (
                <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{node.detail}</span>
              ) : null}
            </div>
            {index < nodes.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="mx-auto my-0.5 size-4 shrink-0 rotate-90 self-center text-ink-muted sm:mx-1.5 sm:my-0 sm:rotate-0"
              />
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

/** Renders a highlight, circling the sheet's marked phrase in redline. */
function Highlight({ text, mark }: { text: string; mark: string }) {
  const at = text.indexOf(mark);
  if (at === -1) return <>{text}</>;
  const after = text.slice(at + mark.length);
  // The ring overhangs its phrase: clear a full space before a following word, a tight one before punctuation.
  const trailing = /^[\s]*[A-Za-z0-9]/.test(after) ? "mr-3.5" : "mr-2";
  return (
    <>
      {text.slice(0, at)}
      <span className={`relative ml-3.5 inline-block whitespace-nowrap font-semibold ${trailing}`}>
        {mark}
        <CircleMark
          className="pointer-events-none absolute -left-3.5 -top-2 h-[calc(100%+1rem)] w-[calc(100%+1.75rem)]"
          delay={0.6}
        />
      </span>
      {after}
    </>
  );
}

function BlockCell({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`border-line-strong px-4 py-3 ${className}`}>
      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-ink">{children}</dd>
    </div>
  );
}

function BlockLink({ href, children, label }: { href: string; children: ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-ink transition-colors hover:text-pen-soft"
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 text-pen transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="sr-only">{label} (opens in a new tab)</span>
    </a>
  );
}

function ProjectSheet({ project, index }: { project: Project; index: number }) {
  const titleId = `${project.sheet}-title`;
  return (
    <article
      aria-labelledby={titleId}
      data-reveal
      className="sheet transition-opacity duration-500 ease-out-expo"
      style={{ "--stack-index": index } as CSSProperties}
    >
      <div
        data-sheet-paper
        className="settle relative border border-line-strong bg-ground-raised rounded-[4px] overflow-hidden"
      >
        {/* Registration marks on the sheet frame */}
        <span
          aria-hidden="true"
          className="absolute -left-px -top-px size-3 border-l-2 border-t-2 border-ink-muted rounded-tl-[4px]"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-px -right-px size-3 border-b-2 border-r-2 border-ink-muted rounded-br-[4px]"
        />

        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <h3 id={titleId} className="text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-1.5 text-lg text-ink-soft">{project.tagline}</p>
            <p className="mt-6 max-w-[60ch] leading-relaxed text-ink-soft">{project.description}</p>
            <ul className="mt-6 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="grid grid-cols-[1.25rem_1fr] text-[0.95rem] leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-2.5 bg-ink-muted" />
                  <span>
                    <Highlight text={item} mark={project.mark} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h4 className="field-label mb-3">How it works</h4>
              <Flow nodes={project.flow} caption={project.flowCaption} />
            </div>
            <div>
              <h4 className="field-label mb-3">Built with</h4>
              <div className="flex gap-2.5 text-ink-soft">
                {project.glyphs.map((glyph) => (
                  <BrandIcon key={glyph.title} glyph={glyph} className="size-5" />
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-1 gap-y-1.5 text-sm text-ink-soft">
                {project.stack.map((tech, index) => (
                  <li key={tech}>
                    {tech}
                    {index < project.stack.length - 1 ? (
                      <span aria-hidden="true" className="pl-1 text-line-strong">
                        /
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Title block */}
        <dl className="grid grid-cols-2 border-t border-line-strong bg-ground/60 sm:grid-cols-4">
          <BlockCell label="Sheet">{project.sheet}</BlockCell>
          <BlockCell label="Stack" className="border-l">
            {project.primary}
          </BlockCell>
          <BlockCell label="Source" className="border-t sm:border-l sm:border-t-0">
            <BlockLink href={project.repo} label={`${project.name} source on GitHub`}>
              GitHub
            </BlockLink>
          </BlockCell>
          <BlockCell label="Live" className="border-l border-t sm:border-t-0">
            {project.live ? (
              <BlockLink href={project.live} label={`${project.name} live site`}>
                View site
              </BlockLink>
            ) : (
              <span className="font-normal text-ink-muted">Source only</span>
            )}
          </BlockCell>
        </dl>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="shell py-20 md:py-28">
      <SectionHeading
        id="work"
        title="Selected work"
        note={`${projects.length} sheets`}
        lead="Three projects, each drawn from its real architecture: a SaaS platform, an AI agent and a static site generator written from scratch."
      />
      <div data-sheet-stack className="sheet-set flex flex-col gap-8 md:gap-10">
        {projects.map((project, index) => (
          <ProjectSheet key={project.sheet} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
