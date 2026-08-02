import { Container } from "@/components/ui/Container";

type PublicPageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PublicPageHero({ eyebrow, title, description }: PublicPageHeroProps) {
  return (
    <section className="border-b border-outline/10 bg-surface-container">
      <Container className="py-section-gap-mobile md:py-20">
        <div className="max-w-3xl space-y-4">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.18em] text-cobalt uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-3xl font-semibold text-on-surface md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
