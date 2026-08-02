import type { QuoteFormValues } from "@/lib/quote/schema";
import {
  ADDITIONAL_SERVICES,
  BUSINESS_STAGES,
  COUNTRIES,
  CURRENT_FULFILMENT,
  DELIVERY_REGIONS,
  ENQUIRY_REASONS,
  GROWTH_EXPECTATIONS,
  ITEMS_PER_ORDER,
  labelForValue,
  MONTHLY_ORDER_RANGES,
  PARCEL_DIMENSIONS,
  PREFERRED_CONTACT_METHODS,
  PRODUCT_CATEGORIES,
  PRODUCT_WEIGHTS,
  REQUIRED_START_DATES,
  RETURNS_VOLUMES,
  SALES_CHANNELS,
  SEASONAL_PEAKS,
  SKU_COUNTS,
  SPECIAL_COURIER_OPTIONS,
  SPECIAL_HANDLING,
  STOCK_VOLUMES,
  STORAGE_TYPES,
  TRACKING_REQUIRED,
} from "@/lib/quote/constants";
import { packSendGoContact } from "@/lib/legal-data";

export type QuotationDocumentAudience = "internal" | "customer";

export type QuotationDocumentRow = {
  label: string;
  value: string | string[];
  optional?: boolean;
  unanswered?: boolean;
  omitWhenEmpty?: boolean;
};

export type QuotationDocumentSection = {
  id: string;
  title: string;
  emphasis?: string;
  reviewStep?: number;
  rows: QuotationDocumentRow[];
};

export type QuotationDocumentViewModel = {
  audience: QuotationDocumentAudience;
  reference: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  submittedAt: string;
  title: string;
  disclaimer: string;
  supportEmail: string;
  sections: QuotationDocumentSection[];
};

export type QuotationDocumentSource = {
  values: QuoteFormValues;
  reference: string;
  submittedAt: Date;
  privacyConsentAt: Date;
  marketingConsentAt: Date | null;
  accuracyConfirmationAt: Date;
};

export const QUOTATION_DOCUMENT_TITLE = "PackSendGo Quotation Request Summary";
export const QUOTATION_DOCUMENT_DISCLAIMER =
  "This document summarises a quotation request submitted to PackSendGo. It is not a formal quotation, price offer or service agreement.";

export function getQuotationPdfFilename(reference: string): string {
  return `PackSendGo-Quotation-Request-${reference}.pdf`;
}

export function formatBritishDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(date);
}

export function formatOptionalAnswer(
  value: string | undefined,
  formatter?: (raw: string) => string,
): string {
  if (!value) return "Not provided";
  return formatter ? formatter(value) : value;
}

export function labelsForValues<T extends readonly { value: string; label: string }[]>(
  options: T,
  values: string[] | undefined,
): string {
  if (!values?.length) return "Not provided";
  return values.map((value) => labelForValue(options, value)).join(", ");
}

function formatBoolean(value: boolean): string {
  return value ? "Yes" : "No";
}

function formatConsentTimestamp(date: Date | null, audience: QuotationDocumentAudience): string {
  if (audience === "customer") {
    return "Confirmed";
  }
  return date ? formatBritishDateTime(date) : "Not recorded";
}

function row(
  label: string,
  value: string | string[] | undefined,
  options?: Pick<QuotationDocumentRow, "optional" | "unanswered" | "omitWhenEmpty">,
): QuotationDocumentRow | null {
  if (options?.omitWhenEmpty && (!value || (Array.isArray(value) && value.length === 0))) {
    return null;
  }

  const resolvedValue = Array.isArray(value)
    ? value
    : value || (options?.optional ? "Not provided" : "");

  if (typeof resolvedValue === "string" && resolvedValue === "" && options?.omitWhenEmpty) {
    return null;
  }

  return {
    label,
    value: resolvedValue,
    optional: options?.optional,
    unanswered: options?.unanswered,
    omitWhenEmpty: options?.omitWhenEmpty,
  };
}

function compactRows(rows: Array<QuotationDocumentRow | null>): QuotationDocumentRow[] {
  return rows.filter((entry): entry is QuotationDocumentRow => entry !== null);
}

