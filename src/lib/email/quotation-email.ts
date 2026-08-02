import { packSendGoContact } from "@/lib/legal-data";
import { renderQuotationHtmlEmail } from "@/lib/email/quotation-html";
import { renderQuotationTextEmail } from "@/lib/email/quotation-text";
import type { EmailMessage } from "@/lib/email/types";
import {
  getQuotationPdfFilename,
  type QuotationDocumentViewModel,
} from "@/lib/quote/quotation-document";

type BuildQuotationEmailOptions = {
  viewModel: QuotationDocumentViewModel;
  fromAddress: string;
  pdfAttachment?: Buffer;
};

type BuildInternalQuotationEmailOptions = BuildQuotationEmailOptions & {
  internalRecipient: string;
};

function createPdfAttachment(reference: string, pdfAttachment?: Buffer) {
  if (!pdfAttachment || pdfAttachment.length === 0) {
    return undefined;
  }

  return [
    {
      filename: getQuotationPdfFilename(reference),
      content: pdfAttachment,
      contentType: "application/pdf",
    },
  ];
}

export function buildInternalQuotationEmail({
  viewModel,
  fromAddress,
  internalRecipient,
  pdfAttachment,
}: BuildInternalQuotationEmailOptions): EmailMessage {
  return {
    to: internalRecipient,
    from: fromAddress,
    replyTo: viewModel.contactEmail,
    subject: `New quotation request ${viewModel.reference} — ${viewModel.companyName}`,
    text: renderQuotationTextEmail(viewModel),
    html: renderQuotationHtmlEmail(viewModel),
    attachments: createPdfAttachment(viewModel.reference, pdfAttachment),
    idempotencyKey: `packsendgo-quotation-internal-${viewModel.reference}`,
  };
}

export function buildCustomerQuotationEmail({
  viewModel,
  fromAddress,
  pdfAttachment,
}: BuildQuotationEmailOptions): EmailMessage {
  return {
    to: viewModel.contactEmail,
    from: fromAddress,
    replyTo: packSendGoContact.email,
    subject: `We received your PackSendGo quotation request — ${viewModel.reference}`,
    text: renderQuotationTextEmail(viewModel),
    html: renderQuotationHtmlEmail(viewModel),
    attachments: createPdfAttachment(viewModel.reference, pdfAttachment),
    idempotencyKey: `packsendgo-quotation-customer-${viewModel.reference}`,
  };
}
