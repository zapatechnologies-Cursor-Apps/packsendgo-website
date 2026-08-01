import { HeroShell } from "@/components/sections/HeroShell";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <>
      <HeroShell />
      <Container as="section" className="py-section-gap-mobile md:py-24">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">
            Frontend foundation ready
          </h2>
          <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
            Phase 2 establishes the Next.js application shell, theme system and
            component boundaries. The approved Stitch homepage sections will be
            implemented in Phase 3.
          </p>
        </div>
      </Container>
    </>
  );
}
