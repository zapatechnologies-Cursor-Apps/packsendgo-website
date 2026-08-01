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

export type ReviewRow = {
  label: string;
  value: string;
  optional?: boolean;
  unanswered?: boolean;
};

export function formatOptionalAnswer(
  value: string | undefined,
  formatter?: (value: string) => string,
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

export function buildReviewSections(values: QuoteFormValues) {
  const switchingProvider =
    values.businessStage === "switching_provider" || values.currentFulfilment === "third_party";

  return [
    {
      step: 1,
      title: "Contact and company",
      rows: [
        { label: "Your name", value: values.contactName },
        { label: "Company name", value: values.companyName },
        { label: "Email address", value: values.email },
        { label: "Telephone", value: values.telephone },
        {
          label: "Website or store URL",
          value: formatOptionalAnswer(values.websiteUrl),
          optional: true,
          unanswered: !values.websiteUrl,
        },
        { label: "Country", value: labelForValue(COUNTRIES, values.country) },
        {
          label: "Preferred contact method",
          value: labelForValue(PREFERRED_CONTACT_METHODS, values.preferredContactMethod),
        },
      ] satisfies ReviewRow[],
    },
    {
      step: 2,
      title: "Business and sales channels",
      emphasis: switchingProvider
        ? "You indicated you are switching or currently using a third-party fulfilment provider. Our team will review continuity and migration requirements carefully."
        : undefined,
      rows: [
        { label: "Business stage", value: labelForValue(BUSINESS_STAGES, values.businessStage) },
        {
          label: "Product category",
          value:
            values.productCategory === "other"
              ? `Other — ${values.productCategoryOther || "Not provided"}`
              : labelForValue(PRODUCT_CATEGORIES, values.productCategory),
        },
        {
          label: "Current fulfilment arrangement",
          value: labelForValue(CURRENT_FULFILMENT, values.currentFulfilment),
        },
        {
          label: "Desired start date",
          value: formatOptionalAnswer(values.requiredStartDate, (value) =>
            labelForValue(REQUIRED_START_DATES, value),
          ),
          optional: true,
          unanswered: !values.requiredStartDate,
        },
        {
          label: "Primary reason for enquiry",
          value: labelForValue(ENQUIRY_REASONS, values.enquiryReason),
        },
        {
          label: "Sales channels",
          value: labelsForValues(SALES_CHANNELS, values.salesChannels),
        },
        ...(values.salesChannels?.includes("other_marketplace")
          ? [{ label: "Other marketplace details", value: values.salesChannelOther || "Not provided" }]
          : []),
        ...(values.salesChannels?.includes("custom_platform")
          ? [{ label: "Custom platform details", value: values.customPlatformDetails || "Not provided" }]
          : []),
      ] satisfies ReviewRow[],
    },
    {
      step: 3,
      title: "Orders and stock",
      rows: [
        {
          label: "Approximate monthly orders",
          value: labelForValue(MONTHLY_ORDER_RANGES, values.monthlyOrderRange),
        },
        { label: "Number of SKUs", value: labelForValue(SKU_COUNTS, values.skuCount) },
        {
          label: "Average items per order",
          value: labelForValue(ITEMS_PER_ORDER, values.itemsPerOrder),
        },
        {
          label: "Seasonal volume changes",
          value: formatOptionalAnswer(values.seasonalPeaks, (value) =>
            labelForValue(SEASONAL_PEAKS, value),
          ),
          optional: true,
          unanswered: !values.seasonalPeaks,
        },
        {
          label: "Expected growth (12 months)",
          value: formatOptionalAnswer(values.growthExpectation, (value) =>
            labelForValue(GROWTH_EXPECTATIONS, value),
          ),
          optional: true,
          unanswered: !values.growthExpectation,
        },
        {
          label: "Approximate stock volume",
          value: labelForValue(STOCK_VOLUMES, values.stockVolume),
        },
        {
          label: "Storage type required",
          value: labelsForValues(STORAGE_TYPES, values.storageType),
        },
        {
          label: "Average product dimensions",
          value: formatOptionalAnswer(values.productDimensions),
          optional: true,
          unanswered: !values.productDimensions,
        },
        {
          label: "Average product weight",
          value: formatOptionalAnswer(values.productWeight, (value) =>
            labelForValue(PRODUCT_WEIGHTS, value),
          ),
          optional: true,
          unanswered: !values.productWeight,
        },
        {
          label: "Fragile or specialist handling",
          value: labelsForValues(SPECIAL_HANDLING, values.specialHandling),
          optional: true,
          unanswered: !values.specialHandling?.length,
        },
        ...(values.specialHandlingDetails
          ? [{ label: "Special handling details", value: values.specialHandlingDetails }]
          : []),
      ] satisfies ReviewRow[],
    },
    {
      step: 4,
      title: "Delivery and additional services",
      rows: [
        {
          label: "Delivery regions",
          value: labelsForValues(DELIVERY_REGIONS, values.deliveryRegions),
        },
        ...(values.internationalDestinations
          ? [{ label: "International destinations", value: values.internationalDestinations }]
          : []),
        {
          label: "Average parcel size",
          value: formatOptionalAnswer(values.parcelDimensions, (value) =>
            labelForValue(PARCEL_DIMENSIONS, value),
          ),
          optional: true,
          unanswered: !values.parcelDimensions,
        },
        {
          label: "Average parcel weight",
          value: formatOptionalAnswer(values.parcelWeight, (value) =>
            labelForValue(PRODUCT_WEIGHTS, value),
          ),
          optional: true,
          unanswered: !values.parcelWeight,
        },
        {
          label: "Tracked delivery required",
          value: formatOptionalAnswer(values.trackingRequired, (value) =>
            labelForValue(TRACKING_REQUIRED, value),
          ),
          optional: true,
          unanswered: !values.trackingRequired,
        },
        {
          label: "Special courier requirements",
          value: formatOptionalAnswer(values.specialCourierRequired, (value) =>
            labelForValue(SPECIAL_COURIER_OPTIONS, value),
          ),
          optional: true,
          unanswered: !values.specialCourierRequired,
        },
        ...(values.specialCourierDetails
          ? [{ label: "Special courier details", value: values.specialCourierDetails }]
          : []),
        {
          label: "Additional services",
          value: labelsForValues(ADDITIONAL_SERVICES, values.additionalServices),
          optional: true,
          unanswered: !values.additionalServices?.length,
        },
        ...(values.additionalServicesOther
          ? [{ label: "Other service details", value: values.additionalServicesOther }]
          : []),
        ...(values.brandedPackagingDetails
          ? [{ label: "Branded packaging details", value: values.brandedPackagingDetails }]
          : []),
        ...(values.returnsVolume
          ? [
              {
                label: "Expected returns volume",
                value: labelForValue(RETURNS_VOLUMES, values.returnsVolume),
              },
            ]
          : []),
      ] satisfies ReviewRow[],
    },
  ];
}
