import { EmailAttemptStatus, EmailAttemptType, Prisma } from "@prisma/client";
import { createEmailTransport } from "@/lib/email/transport";
import {
  buildCustomerEmail,
  buildInternalEmail,
  getEmailConfigurationStatus,
} from "@/lib/email/types";
import { prisma } from "@/lib/prisma";
import { generateQuoteReference } from "@/lib/quote/reference";
import type { QuoteSubmissionPayload } from "@/lib/quote/schema";
import { quoteSubmissionPayloadSchema } from "@/lib/quote/schema";
import { rateLimiter } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

export type SubmitQuoteSuccess = {
  ok: true;
  reference: string;
  emailMode: "configured" | "development-log" | "partial-failure";
  duplicate?: boolean;
};

export type SubmitQuoteFailure = {
  ok: false;
  code:
    | "invalid-payload"
    | "honeypot"
    | "rate-limit"
    | "turnstile"
    | "configuration"
    | "duplicate-in-flight"
    | "server";
  message: string;
  fieldErrors?: Record<string, string>;
};

export type RuntimeConfigurationIssue = {
  key: string;
  detail: string;
};

export function getRuntimeConfigurationIssues(): RuntimeConfigurationIssue[] {
  const issues: RuntimeConfigurationIssue[] = [];

  if (!process.env.DATABASE_URL?.trim()) {
    issues.push({ key: "DATABASE_URL", detail: "Database connection is not configured." });
  }

  if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()) {
      issues.push({
        key: "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
        detail: "Turnstile site key is required in production.",
      });
    }
    if (!process.env.TURNSTILE_SECRET_KEY?.trim()) {
      issues.push({
        key: "TURNSTILE_SECRET_KEY",
        detail: "Turnstile secret key is required in production.",
      });
    }
    if (!getEmailConfigurationStatus().isConfigured) {
      issues.push({
        key: "EMAIL_FROM/QUOTE_NOTIFICATION_EMAIL",
        detail: "Email sender and internal recipient must be configured in production.",
      });
    }
  }

  return issues;
}

function resolveEmailMode(): SubmitQuoteSuccess["emailMode"] {
  return getEmailConfigurationStatus().isConfigured ? "configured" : "development-log";
}

function mapFieldErrors(error: { issues: Array<{ path: PropertyKey[]; message: string }> }) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".");
    if (key) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

function hasUnknownKeyError(error: { issues: Array<{ code: string }> }) {
  return error.issues.some((issue) => issue.code === "unrecognized_keys");
}

