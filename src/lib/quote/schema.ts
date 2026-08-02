import { z } from "zod";
import {
  normaliseWebsite,
  WEBSITE_VALIDATION_MESSAGE,
} from "@/lib/quote/normalise-website";
import { sanitizePlainText } from "@/lib/quote/sanitize";
import {
  ADDITIONAL_SERVICES,
  BUSINESS_STAGES,
  COUNTRIES,
  CURRENT_FULFILMENT,
  DELIVERY_REGIONS,
  ENQUIRY_REASONS,
  enumValues,
  GROWTH_EXPECTATIONS,
  ITEMS_PER_ORDER,
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

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalText = (max: number) =>
  z.preprocess(
    (value) => {
      const normalised = emptyToUndefined(value);
      if (typeof normalised === "string") return sanitizePlainText(normalised);
      return normalised;
    },
    z.string().max(max).optional(),
  );

const requiredText = (max: number, message: string) =>
  z.preprocess(
    (value) => (typeof value === "string" ? sanitizePlainText(value) : value),
    z.string().min(1, message).max(max),
  );

const namePattern = /^[\p{L}\p{M}\s'.-]+$/u;

export const quoteFormDefaultValues = {
  contactName: "",
  companyName: "",
  email: "",
  telephone: "",
  websiteUrl: "",
  country: "",
  preferredContactMethod: "",
  businessStage: "",
  productCategory: "",
  productCategoryOther: "",
  currentFulfilment: "",
  requiredStartDate: "",
  enquiryReason: "",
  salesChannels: [] as string[],
  salesChannelOther: "",
  customPlatformDetails: "",
  monthlyOrderRange: "",
  skuCount: "",
  itemsPerOrder: "",
  seasonalPeaks: "",
  growthExpectation: "",
  stockVolume: "",
  storageType: [] as string[],
  productDimensions: "",
  productWeight: "",
  specialHandling: [] as string[],
  specialHandlingDetails: "",
  deliveryRegions: [] as string[],
  internationalDestinations: "",
  parcelDimensions: "",
  parcelWeight: "",
  trackingRequired: "",
  specialCourierRequired: "",
  specialCourierDetails: "",
  additionalServices: [] as string[],
  additionalServicesOther: "",
  brandedPackagingDetails: "",
  returnsVolume: "",
  additionalNotes: "",
  privacyConsent: false,
  marketingConsent: false,
  accuracyConfirmation: false,
};

const quoteFieldsBaseSchema = z.object({
  contactName: z.preprocess(
    (value) => (typeof value === "string" ? sanitizePlainText(value) : value),
    z
      .string()
      .min(2, "Enter your full name.")
      .max(100)
      .regex(namePattern, "Enter a valid name."),
  ),
  companyName: requiredText(150, "Enter your company name.").refine(
    (value) => value.length >= 2,
    "Enter your company name.",
  ),
  email: z.preprocess(
    (value) => (typeof value === "string" ? sanitizePlainText(value) : value),
    z.string().email("Enter a valid email address.").max(254),
  ),
  telephone: z.preprocess(
    (value) => (typeof value === "string" ? sanitizePlainText(value) : value),
    z
      .string()
      .transform((raw) => raw.replace(/[\s()-]/g, ""))
      .refine((value) => /^\+?[0-9]{7,20}$/.test(value), "Enter a valid telephone number."),
  ),
  websiteUrl: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(500)
      .optional()
      .refine(
        (value) => value === undefined || normaliseWebsite(value).ok,
        WEBSITE_VALIDATION_MESSAGE,
      )
      .transform((value) => {
        if (value === undefined) {
          return undefined;
        }
        const result = normaliseWebsite(value);
        return result.ok ? result.url : value;
      }),
  ),
  country: z.enum(enumValues(COUNTRIES), { message: "Select your country." }),
  preferredContactMethod: z.enum(enumValues(PREFERRED_CONTACT_METHODS), {
    message: "Select your preferred contact method.",
  }),
  businessStage: z.enum(enumValues(BUSINESS_STAGES), {
    message: "Select your business stage.",
  }),
  productCategory: z.enum(enumValues(PRODUCT_CATEGORIES), {
    message: "Select a product category.",
  }),
  productCategoryOther: optionalText(200),
  currentFulfilment: z.enum(enumValues(CURRENT_FULFILMENT), {
    message: "Select your current fulfilment arrangement.",
  }),
  requiredStartDate: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(REQUIRED_START_DATES)).optional(),
  ),
  enquiryReason: z.enum(enumValues(ENQUIRY_REASONS), {
    message: "Select the primary reason for your enquiry.",
  }),
  salesChannels: z
    .array(z.enum(enumValues(SALES_CHANNELS)))
    .min(1, "Select at least one sales channel."),
  salesChannelOther: optionalText(200),
  customPlatformDetails: optionalText(200),
  monthlyOrderRange: z.enum(enumValues(MONTHLY_ORDER_RANGES), {
    message: "Select your approximate monthly order volume.",
  }),
  skuCount: z.enum(enumValues(SKU_COUNTS), {
    message: "Select your number of SKUs.",
  }),
  itemsPerOrder: z.enum(enumValues(ITEMS_PER_ORDER), {
    message: "Select the average items per order.",
  }),
  seasonalPeaks: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(SEASONAL_PEAKS)).optional(),
  ),
  growthExpectation: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(GROWTH_EXPECTATIONS)).optional(),
  ),
  stockVolume: z.enum(enumValues(STOCK_VOLUMES), {
    message: "Select your approximate stock volume.",
  }),
  storageType: z
    .array(z.enum(enumValues(STORAGE_TYPES)))
    .min(1, "Select at least one storage type."),
  productDimensions: optionalText(200),
  productWeight: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(PRODUCT_WEIGHTS)).optional(),
  ),
  specialHandling: z.array(z.enum(enumValues(SPECIAL_HANDLING))).optional(),
  specialHandlingDetails: optionalText(1000),
  deliveryRegions: z
    .array(z.enum(enumValues(DELIVERY_REGIONS)))
    .min(1, "Select at least one delivery region."),
  internationalDestinations: optionalText(500),
  parcelDimensions: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(PARCEL_DIMENSIONS)).optional(),
  ),
  parcelWeight: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(PRODUCT_WEIGHTS)).optional(),
  ),
  trackingRequired: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(TRACKING_REQUIRED)).optional(),
  ),
  specialCourierRequired: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(SPECIAL_COURIER_OPTIONS)).optional(),
  ),
  specialCourierDetails: optionalText(500),
  additionalServices: z.array(z.enum(enumValues(ADDITIONAL_SERVICES))).optional(),
  additionalServicesOther: optionalText(200),
  brandedPackagingDetails: optionalText(500),
  returnsVolume: z.preprocess(
    emptyToUndefined,
    z.enum(enumValues(RETURNS_VOLUMES)).optional(),
  ),
  additionalNotes: optionalText(2000),
  privacyConsent: z.literal(true, {
    message: "You must accept the Privacy Policy to submit this enquiry.",
  }),
  marketingConsent: z.boolean().optional(),
  accuracyConfirmation: z.literal(true, {
    message: "Confirm that the information provided is accurate.",
  }),
});

