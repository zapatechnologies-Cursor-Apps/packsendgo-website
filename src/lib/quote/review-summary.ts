import type { QuoteFormValues } from "@/lib/quote/schema";
import {
  buildQuotationDocument,
  formatOptionalAnswer,
  labelsForValues,
} from "@/lib/quote/quotation-document";

export type ReviewRow = {
  label: string;
  value: string;
  optional?: boolean;
  unanswered?: boolean;
};

export { formatOptionalAnswer, labelsForValues };

export function buildReviewSections(values: QuoteFormValues) {
  const now = new Date();
  const document = buildQuotationDocument(
    {
      values,
      reference: "",
      submittedAt: now,
      privacyConsentAt: now,
      marketingConsentAt: values.marketingConsent ? now : null,
      accuracyConfirmationAt: now,
    },
    "customer",
  );

  return document.sections
    .filter((section) => section.reviewStep)
    .map((section) => ({
      step: section.reviewStep!,
      title:
        section.reviewStep === 1
          ? "Contact and company"
          : section.reviewStep === 2
            ? "Business and sales channels"
            : section.reviewStep === 3
              ? "Orders and stock"
              : "Delivery and additional services",
      emphasis: section.emphasis,
      rows: section.rows.map((row) => ({
        label: row.label,
        value: Array.isArray(row.value) ? row.value.join(", ") : row.value,
        optional: row.optional,
        unanswered: row.unanswered,
      })) satisfies ReviewRow[],
    }));
}
