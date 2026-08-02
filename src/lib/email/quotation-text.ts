import { denzilDealsLtd, zapaTechnologiesLtd } from "@/lib/legal-data";
import type { QuotationDocumentViewModel } from "@/lib/quote/quotation-document";

function wrapText(value: string, width = 78): string {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > width) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines.join("\n");
}

function renderRowValue(value: string | string[]): string[] {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return ["Not provided"];
    }
    return value.map((item) => `- ${item}`);
  }

  return wrapText(value).split("\n");
}

export function renderQuotationTextEmail(viewModel: QuotationDocumentViewModel): string {
  const lines: string[] = [
    "PACKSENDGO QUOTATION REQUEST SUMMARY",
    "",
    `Reference: ${viewModel.reference}`,
    `Submitted: ${viewModel.submittedAt}`,
    "",
  ];

  if (viewModel.audience === "internal") {
    lines.push(
      "A new quotation request has been submitted. Reply directly to this message to contact the customer.",
      "",
    );
  } else {
    lines.push(
      `Dear ${viewModel.contactName},`,
      "",
      "Thank you. We have received your PackSendGo quotation request and our team will review your requirements before contacting you.",
      "",
    );
  }

  for (const section of viewModel.sections) {
    lines.push(section.title.toUpperCase(), "");
    if (section.emphasis) {
      lines.push(wrapText(section.emphasis), "");
    }

    for (const entry of section.rows) {
      const rendered = renderRowValue(entry.value);
      lines.push(`${entry.label}: ${rendered[0] ?? ""}`);
      for (const continuation of rendered.slice(1)) {
        lines.push(continuation.startsWith("- ") ? `  ${continuation}` : `  ${continuation}`);
      }
      lines.push("");
    }
  }

  if (viewModel.audience === "customer") {
    lines.push(`Support: ${viewModel.supportEmail}`, "");
  } else {
    lines.push(`Customer email: ${viewModel.contactEmail}`, "");
  }

  lines.push(
    viewModel.disclaimer,
    "",
    `${denzilDealsLtd.legalName}`,
    `Company number ${denzilDealsLtd.companyNumber}`,
    denzilDealsLtd.registeredOffice,
    "",
    zapaTechnologiesLtd.relationship,
    `${zapaTechnologiesLtd.legalName}`,
    `Company number ${zapaTechnologiesLtd.companyNumber}`,
    zapaTechnologiesLtd.businessAddress,
  );

  return lines.join("\n").trim();
}
