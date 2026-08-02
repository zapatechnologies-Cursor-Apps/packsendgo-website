import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicQuoteCta } from "@/components/public/PublicQuoteCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  serviceDetails,
  servicePageIntro,
  servicesTogetherCopy,
} from "@/lib/public-pages-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ecommerce Fulfilment Services",
  description:
    "Ecommerce fulfilment, warehousing, pick and pack, parcel dispatch and returns processing for growing brands. Services agreed during onboarding.",
  openGraph: {
    title: "Ecommerce Fulfilment Services | PackSendGo",
    description:
      "Structured fulfilment services for growing ecommerce brands, agreed during onboarding.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Services"
        title="Fulfilment services built around your operation"
        description="Five core capabilities that can be combined into one clear fulfilment plan."
      />

      <section className="py-section-gap-mobile md:py-20">
        <Container>
          <p className="max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            {servicePageIntro}
          </p>
        </Container>
      </section>

      {serviceDetails.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={cn(
            "border-t border-outline/10 py-section-gap-mobile md:py-20",
            index % 2 === 0 ? "bg-background" : "bg-surface-container",
          )}
        >
          <Container>
            <div
              className={cn(
                "grid items-center gap-8 lg:grid-cols-2 lg:gap-12",
                index % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="space-y-4">
                <div className="h-px w-16 bg-cobalt" aria-hidden />
                <h2 className="font-display text-2xl font-semibold text-on-surface md:text-3xl">
                  {service.title}
                </h2>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  {service.description}
                </p>
                <p className="text-base leading-relaxed text-on-surface">{service.detail}</p>
                <div className="border border-outline/15 bg-surface-panel p-4">
                  <p className="text-xs font-semibold tracking-[0.14em] text-cobalt uppercase">
                    Suited to
                  </p>
                  <p className="mt-2 text-sm text-on-surface">{service.suitedTo}</p>
                </div>
                <p className="text-sm text-on-surface-variant">
                  <span className="font-medium text-on-surface">Customer benefit: </span>
                  {service.benefit}
                </p>
              </div>
              <div className="relative min-h-56 overflow-hidden border border-outline/20 bg-surface-panel md:min-h-80">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: service.objectPosition }}
                />
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-outline/10 bg-background py-section-gap-mobile md:py-20">
        <Container>
          <SectionHeading
            title="How services work together"
            description={servicesTogetherCopy}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceDetails.map((service) => (
              <Link
                key={service.id}
                href={`#${service.id}`}
                className={cn(
                  "border border-outline/20 bg-surface-panel p-5 transition-colors",
                  "hover:border-outline/40 focus-visible:outline focus-visible:outline-2",
                  "focus-visible:outline-offset-2 focus-visible:outline-cobalt",
                )}
              >
                <h3 className="font-display text-lg font-semibold text-on-surface">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">{service.benefit}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <PublicQuoteCta
        links={[
          { label: "How it works", href: "/how-it-works" },
          { label: "Our warehouse", href: "/our-warehouse" },
        ]}
      />
    </>
  );
}
