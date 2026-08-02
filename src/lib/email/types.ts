export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export type EmailMessage = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: EmailAttachment[];
  idempotencyKey?: string;
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
