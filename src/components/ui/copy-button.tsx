"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <button
      data-magnetic
      type="button"
      data-cursor="Copy"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-ink-soft hover:text-ink rounded-[4px]"
    >
      {state === "copied" ? (
        <Check aria-hidden="true" className="size-4 text-pen" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      {state === "copied" ? "Copied" : state === "failed" ? "Copy failed, select the text" : label}
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? `${value} copied to clipboard` : ""}
      </span>
    </button>
  );
}