type QuoteFieldValues = z.infer<typeof quoteFieldsBaseSchema>;

type Step2Values = Pick<
  QuoteFieldValues,
  | "businessStage"
  | "productCategory"
  | "productCategoryOther"
  | "currentFulfilment"
  | "requiredStartDate"
  | "enquiryReason"
  | "salesChannels"
  | "salesChannelOther"
  | "customPlatformDetails"
>;

type Step3Values = Pick<
  QuoteFieldValues,
  | "monthlyOrderRange"
  | "skuCount"
  | "itemsPerOrder"
  | "seasonalPeaks"
  | "growthExpectation"
  | "stockVolume"
  | "storageType"
  | "productDimensions"
  | "productWeight"
  | "specialHandling"
  | "specialHandlingDetails"
>;

type Step4Values = Pick<
  QuoteFieldValues,
  | "deliveryRegions"
  | "internationalDestinations"
  | "parcelDimensions"
  | "parcelWeight"
  | "trackingRequired"
  | "specialCourierRequired"
  | "specialCourierDetails"
  | "additionalServices"
  | "additionalServicesOther"
  | "brandedPackagingDetails"
  | "returnsVolume"
>;

function refineStep2Business(data: Step2Values, ctx: z.RefinementCtx) {
  if (data.productCategory === "other" && !data.productCategoryOther) {
    ctx.addIssue({
      code: "custom",
      path: ["productCategoryOther"],
      message: "Describe your product category.",
    });
  }
  if (data.salesChannels.includes("other_marketplace") && !data.salesChannelOther) {
    ctx.addIssue({
      code: "custom",
      path: ["salesChannelOther"],
      message: "Describe the other marketplace.",
    });
  }
  if (data.salesChannels.includes("custom_platform") && !data.customPlatformDetails) {
    ctx.addIssue({
      code: "custom",
      path: ["customPlatformDetails"],
      message: "Describe your custom platform.",
    });
  }
}

