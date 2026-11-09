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
            <li key={certificate.href} className="border-b border-line-strong">
              <a
                href={certificate.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-8 gap-y-1 py-5 transition-colors duration-300 hover:bg-ground-raised/70 md:grid-cols-[9rem_1fr_auto] md:items-center md:px-4"
              >
                <time dateTime={certificate.awarded} className="font-mono text-sm text-ink-muted">
                  {formatDate(certificate.awarded, true)}
                </time>
                <span className="text-lg font-semibold text-ink sm:text-xl">{certificate.title}</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors group-hover:text-ink">
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
          className="mt-8 inline-flex items-center gap-2 border border-pen px-5 py-2.5 font-semibold text-pen transition-colors hover:bg-pen hover:text-pen-ink"
        >
          {platform} profile
          <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
    </section>
  );
}
