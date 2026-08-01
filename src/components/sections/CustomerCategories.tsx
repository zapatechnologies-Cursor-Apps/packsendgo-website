import { customerCategories } from "@/lib/homepage-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CustomerCategories() {
  return (
    <section
      id="customer-categories"
      className="border-t border-outline/10 bg-background py-section-gap-mobile md:py-24"
      aria-labelledby="customer-categories-heading"
    >
      <Container>
        <SectionHeading
          title="Built for brands at every stage"
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {customerCategories.map((category) => (
            <article
              key={category.id}
              className="border border-outline/20 bg-deep-charcoal p-8 transition-colors hover:border-cobalt/40"
            >
              <div className="mb-4 h-px w-10 bg-cobalt" aria-hidden />
              <h3 className="font-display text-xl font-semibold text-on-surface md:text-2xl">
                {category.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
