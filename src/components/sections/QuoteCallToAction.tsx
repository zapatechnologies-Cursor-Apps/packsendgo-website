import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function QuoteCallToAction() {
  return (
    <section
      id="quote"
      className="relative overflow-hidden border-t border-outline/10 bg-midnight-graphite py-section-gap-mobile md:py-24"
      aria-labelledby="quote-cta-heading"
    >
      <Container className="relative z-10 text-center">
        <h2
          id="quote-cta-heading"
          className="mx-auto max-w-4xl font-display text-3xl leading-tight font-semibold text-on-surface md:text-5xl"
        >
          Tell us what you need. We&apos;ll build the fulfilment plan around your
          business.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
          Share your order volumes, stock profile and sales channels. Our team will
          review your requirements and respond with a tailored proposal.
        </p>
        <Link
          href="/get-a-quote"
          className={cn(
            "mt-8 inline-flex min-h-11 items-center justify-center bg-signal-lime px-8 py-3",
            "text-sm font-semibold text-midnight-graphite md:text-base",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
          )}
        >
          Get a tailored quote
        </Link>
        <p className="mt-5 text-sm text-on-surface-variant">
          No account required. No instant or binding pricing.
        </p>
      </Container>
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-cobalt/5 blur-3xl"
        aria-hidden
      />
    </section>
  );
}
