import { salesChannels } from "@/lib/homepage-data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SalesChannels() {
  return (
    <section
      id="sales-channels"
      className="border-y border-outline/10 bg-surface-container py-section-gap-mobile md:py-24"
      aria-labelledby="sales-channels-heading"
    >
      <Container>
        <SectionHeading
          title="Built around the way you sell"
          description="We assess your sales channels and order workflow during onboarding, then agree the most suitable operational setup for your business."
          align="center"
        />

        <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-4">
          {salesChannels.map((channel, index) => (
            <li key={channel} className="flex items-center gap-4">
              <span className="font-display text-2xl font-semibold text-on-surface md:text-3xl">
                {channel}
              </span>
              {index < salesChannels.length - 1 ? (
                <span aria-hidden className="hidden text-cobalt sm:inline">
                  |
                </span>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-on-surface-variant">
          Channel connectivity is confirmed during onboarding. Displaying a platform
          does not imply a direct native integration.
        </p>
      </Container>
    </section>
  );
}
