import Link from "next/link";
import { WarehouseHeroBoundary } from "@/components/three/WarehouseHeroBoundary";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      className="relative min-h-[min(92vh,56rem)] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <WarehouseHeroBoundary />

      <Container className="relative z-10 flex min-h-[min(92vh,56rem)] flex-col justify-center py-16 md:py-24">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-cobalt uppercase">
            Premium ecommerce fulfilment
          </p>
          <h1
            id="hero-heading"
            className={cn(
              "font-display text-4xl leading-[1.05] font-bold tracking-tight text-on-surface md:text-6xl",
            )}
          >
            {siteConfig.proposition}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-on-surface md:text-lg">
            {siteConfig.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/get-a-quote"
              className={cn(
                "inline-flex min-h-11 items-center justify-center bg-signal-lime px-6 text-sm font-semibold",
                "text-midnight-graphite hover:brightness-95 active:brightness-90",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
              )}
            >
              {siteConfig.primaryCta}
            </Link>
            <Link
              href="#warehouse-tour"
              className={cn(
                "inline-flex min-h-11 items-center justify-center px-6 text-sm font-semibold",
                "border border-on-surface/35 text-on-surface hover:border-on-surface/60",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
              )}
            >
              {siteConfig.secondaryCta}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
