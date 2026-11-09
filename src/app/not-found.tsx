import Link from "next/link";
import { WavyRule } from "@/components/ui/redline";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-5 py-24 sm:px-8">
      <h1 className="text-5xl font-extrabold tracking-[-0.04em] text-ink sm:text-6xl">
        Page not found<span className="text-pen">.</span>
      </h1>
      <WavyRule className="mt-6 h-3.5 w-44" />
      <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
        This page isn&rsquo;t part of the drawing set. Head back to the portfolio to see the work.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex w-fit items-center bg-pen px-6 py-3.5 font-semibold text-pen-ink transition-colors hover:bg-pen-soft rounded-[4px]"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
