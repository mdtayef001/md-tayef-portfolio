import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-strong">
      <div className="shell flex flex-col gap-4 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {site.name} &middot; {site.location}
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          Back to top
          <ArrowUp aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
