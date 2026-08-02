import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="py-section-gap-mobile md:py-24">
      <Container>
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-cobalt uppercase">404</p>
          <h1 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">
            Page not found
          </h1>
          <p className="text-base leading-relaxed text-on-surface-variant">
            The page you requested does not exist or may have moved. Use the links below to continue
            browsing PackSendGo.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className={cn(
                "inline-flex min-h-11 items-center justify-center bg-signal-lime px-6",
                "text-sm font-semibold text-on-lime",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
              )}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={cn(
                "inline-flex min-h-11 items-center justify-center border border-outline/30 px-6",
                "text-sm font-semibold text-on-surface hover:border-outline/50",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
              )}
            >
              Services
            </Link>
            <Link
              href="/get-a-quote"
              className={cn(
                "inline-flex min-h-11 items-center justify-center border border-outline/30 px-6",
                "text-sm font-semibold text-on-surface hover:border-outline/50",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
              )}
            >
              Get a tailored quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