export async function submitQuote(
  payload: unknown,
): Promise<SubmitQuoteSuccess | SubmitQuoteFailure> {
  const parsed = quoteSubmissionPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      code: "invalid-payload",
      message: hasUnknownKeyError(parsed.error)
        ? "The request included unexpected fields."
        : "Please review the form and try again.",
      fieldErrors: mapFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;

  if (data.website) {
    return {
      ok: false,
      code: "honeypot",
      message: "We could not process your request. Please try again.",
    };
  }

  const configIssues = getRuntimeConfigurationIssues();
  const databaseMissing = configIssues.some((issue) => issue.key === "DATABASE_URL");
  if (databaseMissing) {
    return {
      ok: false,
      code: "configuration",
      message:
        "Quotation submission is temporarily unavailable. Database configuration is required before enquiries can be saved.",
    };
  }

  if (configIssues.length > 0 && process.env.NODE_ENV === "production") {
    return {
      ok: false,
      code: "configuration",
      message:
        "Quotation submission is temporarily unavailable. Please contact PackSendGo directly.",
    };
  }

  const rateLimit = await rateLimiter.check({
    email: data.email,
    idempotencyKey: data.idempotencyKey,
  });
  if (!rateLimit.allowed) {
    return {
      ok: false,
      code: "rate-limit",
      message: "Too many submission attempts. Please try again later.",
    };
  }

  const turnstile = await verifyTurnstileToken(data.turnstileToken);
  if (!turnstile.success) {
    return {
      ok: false,
      code: "turnstile",
      message: "Verification failed. Please try again.",
    };
  }

  const existing = await prisma.quoteRequest.findUnique({
    where: { idempotencyKey: data.idempotencyKey },
    select: { publicReference: true },
  });
  if (existing) {
    return {
      ok: true,
      reference: existing.publicReference,
      emailMode: resolveEmailMode(),
      duplicate: true,
    };
  }

  const now = new Date();
  const reference = await generateQuoteReference(now);

  try {
    const quote = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      return tx.quoteRequest.create({
        data: buildQuoteRecord(data, reference, now),
      });
    });

    const transport = createEmailTransport();
    const emailConfig = getEmailConfigurationStatus();
    const fromAddress = emailConfig.from ?? "development-log@local";
    const internalRecipient = emailConfig.internalRecipient ?? "development-log@local";
    const customerMessage = buildCustomerEmail(data, quote.publicReference, fromAddress);
    const internalMessage = buildInternalEmail(
      data,
      quote.publicReference,
      fromAddress,
      internalRecipient,
    );

    const customerResult = await transport.send(customerMessage);
    await prisma.quoteNotificationAttempt.create({
      data: {
        quoteRequestId: quote.id,
        emailType: EmailAttemptType.CUSTOMER,
        status:
          customerResult.status === "SENT"
            ? EmailAttemptStatus.SENT
            : customerResult.status === "LOGGED"
              ? EmailAttemptStatus.LOGGED
              : EmailAttemptStatus.FAILED,
        providerResponse: customerResult.providerResponse,
      },
    });

    const internalResult = await transport.send(internalMessage);
    await prisma.quoteNotificationAttempt.create({
      data: {
        quoteRequestId: quote.id,
        emailType: EmailAttemptType.INTERNAL,
        status:
          internalResult.status === "SENT"
            ? EmailAttemptStatus.SENT
            : internalResult.status === "LOGGED"
              ? EmailAttemptStatus.LOGGED
              : EmailAttemptStatus.FAILED,
        providerResponse: internalResult.providerResponse,
      },
    });

    const emailMode =
      customerResult.status === "FAILED" || internalResult.status === "FAILED"
        ? "partial-failure"
        : resolveEmailMode();

    return {
      ok: true,
      reference: quote.publicReference,
      emailMode,
    };
  } catch (error) {
    console.error("[quote-submit]", error instanceof Error ? error.message : "unknown");
    return {
      ok: false,
      code: "server",
      message: "We could not submit your enquiry. Please try again.",
    };
  }
}

function buildQuoteRecord(
  data: QuoteSubmissionPayload,
  reference: string,
  now: Date,
) {
  return {
    publicReference: reference,
    idempotencyKey: data.idempotencyKey,
    contactName: data.contactName,
    companyName: data.companyName,
    email: data.email,
    telephone: data.telephone,
    websiteUrl: data.websiteUrl ?? null,
    country: data.country,
    preferredContactMethod: data.preferredContactMethod,
    businessStage: data.businessStage,
    productCategory: data.productCategory,
    productCategoryOther: data.productCategoryOther ?? null,
    currentFulfilment: data.currentFulfilment,
    requiredStartDate: data.requiredStartDate ?? null,
    enquiryReason: data.enquiryReason,
    salesChannels: data.salesChannels,
    salesChannelOther: data.salesChannelOther ?? null,
    customPlatformDetails: data.customPlatformDetails ?? null,
    monthlyOrderRange: data.monthlyOrderRange,
    skuCount: data.skuCount,
    itemsPerOrder: data.itemsPerOrder,
    seasonalPeaks: data.seasonalPeaks ?? null,
    growthExpectation: data.growthExpectation ?? null,
    stockVolume: data.stockVolume,
    storageType: data.storageType,
    productDimensions: data.productDimensions ?? null,
    productWeight: data.productWeight ?? null,
    specialHandling: data.specialHandling ?? [],
    specialHandlingDetails: data.specialHandlingDetails ?? null,
    deliveryRegions: data.deliveryRegions,
    internationalDestinations: data.internationalDestinations ?? null,
    parcelDimensions: data.parcelDimensions ?? null,
    parcelWeight: data.parcelWeight ?? null,
    trackingRequired: data.trackingRequired ?? null,
    specialCourierRequired: data.specialCourierRequired ?? null,
    specialCourierDetails: data.specialCourierDetails ?? null,
    additionalServices: data.additionalServices ?? [],
    additionalServicesOther: data.additionalServicesOther ?? null,
    brandedPackagingDetails: data.brandedPackagingDetails ?? null,
    returnsVolume: data.returnsVolume ?? null,
    additionalNotes: data.additionalNotes ?? null,
    privacyConsent: true,
    privacyConsentAt: now,
    marketingConsent: Boolean(data.marketingConsent),
    marketingConsentAt: data.marketingConsent ? now : null,
    accuracyConfirmation: true,
    accuracyConfirmationAt: now,
  };
}
