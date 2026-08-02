import type { QuoteFormValues } from "@/lib/quote/schema";

export type EmailMessage = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
};

export type EmailDeliveryResult = {
  status: "SENT" | "FAILED" | "LOGGED";
  providerResponse?: string;
};

export interface EmailTransport {
  send(message: EmailMessage): Promise<EmailDeliveryResult>;
}

export function getEmailConfigurationStatus() {
  const from = process.env.EMAIL_FROM?.trim();
  const internalRecipient = process.env.QUOTE_NOTIFICATION_EMAIL?.trim();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const isConfigured = Boolean(from && internalRecipient && resendApiKey);

  return {
    from,
    internalRecipient,
    resendApiKey: isConfigured ? resendApiKey : undefined,
    isConfigured,
  };
}

export function buildCustomerEmail(
  values: QuoteFormValues,
  reference: string,
  fromAddress: string,
): EmailMessage {
  return {
    to: values.email,
    from: fromAddress,
    subject: `PackSendGo quotation request received — ${reference}`,
    text: [
      SUCCESS_INTRO(reference),
      "",
      `Name: ${values.contactName}`,
      `Company: ${values.companyName}`,
      "",
      "PackSendGo will review your requirements and respond manually.",
      "No binding price is included in this acknowledgement.",
    ].join("\n"),
  };
}

export function buildInternalEmail(
  values: QuoteFormValues,
  reference: string,
  fromAddress: string,
  internalRecipient: string,
): EmailMessage {
  return {
    to: internalRecipient,
    from: fromAddress,
    replyTo: values.email,
    subject: `New PackSendGo quotation enquiry — ${reference}`,
    text: [
      `Reference: ${reference}`,
      `Company: ${values.companyName}`,
      `Contact: ${values.contactName}`,
      `Email: ${values.email}`,
      `Telephone: ${values.telephone}`,
      "",
      "Full structured data is stored in the quotation database record.",
    ].join("\n"),
  };
}

function SUCCESS_INTRO(reference: string) {
  return `Thank you. Your quotation request ${reference} has been received.`;
}
