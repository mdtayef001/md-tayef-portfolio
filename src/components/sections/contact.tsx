import { ArrowUpRight } from "lucide-react";
import { site, socials } from "@/data/site";
import { BrandIcon } from "@/components/ui/brand-icon";
import { CopyButton } from "@/components/ui/copy-button";
import { WavyRule } from "@/components/ui/redline";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-reveal
      className="border-t border-line bg-ground-sunk/70"
    >
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2
            id="contact-title"
            className="text-[clamp(2.75rem,8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink"
          >
            Have a project <span className="text-pen">in mind?</span>
          </h2>
          <WavyRule className="mt-6 h-3.5 w-48" />
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Looking for a developer to bring your ideas to life? Let&rsquo;s connect and build something amazing
            together.
          </p>

          <div className="mt-10">
            <p className="field-label">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="pen-link mt-2 inline-block break-all font-display text-[clamp(1.35rem,4.2vw,2.25rem)] font-bold tracking-[-0.02em] text-ink"
            >
              {site.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                data-magnetic
                href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
                className="inline-flex items-center gap-2 bg-pen px-5 py-2.5 text-sm font-semibold text-pen-ink transition-colors hover:bg-pen-soft rounded-[4px]"
              >
                Write an email
              </a>
              <CopyButton value={site.email} label="Copy address" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <h3 className="field-label">Find me on</h3>
          <ul className="mt-3 border-t border-line-strong">
            {socials.map((social) => {
              const body = (
                <>
                  <BrandIcon
                    glyph={social.glyph}
                    className="size-5 shrink-0 text-ink-soft transition-colors group-hover:text-pen"
                  />
                  <span className="flex-1">
                    <span className="block font-semibold text-ink">{social.label}</span>
                    <span className="block text-sm text-ink-muted">{social.handle}</span>
                  </span>
                </>
              );
              return (
                <li key={social.label} className="border-b border-line-strong">
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="group flex items-center gap-4 py-4 transition-colors hover:bg-ground-raised/70 sm:px-3"
                    >
                      {body}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-ink-muted transition-[color,translate] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pen"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 py-4 sm:px-3">
                      {body}
                      <span className="text-right text-xs leading-snug text-ink-muted">
                        Search this
                        <br />
                        username
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-8 leading-relaxed text-ink-soft">
            Working with a business? You can also reach me through my agency,{" "}
            <a
              href={site.agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pen-link font-semibold text-ink"
            >
              {site.agency.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
