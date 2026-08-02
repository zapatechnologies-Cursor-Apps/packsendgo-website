import { ResendTransport } from "@/lib/email/resend-transport";
import type { EmailDeliveryResult, EmailMessage, EmailTransport } from "@/lib/email/types";
import { getEmailConfigurationStatus } from "@/lib/email/types";

function redactSummary(message: EmailMessage): string {
  const attachmentCount = message.attachments?.length ?? 0;
  const attachmentNames = message.attachments?.map((attachment) => attachment.filename).join(", ") ?? "none";
  const attachmentBytes =
    message.attachments?.reduce((total, attachment) => total + attachment.content.length, 0) ?? 0;
  return `[${message.subject}] attachments=${attachmentCount} names=${attachmentNames} bytes=${attachmentBytes} html=${message.html ? "yes" : "no"}`;
}

export class DevelopmentLoggingTransport implements EmailTransport {
  async send(message: EmailMessage): Promise<EmailDeliveryResult> {
    console.info("[quote-email:dev-log]", redactSummary(message), "(no email delivered)");
    return {
      status: "LOGGED",
      providerResponse: "Development logging transport — no email delivered",
    };
  }
}

export class MissingConfigurationTransport implements EmailTransport {
  async send(): Promise<EmailDeliveryResult> {
    console.warn("[quote-email] Email configuration incomplete — notification not delivered.");
    return {
      status: "FAILED",
      providerResponse: "Email configuration is not available.",
    };
  }
}

export function createEmailTransport(): EmailTransport {
  const config = getEmailConfigurationStatus();

  if (config.isConfigured && config.resendApiKey) {
    return new ResendTransport(config.resendApiKey);
  }

  if (process.env.NODE_ENV === "production") {
    return new MissingConfigurationTransport();
  }

  return new DevelopmentLoggingTransport();
}
