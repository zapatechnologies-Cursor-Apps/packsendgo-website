import type { Metadata } from "next";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicQuoteCta } from "@/components/public/PublicQuoteCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutIntro, aboutPrinciples, aboutThemes } from "@/lib/public-pages-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About PackSendGo",
  description:
    "PackSendGo is a fulfilment partner for growing ecommerce brands. Practical warehousing, pick and pack, dispatch and returns with clear operational agreements.",
  openGraph: {
    title: "About PackSendGo | PackSendGo",
    description:
      "Who PackSendGo is and how we approach ecommerce fulfilment for growing brands.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="About"
        title="A fulfilment partner for growing brands"
        description={aboutIntro}
      />

      <section className="py-section-gap-mobile md:py-20">
        <Container>
          <div className="max-w-3xl space-y-4">
            <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
              {siteConfig.proposition} {siteConfig.description}
            </p>
            <p className="text-base leading-relaxed text-on-surface-variant">
              PackSendGo operates as a joint venture focused on ecommerce fulfilment. We combine
              storage, order handling and dispatch into service plans agreed with each client during
              onboarding.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-outline/10 bg-surface-container py-section-gap-mobile md:py-20">
        <Container>
          <SectionHeading title="How we work" />
          <div className="grid gap-6 md:grid-cols-2">
            {aboutThemes.map((theme) => (
              <article
                key={theme.title}
                className="border border-outline/20 bg-surface-panel p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-semibold text-on-surface">
                  {theme.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
                  {theme.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-outline/10 bg-background py-section-gap-mobile md:py-20">
        <Container>
          <SectionHeading
            title="Commitments agreed during onboarding"
            description="These points are confirmed in writing before service begins rather than assumed."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPrinciples.map((item) => (
              <div
                key={item.title}
                className="border border-outline/20 bg-surface-panel p-5 md:p-6"
              >
                <h2 className="font-display text-lg font-semibold text-on-surface">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PublicQuoteCta />
    </>
  );
}