function refineStep3Orders(data: Step3Values, ctx: z.RefinementCtx) {
  const handling = data.specialHandling ?? [];
  if (
    handling.some((value) => value !== "none" && value !== "not_sure") &&
    !data.specialHandlingDetails
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["specialHandlingDetails"],
      message: "Describe the special handling requirements.",
    });
  }
}

function refineStep4Delivery(data: Step4Values, ctx: z.RefinementCtx) {
  if (data.deliveryRegions.includes("international") && !data.internationalDestinations) {
    ctx.addIssue({
      code: "custom",
      path: ["internationalDestinations"],
      message: "Describe the international destinations.",
    });
  }
  if (data.specialCourierRequired === "yes" && !data.specialCourierDetails) {
    ctx.addIssue({
      code: "custom",
      path: ["specialCourierDetails"],
      message: "Describe your special courier requirements.",
    });
  }
  if (data.additionalServices?.includes("other") && !data.additionalServicesOther) {
    ctx.addIssue({
      code: "custom",
      path: ["additionalServicesOther"],
      message: "Describe the other service required.",
    });
  }
}

function refineAllQuoteFields(data: QuoteFieldValues, ctx: z.RefinementCtx) {
  refineStep2Business(data, ctx);
  refineStep3Orders(data, ctx);
  refineStep4Delivery(data, ctx);
}

export const quoteSubmissionSchema = quoteFieldsBaseSchema.superRefine(refineAllQuoteFields);

export const quoteStepSchemas = {
  1: quoteFieldsBaseSchema.pick({
    contactName: true,
    companyName: true,
    email: true,
    telephone: true,
    websiteUrl: true,
    country: true,
    preferredContactMethod: true,
  }),
  2: quoteFieldsBaseSchema
    .pick({
      businessStage: true,
      productCategory: true,
      productCategoryOther: true,
      currentFulfilment: true,
      requiredStartDate: true,
      enquiryReason: true,
      salesChannels: true,
      salesChannelOther: true,
      customPlatformDetails: true,
    })
    .superRefine((data, ctx) => refineStep2Business(data as Step2Values, ctx)),
  3: quoteFieldsBaseSchema
    .pick({
      monthlyOrderRange: true,
      skuCount: true,
      itemsPerOrder: true,
      seasonalPeaks: true,
      growthExpectation: true,
      stockVolume: true,
      storageType: true,
      productDimensions: true,
      productWeight: true,
      specialHandling: true,
      specialHandlingDetails: true,
    })
    .superRefine((data, ctx) => refineStep3Orders(data as Step3Values, ctx)),
  4: quoteFieldsBaseSchema
    .pick({
      deliveryRegions: true,
      internationalDestinations: true,
      parcelDimensions: true,
      parcelWeight: true,
      trackingRequired: true,
      specialCourierRequired: true,
      specialCourierDetails: true,
      additionalServices: true,
      additionalServicesOther: true,
      brandedPackagingDetails: true,
      returnsVolume: true,
    })
    .superRefine((data, ctx) => refineStep4Delivery(data as Step4Values, ctx)),
  5: quoteFieldsBaseSchema.pick({
    additionalNotes: true,
    privacyConsent: true,
    marketingConsent: true,
    accuracyConfirmation: true,
  }),
} as const;

export const quoteSubmissionPayloadSchema = quoteFieldsBaseSchema
  .extend({
    idempotencyKey: z.preprocess(
      (value) => (typeof value === "string" ? sanitizePlainText(value) : value),
      z.string().min(16).max(64),
    ),
    website: z.preprocess(
      (value) => (typeof value === "string" ? sanitizePlainText(value) : value),
      z.string().max(0).optional(),
    ),
  })
  .strict()
  .superRefine(refineAllQuoteFields);

export type QuoteFormValues = z.infer<typeof quoteSubmissionSchema>;
export type QuoteSubmissionPayload = z.infer<typeof quoteSubmissionPayloadSchema>;

export function normaliseQuoteValues(values: QuoteFormValues): QuoteFormValues {
  return quoteSubmissionSchema.parse(values);
}
