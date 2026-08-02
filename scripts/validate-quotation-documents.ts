import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildCustomerQuotationEmail,
  buildInternalQuotationEmail,
} from "../src/lib/email/quotation-email";
import { renderQuotationHtmlEmail } from "../src/lib/email/quotation-html";
import { renderQuotationTextEmail } from "../src/lib/email/quotation-text";
import { generateQuotationRequestPdf } from "../src/lib/pdf/quotation-request-pdf";
import {
  buildQuotationDocument,
  getQuotationPdfFilename,
} from "../src/lib/quote/quotation-document";
import type { QuoteFormValues } from "../src/lib/quote/schema";

const OUTPUT_DIR = "D:\\Temp\\packsendgo-email-pdf-validation";
const REFERENCE = "PSG-20260802-TEST";
const INJECTION =
  "Claude & Co's test <strong>value</strong>\n<script>alert(1)</script>\nCafé fulfilment requirements";

const syntheticValues = {
  contactName: "Alex Morgan",
  companyName: "Claude & Co",
  email: "alex.morgan@example.test",
  telephone: "+447700900123",
  websiteUrl: "https://www.example-long-domain-for-wrap-testing.co.uk/fulfilment",
  country: "GB",
  preferredContactMethod: "email",
  businessStage: "switching_provider",
  productCategory: "other",
  productCategoryOther: "Specialist medical accessories",
  currentFulfilment: "third_party",
  requiredStartDate: "within_1_month",
  enquiryReason: "growth",
  salesChannels: ["shopify", "other_marketplace", "custom_platform"],
  salesChannelOther: "OnBuy marketplace",
  customPlatformDetails: "Custom Laravel storefront",
  monthlyOrderRange: "500_2000",
  skuCount: "50_200",
  itemsPerOrder: "2_3",
  seasonalPeaks: "significant",
  growthExpectation: "moderate_growth",
  stockVolume: "10_50_pallets",
  storageType: ["pallet", "shelving"],
  productDimensions: "30cm x 20cm x 10cm",
  productWeight: "medium",
  specialHandling: ["fragile", "temperature_sensitive"],
  specialHandlingDetails: INJECTION,
  deliveryRegions: ["uk", "europe", "international"],
  internationalDestinations: "France, Germany, Ireland, United States",
  parcelDimensions: "medium",
  parcelWeight: "medium",
  trackingRequired: "always",
  specialCourierRequired: "yes",
  specialCourierDetails: "Temperature-controlled courier for selected SKUs",
  additionalServices: ["branded_packaging", "returns", "other"],
  additionalServicesOther: "Gift-note insertion",
  brandedPackagingDetails: "Branded tissue and sticker seal",
  returnsVolume: "5_15_pct",
  additionalNotes: `${INJECTION}\n`.repeat(20).trim(),
  privacyConsent: true,
  marketingConsent: true,
  accuracyConfirmation: true,
} satisfies QuoteFormValues;

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const submittedAt = new Date("2026-08-02T14:00:00.000Z");
  const source = {
    values: syntheticValues,
    reference: REFERENCE,
    submittedAt,
    privacyConsentAt: submittedAt,
    marketingConsentAt: submittedAt,
    accuracyConfirmationAt: submittedAt,
  };

  const internalViewModel = buildQuotationDocument(source, "internal");
  const customerViewModel = buildQuotationDocument(source, "customer");

  const internalHtml = renderQuotationHtmlEmail(internalViewModel);
  const customerHtml = renderQuotationHtmlEmail(customerViewModel);
  const internalText = renderQuotationTextEmail(internalViewModel);
  const customerText = renderQuotationTextEmail(customerViewModel);
  const internalPdf = await generateQuotationRequestPdf(internalViewModel);
  const customerPdf = await generateQuotationRequestPdf(customerViewModel);

  writeFileSync(join(OUTPUT_DIR, "internal-email.html"), internalHtml, "utf8");
  writeFileSync(join(OUTPUT_DIR, "customer-email.html"), customerHtml, "utf8");
  writeFileSync(join(OUTPUT_DIR, "internal-email.txt"), internalText, "utf8");
  writeFileSync(join(OUTPUT_DIR, "customer-email.txt"), customerText, "utf8");
  writeFileSync(
    join(OUTPUT_DIR, getQuotationPdfFilename(`${REFERENCE}-internal`)),
    internalPdf,
  );
  writeFileSync(
    join(OUTPUT_DIR, getQuotationPdfFilename(`${REFERENCE}-customer`)),
    customerPdf,
  );

  const internalMessage = buildInternalQuotationEmail({
    viewModel: internalViewModel,
    fromAddress: "notifications@example.test",
    internalRecipient: "ops@example.test",
    pdfAttachment: internalPdf,
  });
  const customerMessage = buildCustomerQuotationEmail({
    viewModel: customerViewModel,
    fromAddress: "notifications@example.test",
    pdfAttachment: customerPdf,
  });

  assert(internalPdf.subarray(0, 4).toString() === "%PDF", "Internal PDF signature invalid");
  assert(customerPdf.subarray(0, 4).toString() === "%PDF", "Customer PDF signature invalid");
  assert(internalPdf.length > 1000, "Internal PDF too small");
  assert(customerPdf.length > 1000, "Customer PDF too small");
  assert(!internalHtml.includes("<strong>value</strong>"), "Internal HTML not escaped");
  assert(internalHtml.includes("&lt;strong&gt;value&lt;/strong&gt;"), "Internal HTML escape missing");
  assert(!customerHtml.includes("<script>"), "Customer HTML script not escaped");
  assert(internalMessage.replyTo === syntheticValues.email, "Internal Reply-To incorrect");
  assert(customerMessage.replyTo === "support@packsendgo.com", "Customer Reply-To incorrect");
  assert(
    internalMessage.attachments?.[0]?.contentType === "application/pdf",
    "Internal attachment MIME incorrect",
  );
  assert(
    customerMessage.attachments?.[0]?.filename === getQuotationPdfFilename(REFERENCE),
    "Customer attachment filename incorrect",
  );
  assert(!internalText.includes("idempotency"), "Internal text leaked metadata");
  assert(!customerText.includes("Marketing consent recorded"), "Customer text leaked internal metadata");

  const internalWithoutPdf = buildInternalQuotationEmail({
    viewModel: internalViewModel,
    fromAddress: "notifications@example.test",
    internalRecipient: "ops@example.test",
  });
  assert(Boolean(internalWithoutPdf.html && internalWithoutPdf.text), "PDF fallback removed HTML/text");
  assert(!internalWithoutPdf.attachments?.length, "PDF fallback should omit attachments");

  console.log(
    JSON.stringify(
      {
        outputDir: OUTPUT_DIR,
        internalPdfBytes: internalPdf.length,
        customerPdfBytes: customerPdf.length,
        internalFieldSections: internalViewModel.sections.length,
        customerFieldSections: customerViewModel.sections.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
