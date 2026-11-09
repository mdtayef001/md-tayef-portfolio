import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import portrait from "@/assets/tayef.png";
import { site } from "@/data/site";
import { LeaderArrow, WavyRule } from "@/components/ui/redline";

const titleBlock = [
  { label: "Drawn by", value: site.name },
  { label: "Location", value: site.location },
  { label: "Current", value: site.agency.name, href: site.agency.url },
  { label: "Status", value: "Open to new opportunities" },
] as const;

function DimensionLine({ label, vertical = false }: { label: string; vertical?: boolean }) {
  const tick = vertical ? "h-px w-3" : "h-3 w-px";
  const run = vertical ? "w-px flex-1" : "h-px flex-1";
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-2 text-ink-muted ${vertical ? "h-full w-4 flex-col" : "h-4 w-full"}`}
    >
      <span className={`${tick} bg-line-strong`} />
      <span className={`${run} bg-line-strong`} />
      <span
        className={`font-mono text-[0.65rem] uppercase tracking-[0.16em] ${
          vertical ? "rotate-180 [writing-mode:vertical-rl]" : ""
        }`}
      >
        {label}
      </span>
      <span className={`${run} bg-line-strong`} />
      <span className={`${tick} bg-line-strong`} />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" data-reveal className="relative">
      <div className="shell grid gap-14 pb-16 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-20">
        <div className="lg:col-span-7 lg:pt-6">
          <h1
            id="hero-title"
            className="text-[clamp(3.75rem,13vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink"
          >
            Md Tayef<span className="text-pen">.</span>
          </h1>
          <WavyRule className="mt-5 h-3.5 w-48" />

          <p className="mt-8 max-w-[24ch] font-display text-[clamp(1.6rem,3.6vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
            Web developer building sites that look good <span className="text-pen">and solve real problems.</span>
          </p>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-soft">{site.intro}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2.5 bg-pen px-6 py-3.5 font-semibold text-pen-ink transition-[background-color,translate] duration-300 hover:-translate-y-0.5 hover:bg-pen-soft"
            >
              <Mail className="size-4.5" aria-hidden="true" />
              Start a project
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 border border-line-strong px-6 py-3.5 font-semibold text-ink transition-colors duration-300 hover:border-ink-soft"
            >
              See the work
              <ArrowDown
                className="size-4.5 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* Portrait mounted as a dimensioned drawing detail. */}
        <figure className="settle relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-[1rem_1fr] grid-rows-[1rem_1fr] gap-3">
            <span />
            <DimensionLine label="Detail A" />
            <DimensionLine label="Scale 1:1" vertical />
            <div className="relative border border-line-strong bg-ground-raised p-2.5">
              {/* Corner registration ticks */}
              <span aria-hidden="true" className="absolute -left-px -top-px size-4 border-l-2 border-t-2 border-pen" />
              <span
                aria-hidden="true"
                className="absolute -bottom-px -right-px size-4 border-b-2 border-r-2 border-pen"
              />
              <Image
                src={portrait}
                alt="Portrait of Md Tayef wearing a green cap and an olive sweatshirt"
                placeholder="blur"
                sizes="(min-width: 1440px) 560px, (min-width: 1024px) 40vw, (min-width: 640px) 448px, 90vw"
                loading="eager"
                fetchPriority="high"
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>

          <figcaption className="relative mt-5 pl-7">
            <LeaderArrow
              delay={0.9}
              className="pointer-events-none absolute -top-3 left-56 hidden h-12 w-20 -scale-100 sm:block"
            />
            <span className="field-label block">Currently building</span>
            <a
              href={site.agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center gap-1.5 font-display text-xl font-bold text-ink transition-colors hover:text-pen-soft"
            >
              {site.agency.name}
              <ArrowUpRight
                className="size-5 text-pen transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </figcaption>
        </figure>
      </div>

      {/* Sheet title block */}
      <div className="shell">
        <dl className="grid grid-cols-2 border border-line-strong bg-ground/80 md:grid-cols-4">
          {titleBlock.map((cell, index) => (
            <div
              key={cell.label}
              className={`border-line-strong px-4 py-3.5 ${index % 2 === 1 ? "border-l" : ""} ${
                index >= 2 ? "border-t md:border-t-0" : ""
              } ${index === 2 ? "md:border-l" : ""}`}
            >
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted">{cell.label}</dt>
              <dd className="mt-1 flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
                {cell.label === "Status" ? (
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-pen opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-pen" />
                  </span>
                ) : null}
                {"href" in cell ? (
                  <a href={cell.href} target="_blank" rel="noopener noreferrer" className="pen-link">
                    {cell.value}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  cell.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
