import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PublicQuoteCtaProps = {
  title?: string;
  description?: string;
  links?: { label: string; href: string }[];
};

export function PublicQuoteCta({
  title = "Ready to discuss your fulfilment plan?",
  description = "Share your order volumes, stock profile and sales channels. Our team will review your requirements and respond with a tailored proposal.",
  links = [],
}: PublicQuoteCtaProps) {
  return (
    <section
      className="border-t border-outline/10 bg-surface-promo py-section-gap-mobile md:py-20"
      aria-labelledby="public-quote-cta-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="public-quote-cta-heading"
            className="font-display text-2xl font-semibold text-on-surface-promo md:text-4xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-on-surface-promo-variant">
            {description}
          </p>
          <Link
            href="/get-a-quote"
            className={cn(
              "mt-6 inline-flex min-h-11 items-center justify-center bg-signal-lime px-8",
              "text-sm font-semibold text-on-lime md:text-base",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
            )}
          >
            Get a tailored quote
          </Link>
          <p className="mt-4 text-sm text-on-surface-promo-variant">
            No account required. No instant or binding pricing.
          </p>
          {links.length > 0 ? (
            <nav
              aria-label="Related pages"
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-signal-lime hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
