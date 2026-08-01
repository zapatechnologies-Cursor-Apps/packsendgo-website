import { operationalCommitments } from "@/lib/homepage-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function OperationalCommitments() {
  return (
    <section
      id="operational-commitments"
      className="border-t border-outline/10 bg-surface-container py-section-gap-mobile md:py-24"
      aria-labelledby="operational-commitments-heading"
    >
      <Container>
        <SectionHeading title="Your fulfilment plan, clearly defined" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {operationalCommitments.map((item) => (
            <article
              key={item.title}
              className="border-t border-cobalt/30 pt-5"
            >
              <h3 className="font-display text-xl font-semibold text-on-surface">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
