import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Database, Download, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { formatDate, learning, projects, resumePdf, roles, site, skillGroups, socials } from "@/data/site";
import { BrandIcon } from "@/components/ui/brand-icon";

/**
 * Resume / CV. On screen it follows the reference layout (one column, greeting,
 * wavy divider, dot timeline). Printed, the same page becomes the A4 PDF that
 * `npm run resume:pdf` writes to /public.
 */

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: `Resume | ${site.name}, ${site.role}`,
  description: `Resume of ${site.name}, a web developer in ${site.location}: experience, projects, skills and certificates.`,
  alternates: { canonical: "/resume" },
};

/** Visible link text without the protocol, e.g. "github.com/mdtayef001". */
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Squiggle() {
  return (
    <svg viewBox="0 0 180 12" className="h-3 w-44 print:hidden" aria-hidden="true">
      <path
        d="M2 8c7.5 0 7.5-5 15-5s7.5 5 15 5 7.5-5 15-5 7.5 5 15 5 7.5-5 15-5 7.5 5 15 5 7.5-5 15-5 7.5 5 15 5 7.5-5 15-5 7.5 5 15 5 7.5-5 15-5 7.5 5 15 5"
        fill="none"
        stroke="var(--r-accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Underlined({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-semibold text-(--r-strong) underline decoration-(--r-accent) decoration-2 underline-offset-[6px] transition-opacity hover:opacity-80 print:decoration-1 print:underline-offset-2"
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-20 print:mt-7">
      <h2
        id={id}
        className="text-[1.75rem] font-semibold tracking-tight text-(--r-strong) print:break-after-avoid print:border-b print:border-(--r-line) print:pb-1 print:text-[1.15rem] print:uppercase print:tracking-[0.08em]"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

const contactLinks = [
  { label: site.email, href: `mailto:${site.email}` },
  ...socials.flatMap((s) =>
    s.href && s.label !== "Instagram"
      ? [{ label: s.label === "WhatsApp" ? `WhatsApp ${s.handle}` : bare(s.href), href: s.href }]
      : [],
  ),
  { label: site.agency.host, href: site.agency.url },
];

export default function ResumePage() {
  return (
    <div className={`${outfit.className} resume min-h-dvh`}>
      <header className="shell-narrow flex items-center justify-between py-6 print:hidden">
        <Link href="/" className="group flex items-center gap-2 text-sm font-semibold text-(--r-strong)">
          <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-(--r-accent)">{"//"}</span>MT
          </span>
        </Link>
        <a
          href={resumePdf}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-(--r-accent) px-4 py-2.5 text-sm font-semibold text-[#0a1324] transition-opacity hover:opacity-90"
        >
          <Download aria-hidden="true" className="size-4" />
          Download PDF
        </a>
      </header>

      <main className="shell-narrow pb-24 pt-12 sm:pt-20 print:max-w-none print:p-0">
        {/* Heading */}
        <section aria-labelledby="name">
          <h1
            id="name"
            className="text-[clamp(2.5rem,7vw,3.25rem)] font-bold leading-tight tracking-tight text-(--r-strong) print:text-[2.1rem]"
          >
            <span className="print:hidden">Hey, I&rsquo;m </span>
            <span className="text-(--r-accent) print:text-(--r-strong)">{site.name}</span>
            <span className="print:hidden">!</span>
          </h1>
          <p className="mt-1 text-xl font-medium text-(--r-strong) print:text-[1.05rem] print:text-(--r-accent)">
            {site.role} &middot; {site.location}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] print:mt-2 print:gap-x-4 print:text-[0.85rem]">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-(--r-text) underline decoration-(--r-line) underline-offset-4 hover:text-(--r-strong) print:no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-xl leading-[1.7] print:mt-4 print:text-[0.95rem] print:leading-relaxed">
            {site.intro} Currently, I&rsquo;m running my own agency,{" "}
            <Underlined href={site.agency.url}>{site.agency.name}</Underlined>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 print:hidden">
            <a
              href={resumePdf}
              download
              className="inline-flex items-center gap-2.5 rounded-lg bg-(--r-accent) px-5 py-3 font-semibold text-[#0a1324] transition-opacity hover:opacity-90"
            >
              <Download aria-hidden="true" className="size-4.5" />
              Download resume (PDF)
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-semibold text-(--r-strong) hover:text-(--r-accent)"
            >
              <Mail aria-hidden="true" className="size-4.5" />
              Email me
            </a>
          </div>
          <div className="mt-10">
            <Squiggle />
          </div>
        </section>

        {/* Skills */}
        <Section id="skills" title="Skills">
          <dl className="mt-6 space-y-4 print:mt-3 print:space-y-1">
            {skillGroups.map((group) => (
              <div key={group.code} className="grid gap-x-6 gap-y-2 sm:grid-cols-[9rem_1fr] print:grid-cols-[8rem_1fr]">
                <dt className="font-semibold text-(--r-strong)">{group.title}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 print:gap-x-0 print:gap-y-0">
                    {group.skills.map((skill, index) => (
                      <li key={skill.name} className="flex items-center gap-2 text-(--r-strong) print:font-normal">
                        {skill.glyph ? (
                          <BrandIcon glyph={skill.glyph} className="size-[1.05rem] text-(--r-accent) print:hidden" />
                        ) : skill.name === "SQL" ? (
                          <Database aria-hidden="true" className="size-[1.05rem] text-(--r-accent) print:hidden" />
                        ) : null}
                        <span>
                          {skill.name}
                          {index < group.skills.length - 1 ? (
                            <span aria-hidden="true" className="hidden pr-1.5 print:inline">
                              ,
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* Work history */}
        <Section id="experience" title="Work History">
          <ol className="mt-8 border-l border-(--r-line) pl-8 print:mt-3 print:border-0 print:pl-0">
            {roles.map((role) => (
              <li key={role.rev} className="relative pb-10 last:pb-0 print:break-inside-avoid print:pb-3">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[2.4rem] top-1.5 size-3.5 rounded-full bg-(--r-accent) print:hidden ${
                    role.current ? "ring-4 ring-(--r-accent)/30" : ""
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <h3 className="text-xl font-semibold text-(--r-strong) print:text-base">{role.title}</h3>
                  <p className="text-sm text-(--r-muted)">{role.current ? "Present" : role.period}</p>
                </div>
                <p className="mt-1 text-sm text-(--r-muted)">
                  <span className="font-medium text-(--r-strong)">
                    {role.orgUrl ? <Underlined href={role.orgUrl}>{role.org}</Underlined> : role.org}
                  </span>
                  {` · ${role.facts.join(" · ")}`}
                </p>
                <p className="mt-2 leading-relaxed print:mt-1">{role.summary}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects">
          <ul className="mt-6 space-y-5 print:mt-3 print:space-y-3">
            {projects.map((project) => (
              <li
                key={project.sheet}
                className="rounded-xl border border-(--r-line) bg-(--r-card) p-6 print:break-inside-avoid print:rounded-none print:border-0 print:p-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold text-(--r-strong) print:text-base">
                    {project.name}
                    <span className="block text-base font-normal text-(--r-muted) sm:inline print:inline print:text-[0.95rem]">
                      <span className="hidden sm:inline print:inline"> &middot; </span>
                      {project.tagline}
                    </span>
                  </h3>
                  <div className="flex gap-4 text-sm print:w-full">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-(--r-strong) hover:text-(--r-accent)"
                    >
                      <span className="print:hidden">GitHub</span>
                      <span className="hidden print:inline">{bare(project.repo)}</span>
                      <ArrowUpRight aria-hidden="true" className="size-4 print:hidden" />
                      <span className="sr-only">: {project.name} (opens in a new tab)</span>
                    </a>
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-(--r-accent) print:hidden"
                      >
                        Live <ArrowUpRight aria-hidden="true" className="size-4" />
                        <span className="sr-only">: {project.name} (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
                <p className="mt-3 leading-relaxed print:mt-1">{project.description}</p>
                <p className="mt-3 text-sm text-(--r-muted) print:mt-1">
                  <span className="font-semibold text-(--r-strong)">Stack: </span>
                  {project.stack.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Certificates */}
        <Section id="certificates" title="Certificates">
          <p className="mt-4 leading-relaxed print:hidden">
            Courses completed on {learning.platform}. Each one links to its verified certificate.
          </p>
          <ol className="mt-6 divide-y divide-(--r-line) border-y border-(--r-line) print:mt-2 print:divide-y-0 print:border-0">
            {learning.certificates.map((certificate) => (
              <li
                key={certificate.href}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-3.5 print:py-0.5"
              >
                <a
                  href={certificate.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-(--r-strong) hover:text-(--r-accent) print:font-normal"
                >
                  {certificate.title}
                  <span className="hidden text-(--r-muted) print:inline"> &middot; {learning.platform}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-1.5 inline-block size-4 align-[-0.15em] text-(--r-accent) print:hidden"
                  />
                  <span className="sr-only"> on {learning.platform} (opens in a new tab)</span>
                </a>
                <time dateTime={certificate.awarded} className="text-sm text-(--r-muted)">
                  {formatDate(certificate.awarded)}
                </time>
              </li>
            ))}
          </ol>
        </Section>

        {/* Contact, screen only */}
        <section aria-labelledby="contact" className="mt-24 print:hidden">
          <h2 id="contact" className="text-[clamp(2.25rem,6vw,3rem)] font-bold tracking-tight text-(--r-strong)">
            Get in touch
          </h2>
          <p className="mt-4 text-xl leading-relaxed">Have a project in mind? Let&rsquo;s talk!</p>
          <div className="mt-8">
            <Squiggle />
          </div>
          <p className="mt-10 text-xl leading-[1.8]">
            You can reach me anytime at <Underlined href={`mailto:${site.email}`}>{site.email}</Underlined>
          </p>
        </section>
      </main>

      <footer className="border-t border-(--r-line) print:hidden">
        <div className="shell-narrow flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {site.name}</p>
          <Link href="/" className="text-sm font-medium text-(--r-strong) hover:text-(--r-accent)">
            Back to the portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