export function buildQuotationDocument(
  source: QuotationDocumentSource,
  audience: QuotationDocumentAudience,
): QuotationDocumentViewModel {
  const { values, reference, submittedAt, privacyConsentAt, marketingConsentAt, accuracyConfirmationAt } =
    source;
  const switchingProvider =
    values.businessStage === "switching_provider" || values.currentFulfilment === "third_party";

  const sections: QuotationDocumentSection[] = [
    {
      id: "request-details",
      title: "Request details",
      rows: compactRows([
        row("Request reference", reference),
        row("Submitted", formatBritishDateTime(submittedAt)),
      ]),
    },
    {
      id: "contact-and-company",
      title: "Company and contact",
      reviewStep: 1,
      rows: compactRows([
        row("Your name", values.contactName),
        row("Company name", values.companyName),
        row("Email address", values.email),
        row("Telephone", values.telephone),
        row("Website or store URL", values.websiteUrl, {
          optional: true,
          unanswered: !values.websiteUrl,
          omitWhenEmpty: true,
        }),
        row("Country", labelForValue(COUNTRIES, values.country)),
        row(
          "Preferred contact method",
          labelForValue(PREFERRED_CONTACT_METHODS, values.preferredContactMethod),
        ),
      ]),
    },
    {
      id: "business-and-sales-channels",
      title: "Website and sales channels",
      reviewStep: 2,
      emphasis: switchingProvider
        ? audience === "internal"
          ? "The customer indicated they are switching or currently using a third-party fulfilment provider. Review continuity and migration requirements carefully."
          : "You indicated you are switching or currently using a third-party fulfilment provider. Our team will review continuity and migration requirements carefully."
        : undefined,
      rows: compactRows([
        row("Business stage", labelForValue(BUSINESS_STAGES, values.businessStage)),
        row(
          "Product category",
          values.productCategory === "other"
            ? `Other — ${values.productCategoryOther || "Not provided"}`
            : labelForValue(PRODUCT_CATEGORIES, values.productCategory),
        ),
        row(
          "Current fulfilment arrangement",
          labelForValue(CURRENT_FULFILMENT, values.currentFulfilment),
        ),
        row(
          "Desired start date",
          values.requiredStartDate
            ? labelForValue(REQUIRED_START_DATES, values.requiredStartDate)
            : undefined,
          { optional: true, unanswered: !values.requiredStartDate, omitWhenEmpty: true },
        ),
        row("Primary reason for enquiry", labelForValue(ENQUIRY_REASONS, values.enquiryReason)),
        row(
          "Sales channels",
          values.salesChannels.map((channel) => labelForValue(SALES_CHANNELS, channel)),
        ),
        row("Other marketplace details", values.salesChannelOther, { omitWhenEmpty: true }),
        row("Custom platform details", values.customPlatformDetails, { omitWhenEmpty: true }),
      ]),
    },
    {
      id: "orders-and-stock",
      title: "Orders and stock",
      reviewStep: 3,
      rows: compactRows([
        row(
          "Approximate monthly orders",
          labelForValue(MONTHLY_ORDER_RANGES, values.monthlyOrderRange),
        ),
        row("Number of SKUs", labelForValue(SKU_COUNTS, values.skuCount)),
        row("Average items per order", labelForValue(ITEMS_PER_ORDER, values.itemsPerOrder)),
        row(
          "Seasonal volume changes",
          values.seasonalPeaks ? labelForValue(SEASONAL_PEAKS, values.seasonalPeaks) : undefined,
          { optional: true, unanswered: !values.seasonalPeaks, omitWhenEmpty: true },
        ),
        row(
          "Expected growth (12 months)",
          values.growthExpectation
            ? labelForValue(GROWTH_EXPECTATIONS, values.growthExpectation)
            : undefined,
          { optional: true, unanswered: !values.growthExpectation, omitWhenEmpty: true },
        ),
        row("Approximate stock volume", labelForValue(STOCK_VOLUMES, values.stockVolume)),
        row(
          "Storage type required",
          values.storageType.map((entry) => labelForValue(STORAGE_TYPES, entry)),
        ),
        row("Average product dimensions", values.productDimensions, {
          optional: true,
          unanswered: !values.productDimensions,
          omitWhenEmpty: true,
        }),
        row(
          "Average product weight",
          values.productWeight ? labelForValue(PRODUCT_WEIGHTS, values.productWeight) : undefined,
          { optional: true, unanswered: !values.productWeight, omitWhenEmpty: true },
        ),
        row(
          "Fragile or specialist handling",
          values.specialHandling?.length
            ? values.specialHandling.map((entry) => labelForValue(SPECIAL_HANDLING, entry))
            : undefined,
          { optional: true, unanswered: !values.specialHandling?.length, omitWhenEmpty: true },
        ),
        row("Special handling details", values.specialHandlingDetails, { omitWhenEmpty: true }),
      ]),
    },
    {
      id: "delivery-and-additional-services",
      title: "Dispatch, destinations and additional services",
      reviewStep: 4,
      rows: compactRows([
        row(
          "Delivery regions",
          values.deliveryRegions.map((entry) => labelForValue(DELIVERY_REGIONS, entry)),
        ),
        row("International destinations", values.internationalDestinations, { omitWhenEmpty: true }),
        row(
          "Average parcel size",
          values.parcelDimensions
            ? labelForValue(PARCEL_DIMENSIONS, values.parcelDimensions)
            : undefined,
          { optional: true, unanswered: !values.parcelDimensions, omitWhenEmpty: true },
        ),
        row(
          "Average parcel weight",
          values.parcelWeight ? labelForValue(PRODUCT_WEIGHTS, values.parcelWeight) : undefined,
          { optional: true, unanswered: !values.parcelWeight, omitWhenEmpty: true },
        ),
        row(
          "Tracked delivery required",
          values.trackingRequired
            ? labelForValue(TRACKING_REQUIRED, values.trackingRequired)
            : undefined,
          { optional: true, unanswered: !values.trackingRequired, omitWhenEmpty: true },
        ),
        row(
          "Special courier requirements",
          values.specialCourierRequired
            ? labelForValue(SPECIAL_COURIER_OPTIONS, values.specialCourierRequired)
            : undefined,
          { optional: true, unanswered: !values.specialCourierRequired, omitWhenEmpty: true },
        ),
        row("Special courier details", values.specialCourierDetails, { omitWhenEmpty: true }),
        row(
          "Additional services",
          values.additionalServices?.length
            ? values.additionalServices.map((entry) => labelForValue(ADDITIONAL_SERVICES, entry))
            : undefined,
          { optional: true, unanswered: !values.additionalServices?.length, omitWhenEmpty: true },
        ),
        row("Other service details", values.additionalServicesOther, { omitWhenEmpty: true }),
        row("Branded packaging details", values.brandedPackagingDetails, { omitWhenEmpty: true }),
        row(
          "Expected returns volume",
          values.returnsVolume ? labelForValue(RETURNS_VOLUMES, values.returnsVolume) : undefined,
          { omitWhenEmpty: true },
        ),
      ]),
    },
    {
      id: "additional-information",
      title: "Onboarding and additional information",
      rows: compactRows([
        row("Additional requirements", values.additionalNotes, {
          optional: true,
          unanswered: !values.additionalNotes,
          omitWhenEmpty: true,
        }),
      ]),
    },
    {
      id: "declarations-and-consent",
      title: "Declarations and consent",
      rows: compactRows([
        row("Privacy Policy acceptance", formatConsentTimestamp(privacyConsentAt, audience)),
        row("Marketing communications", formatBoolean(Boolean(values.marketingConsent))),
        ...(audience === "internal" && values.marketingConsent
          ? [row("Marketing consent recorded", formatBritishDateTime(marketingConsentAt ?? submittedAt))]
          : []),
        row("Accuracy confirmation", formatConsentTimestamp(accuracyConfirmationAt, audience)),
      ]),
    },
  ].filter((section) => section.rows.length > 0);

  return {
    audience,
    reference,
    companyName: values.companyName,
    contactName: values.contactName,
    contactEmail: values.email,
    submittedAt: formatBritishDateTime(submittedAt),
    title: QUOTATION_DOCUMENT_TITLE,
    disclaimer: QUOTATION_DOCUMENT_DISCLAIMER,
    supportEmail: packSendGoContact.email,
    sections,
  };
}
