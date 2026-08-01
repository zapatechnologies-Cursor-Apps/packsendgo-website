import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Get a tailored quote",
  description:
    "Tell PackSendGo about your fulfilment requirements. No account required. No instant or binding pricing.",
};

export default function GetAQuotePage() {
  return (
    <Container className="py-section-gap-mobile md:py-24">
      <div className="mx-auto max-w-4xl space-y-4">
        <p className="text-sm text-on-surface-variant">
          Share your order volumes, stock profile and sales channels. PackSendGo will review your
          requirements and respond with a tailored proposal.
        </p>
        <p className="text-sm text-on-surface-variant">
          No account required. No instant or binding pricing.
        </p>
        <QuoteForm />
      </div>
    </Container>
  );
}
