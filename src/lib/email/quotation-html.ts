import { denzilDealsLtd, zapaTechnologiesLtd } from "@/lib/legal-data";
import type { QuotationDocumentViewModel } from "@/lib/quote/quotation-document";
import { escapeHtml } from "@/lib/utils/escape-html";

const BRAND_COLOUR = "#2e5bff";
const ACCENT_COLOUR = "#d1ff26";
const HEADING_COLOUR = "#0f172a";
const BODY_COLOUR = "#334155";
const BORDER_COLOUR = "#e2e8f0";

function renderRowValue(value: string | string[]): string {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return `<span style="color:${BODY_COLOUR};">Not provided</span>`;
    }
    return `<ul style="margin:4px 0 0 18px;padding:0;color:${BODY_COLOUR};">${value
      .map((item) => `<li style="margin:0 0 4px;">${escapeHtml(item)}</li>`)
      .join("")}</ul>`;
  }

  return `<span style="color:${BODY_COLOUR};word-break:break-word;">${escapeHtml(value)}</span>`;
}

function renderSectionRows(viewModel: QuotationDocumentViewModel): string {
  return viewModel.sections
    .map((section) => {
      const emphasis = section.emphasis
        ? `<p style="margin:0 0 12px;padding:8px 12px;border-left:3px solid ${ACCENT_COLOUR};background:#f8fafc;color:${BODY_COLOUR};font-size:14px;line-height:1.5;">${escapeHtml(section.emphasis)}</p>`
        : "";

      const rows = section.rows
        .map(
          (entry) => `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid ${BORDER_COLOUR};vertical-align:top;width:38%;font-size:13px;font-weight:600;color:${HEADING_COLOUR};">${escapeHtml(entry.label)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid ${BORDER_COLOUR};vertical-align:top;font-size:14px;line-height:1.5;">${renderRowValue(entry.value)}</td>
          </tr>`,
        )
        .join("");

      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND_COLOUR};">${escapeHtml(section.title)}</td>
        </tr>
        ${emphasis ? `<tr><td colspan="2" style="padding:0 0 8px;">${emphasis}</td></tr>` : ""}
        ${rows}
      </table>`;
    })
    .join("");
}

function renderIntro(viewModel: QuotationDocumentViewModel): string {
  if (viewModel.audience === "internal") {
    return `<p style="margin:0 0 16px;color:${BODY_COLOUR};font-size:15px;line-height:1.6;">A new quotation request has been submitted. Reply directly to this message to contact the customer. A structured summary is included below and attached as a PDF.</p>`;
  }

  return `<p style="margin:0 0 12px;color:${BODY_COLOUR};font-size:15px;line-height:1.6;">Dear ${escapeHtml(viewModel.contactName)},</p>
    <p style="margin:0 0 16px;color:${BODY_COLOUR};font-size:15px;line-height:1.6;">Thank you. We have received your PackSendGo quotation request and our team will review your requirements before contacting you. A complete summary of your submission is included below and attached as a PDF.</p>`;
}

function renderFooter(viewModel: QuotationDocumentViewModel): string {
  const supportLine =
    viewModel.audience === "customer"
      ? `<p style="margin:0 0 12px;color:${BODY_COLOUR};font-size:14px;line-height:1.6;">If you need help, contact us at <a href="mailto:${escapeHtml(viewModel.supportEmail)}" style="color:${BRAND_COLOUR};text-decoration:underline;">${escapeHtml(viewModel.supportEmail)}</a>.</p>`
      : `<p style="margin:0 0 12px;color:${BODY_COLOUR};font-size:14px;line-height:1.6;">Customer email: <a href="mailto:${escapeHtml(viewModel.contactEmail)}" style="color:${BRAND_COLOUR};text-decoration:underline;">${escapeHtml(viewModel.contactEmail)}</a></p>`;

  return `${supportLine}
    <p style="margin:0 0 16px;color:${BODY_COLOUR};font-size:13px;line-height:1.6;">${escapeHtml(viewModel.disclaimer)}</p>
    <p style="margin:0 0 4px;color:${BODY_COLOUR};font-size:12px;line-height:1.5;">${escapeHtml(denzilDealsLtd.legalName)} · Company number ${escapeHtml(denzilDealsLtd.companyNumber)} · ${escapeHtml(denzilDealsLtd.registeredOffice)}</p>
    <p style="margin:0;color:${BODY_COLOUR};font-size:12px;line-height:1.5;">${escapeHtml(zapaTechnologiesLtd.relationship)} ${escapeHtml(zapaTechnologiesLtd.legalName)} · Company number ${escapeHtml(zapaTechnologiesLtd.companyNumber)} · ${escapeHtml(zapaTechnologiesLtd.businessAddress)}</p>`;
}

export function renderQuotationHtmlEmail(viewModel: QuotationDocumentViewModel): string {
  const attachmentNote =
    viewModel.audience === "customer"
      ? `<p style="margin:0 0 16px;color:${BODY_COLOUR};font-size:14px;line-height:1.6;">Your request summary is also attached as a PDF for your records.</p>`
      : `<p style="margin:0 0 16px;color:${BODY_COLOUR};font-size:14px;line-height:1.6;">An internal PDF summary is attached for operational review.</p>`;

  return `<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(viewModel.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border:1px solid ${BORDER_COLOUR};">
            <tr>
              <td style="padding:24px 28px;border-bottom:4px solid ${ACCENT_COLOUR};">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND_COLOUR};">PackSendGo</p>
                <h1 style="margin:0 0 8px;font-size:24px;line-height:1.3;color:${HEADING_COLOUR};">${escapeHtml(viewModel.title)}</h1>
                <p style="margin:0;font-size:14px;color:${BODY_COLOUR};"><strong>Reference:</strong> ${escapeHtml(viewModel.reference)} · <strong>Submitted:</strong> ${escapeHtml(viewModel.submittedAt)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${renderIntro(viewModel)}
                ${attachmentNote}
                ${renderSectionRows(viewModel)}
                ${renderFooter(viewModel)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
