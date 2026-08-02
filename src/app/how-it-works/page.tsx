import type { Metadata } from "next";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicQuoteCta } from "@/components/public/PublicQuoteCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { customerJourneyStages } from "@/lib/public-pages-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How PackSendGo Works",
  description:
    "From quotation enquiry to stock receipt, storage, pick and pack, dispatch and returns. A clear V1 fulfilment journey with no instant pricing.",
  openGraph: {
    title: "How PackSendGo Works | PackSendGo",
    description:
      "The PackSendGo customer journey from quotation to dispatch and returns handling.",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="How it works"
        title="A clear path from enquiry to dispatch"
        description="Five stages that reflect how PackSendGo works in practice. No self-service account, instant quotation or live tracking in the current release."
      />

      <section className="py-section-gap-mobile md:py-20">
        <Container>
          <SectionHeading
            title="The customer journey"
            description="Each stage is agreed before the next begins. You always know what we need from you and what PackSendGo handles."
            align="center"
          />
          <ol className="mx-auto max-w-4xl space-y-6">
            {customerJourneyStages.map((stage) => (
              <li
                key={stage.id}
                className="grid gap-4 border border-outline/20 bg-surface-panel p-6 md:grid-cols-[auto_1fr] md:gap-6 md:p-8"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    "border border-signal-lime bg-signal-lime text-sm font-semibold text-on-lime",
                  )}
                  aria-hidden
                >
                  {stage.step}
                </div>
                <div className="space-y-3">
                  <h2 className="font-display text-xl font-semibold text-on-surface md:text-2xl">
                    {stage.title}
                  </h2>
                  <p className="text-base font-medium text-on-surface">{stage.summary}</p>
                  <p className="text-sm leading-relaxed text-on-surface-variant md:text-base">
                    {stage.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-outline/10 bg-surface-container py-section-gap-mobile md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">
                What you provide
              </h2>
              <ul className="mt-4 space-y-3">
                {customerJourneyStages.map((stage) => (
                  <li
                    key={`customer-${stage.id}`}
                    className="border-l-2 border-cobalt/40 pl-4 text-sm leading-relaxed text-on-surface-variant md:text-base"
                  >
                    <span className="font-medium text-on-surface">{stage.title}: </span>
                    {stage.customerProvides}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">
                What PackSendGo handles
              </h2>
              <ul className="mt-4 space-y-3">
                {customerJourneyStages.map((stage) => (
                  <li
                    key={`packsendgo-${stage.id}`}
                    className="border-l-2 border-signal-lime/50 pl-4 text-sm leading-relaxed text-on-surface-variant md:text-base"
                  >
                    <span className="font-medium text-on-surface">{stage.title}: </span>
                    {stage.packSendGoHandles}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <PublicQuoteCta
        links={[
          { label: "View services", href: "/services" },
          { label: "Our warehouse", href: "/our-warehouse" },
        ]}
      />
    </>
  );
}
