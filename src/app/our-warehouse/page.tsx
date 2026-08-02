import type { Metadata } from "next";
import Image from "next/image";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicQuoteCta } from "@/components/public/PublicQuoteCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { warehouseTourImage } from "@/lib/homepage-data";
import { warehouseAreas, warehouseStandards } from "@/lib/public-pages-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Warehouse",
  description:
    "Storage, picking, packing, dispatch and returns handling for ecommerce fulfilment. Operational standards agreed during onboarding.",
  openGraph: {
    title: "Our Warehouse | PackSendGo",
    description:
      "How PackSendGo approaches warehouse operations for ecommerce fulfilment.",
  },
};

export default function OurWarehousePage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Our warehouse"
        title="Where your products are stored and prepared"
        description="Structured receiving, storage, picking, packing, dispatch and returns workflows agreed before service begins."
      />

      <section className="py-section-gap-mobile md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="space-y-4">
              <SectionHeading
                title="Operational areas"
                description="Each area below reflects how PackSendGo approaches fulfilment. Procedures, cut-offs and coverage are confirmed during onboarding."
              />
            </div>
            <div className="relative min-h-56 overflow-hidden border border-outline/20 bg-surface-panel md:min-h-72">
              <Image
                src={warehouseTourImage.src}
                alt={warehouseTourImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: warehouseTourImage.objectPosition }}
              />
              <p className="absolute bottom-0 left-0 right-0 bg-surface-overlay/80 px-3 py-2 text-xs text-on-surface-variant">
                Representative warehouse imagery
              </p>
            </div>
          </div>
        </Container>
      </section>

      {warehouseAreas.map((area, index) => (
        <section
          key={area.id}
          className={cn(
            "border-t border-outline/10 py-section-gap-mobile md:py-16",
            index % 2 === 0 ? "bg-surface-container" : "bg-background",
          )}
        >
          <Container>
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold tracking-[0.14em] text-cobalt uppercase">
                {area.chapter}
              </p>
              <h2 className="font-display text-2xl font-semibold text-on-surface md:text-3xl">
                {area.title}
              </h2>
              <p className="text-base leading-relaxed text-on-surface-variant">
                {area.description}
              </p>
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-outline/10 bg-background py-section-gap-mobile md:py-20">
        <Container>
          <SectionHeading title="Practical warehouse standards" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {warehouseStandards.map((item) => (
              <li
                key={item}
                className="flex gap-3 border border-outline/20 bg-surface-panel p-4 text-sm leading-relaxed text-on-surface-variant"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-lime" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="warehouse-tour"
        className="border-t border-outline/10 bg-surface-container py-section-gap-mobile md:py-20"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-cobalt uppercase">
              Virtual tour
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-on-surface md:text-3xl">
              Warehouse tour coming soon
            </h2>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              A guided warehouse walkthrough will be added here when approved media is available.
              Photography on this page uses licensed stock imagery and does not show a specific
              PackSendGo facility.
            </p>
          </div>
        </Container>
      </section>

      <PublicQuoteCta
        links={[
          { label: "View services", href: "/services" },
          { label: "How it works", href: "/how-it-works" },
        ]}
      />
    </>
  );
}
