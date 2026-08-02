import { Resend } from "resend";
import type { EmailDeliveryResult, EmailMessage, EmailTransport } from "@/lib/email/types";

export class ResendTransport implements EmailTransport {
  private readonly client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(message: EmailMessage): Promise<EmailDeliveryResult> {
    try {
      const result = await this.client.emails.send(
        {
          from: message.from,
          to: message.to,
          replyTo: message.replyTo,
          subject: message.subject,
          text: message.text,
          html: message.html,
          attachments: message.attachments?.map((attachment) => ({
            filename: attachment.filename,
            content: attachment.content,
            contentType: attachment.contentType,
          })),
        },
        message.idempotencyKey ? { idempotencyKey: message.idempotencyKey } : undefined,
      );

      if (result.error) {
        console.error("[quote-email:resend]", result.error.message);
        return {
          status: "FAILED",
          providerResponse: result.error.message,
        };
      }

      return {
        status: "SENT",
        providerResponse: result.data?.id ?? "sent",
      };
    } catch (error) {
      console.error("[quote-email:resend]", error instanceof Error ? error.message : "unknown");
      return {
        status: "FAILED",
        providerResponse: "Email delivery failed.",
      };
    }
  }
}
