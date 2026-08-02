import Link from "next/link";
import { SUCCESS_HEADLINE, SUCCESS_SUPPORTING } from "@/lib/quote/constants";

export function QuoteSuccess({ reference }: { reference: string }) {
  return (
    <section className="mx-auto max-w-2xl space-y-6 text-center">
      <h1 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">{SUCCESS_HEADLINE}</h1>
      <p className="text-base leading-relaxed text-on-surface-variant">{SUCCESS_SUPPORTING}</p>
      <div className="border border-outline/20 bg-surface-container/40 p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-cobalt uppercase">Quotation reference</p>
        <p className="mt-2 font-mono text-2xl font-semibold text-signal-lime">{reference}</p>
      </div>
      <p className="text-sm text-on-surface-variant">
        No instant or binding pricing is provided. PackSendGo will review your enquiry manually.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center justify-center bg-signal-lime px-6 text-sm font-semibold text-on-lime"
      >
        Return to homepage
      </Link>
    </section>
  );
}
