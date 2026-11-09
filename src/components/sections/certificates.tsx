import { ArrowUpRight } from "lucide-react";
import { formatDate, learning } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function Certificates() {
  const { certificates, platform, profileUrl } = learning;

  return (
    <section id="certificates" aria-labelledby="certificates-title" className="shell py-20 md:py-28">
      <SectionHeading
        id="certificates"
        title="Certificates"
        note={`${certificates.length} from ${platform}`}
        lead={`I learn by building. ${platform} teaches backend development and computer science through hands-on, project-based courses, and each certificate below links to its verified page.`}
      />

      <div className="border-t border-line-strong">
        <div
          aria-hidden="true"
          className="hidden grid-cols-[9rem_1fr_auto] gap-x-8 border-b border-line-strong px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted md:grid"
        >
          <span>Awarded</span>
          <span>Certificate</span>
          <span>Record</span>
        </div>
        <ol>
          {certificates.map((certificate) => (
            <li key={certificate.href} className="border-b border-line-strong py-1">
              <a
                href={certificate.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-8 gap-y-1 rounded-[4px] py-4 transition-[background-color,padding] duration-500 ease-out-expo hover:bg-pen/10 focus-visible:bg-pen/10 md:grid-cols-[9rem_1fr_auto] md:items-start md:px-4 md:hover:py-6 md:focus-visible:py-6"
              >
                <time
                  dateTime={certificate.awarded}
                  className="font-mono text-sm text-ink-muted transition-colors group-hover:text-pen md:pt-1.5"
                >
                  {formatDate(certificate.awarded, true)}
                </time>
                <span className="min-w-0">
                  <span className="block text-lg font-semibold text-ink transition-colors sm:text-xl">
                    {certificate.title}
                  </span>
                  {/* Subtitle band: always shown on touch, slides open on hover or focus elsewhere. */}
                  <span className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out-expo [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="rounded-[2px] bg-pen px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-pen-ink">
                          {certificate.topic}
                        </span>
                        <span className="text-sm text-ink-soft">Completed on {platform}</span>
                      </span>
                    </span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors group-hover:text-ink md:pt-1.5">
                  View certificate
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-pen transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only"> on {platform} (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      {profileUrl ? (
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 border border-pen px-5 py-2.5 font-semibold text-pen transition-colors hover:bg-pen hover:text-pen-ink rounded-[4px]"
        >
          {platform} profile
          <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
    </section>
  );
}
