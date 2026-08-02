import PDFDocument from "pdfkit";
import { denzilDealsLtd, packSendGoContact, zapaTechnologiesLtd } from "@/lib/legal-data";
import type { QuotationDocumentViewModel } from "@/lib/quote/quotation-document";

const PAGE_MARGIN = 48;
const CONTENT_WIDTH = 595.28 - PAGE_MARGIN * 2;
const HEADING_COLOUR = "#0f172a";
const BODY_COLOUR = "#334155";
const ACCENT_COLOUR = "#d1ff26";
const BRAND_COLOUR = "#2e5bff";

function renderRowValue(doc: PDFKit.PDFDocument, value: string | string[], x: number, width: number) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      doc.fillColor(BODY_COLOUR).font("Helvetica").fontSize(10).text("Not provided", x, doc.y, {
        width,
      });
      return;
    }

    for (const item of value) {
      doc.fillColor(BODY_COLOUR).font("Helvetica").fontSize(10).text(`• ${item}`, x, doc.y, {
        width,
      });
      doc.moveDown(0.2);
    }
    return;
  }

  doc.fillColor(BODY_COLOUR).font("Helvetica").fontSize(10).text(value, x, doc.y, {
    width,
    lineGap: 2,
  });
}

function ensureSpace(doc: PDFKit.PDFDocument, requiredHeight: number) {
  const bottomLimit = doc.page.height - PAGE_MARGIN - 36;
  if (doc.y + requiredHeight > bottomLimit) {
    doc.addPage();
  }
}

function drawFooter(doc: PDFKit.PDFDocument, reference: string) {
  const footerY = doc.page.height - PAGE_MARGIN + 8;
  doc
    .fillColor(BODY_COLOUR)
    .font("Helvetica")
    .fontSize(8)
    .text(
      `${reference} · Page ${doc.bufferedPageRange().count} · ${packSendGoContact.email}`,
      PAGE_MARGIN,
      footerY,
      {
        width: CONTENT_WIDTH,
        align: "center",
      },
    );
}

function drawSection(doc: PDFKit.PDFDocument, viewModel: QuotationDocumentViewModel) {
  for (const section of viewModel.sections) {
    ensureSpace(doc, 48);
    doc
      .fillColor(BRAND_COLOUR)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(section.title.toUpperCase(), PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.moveDown(0.4);

    if (section.emphasis) {
      ensureSpace(doc, 36);
      doc
        .fillColor(BODY_COLOUR)
        .font("Helvetica-Oblique")
        .fontSize(9)
        .text(section.emphasis, PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH, lineGap: 2 });
      doc.moveDown(0.5);
    }

    for (const entry of section.rows) {
      ensureSpace(doc, 56);
      doc.fillColor(HEADING_COLOUR).font("Helvetica-Bold").fontSize(10).text(entry.label, PAGE_MARGIN, doc.y, {
        width: CONTENT_WIDTH,
      });
      doc.moveDown(0.15);
      renderRowValue(doc, entry.value, PAGE_MARGIN, CONTENT_WIDTH);
      doc.moveDown(0.5);
    }

    doc.moveDown(0.3);
  }
}

function drawLegalBlock(doc: PDFKit.PDFDocument) {
  ensureSpace(doc, 120);
  doc
    .fillColor(HEADING_COLOUR)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text("Legal identity", PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH });
  doc.moveDown(0.4);
  doc
    .fillColor(BODY_COLOUR)
    .font("Helvetica")
    .fontSize(9)
    .text(
      [
        "PackSendGo is operated by Denzil Deals Ltd",
        `Company number ${denzilDealsLtd.companyNumber}`,
        denzilDealsLtd.registeredOffice,
        "",
        "Website and technology platform operated and managed by Zapa Technologies Ltd",
        `Company number ${zapaTechnologiesLtd.companyNumber}`,
        zapaTechnologiesLtd.businessAddress,
      ].join("\n"),
      PAGE_MARGIN,
      doc.y,
      { width: CONTENT_WIDTH, lineGap: 2 },
    );
}

export function generateQuotationRequestPdf(
  viewModel: QuotationDocumentViewModel,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: {
        top: PAGE_MARGIN,
        bottom: PAGE_MARGIN + 24,
        left: PAGE_MARGIN,
        right: PAGE_MARGIN,
      },
      bufferPages: true,
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc
      .fillColor(BRAND_COLOUR)
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("PackSendGo", PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc
      .fillColor(HEADING_COLOUR)
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(viewModel.title, PAGE_MARGIN, doc.y + 4, { width: CONTENT_WIDTH });
    doc.moveDown(0.6);

    doc
      .fillColor(BODY_COLOUR)
      .font("Helvetica")
      .fontSize(10)
      .text(`Reference: ${viewModel.reference}`, PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.text(`Submitted: ${viewModel.submittedAt}`, PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.text(`Company: ${viewModel.companyName}`, PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.text(`Contact: ${viewModel.contactName}`, PAGE_MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.moveDown(0.6);

    const disclaimerTop = doc.y;
    doc
      .rect(PAGE_MARGIN, disclaimerTop, CONTENT_WIDTH, 48)
      .fillOpacity(0.15)
      .fill(ACCENT_COLOUR)
      .fillOpacity(1);
    doc
      .fillColor(HEADING_COLOUR)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(viewModel.disclaimer, PAGE_MARGIN + 10, disclaimerTop + 10, {
        width: CONTENT_WIDTH - 20,
        lineGap: 2,
      });
    doc.y = disclaimerTop + 58;
    doc.moveDown(0.4);

    drawSection(doc, viewModel);
    drawLegalBlock(doc);

    const pageRange = doc.bufferedPageRange();
    for (let pageIndex = pageRange.start; pageIndex < pageRange.start + pageRange.count; pageIndex += 1) {
      doc.switchToPage(pageIndex);
      drawFooter(doc, viewModel.reference);
    }

    doc.end();
  });
}
