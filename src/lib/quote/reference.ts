import { prisma } from "@/lib/prisma";

const REFERENCE_PREFIX = "PSG";
const MAX_ATTEMPTS = 8;

function formatDatePart(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function randomSuffix(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let index = 0; index < 4; index += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return suffix;
}

export async function generateQuoteReference(date = new Date()): Promise<string> {
  const datePart = formatDatePart(date);

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const candidate = `${REFERENCE_PREFIX}-${datePart}-${randomSuffix()}`;
    const existing = await prisma.quoteRequest.findUnique({
      where: { publicReference: candidate },
      select: { id: true },
    });
    if (!existing) {
      return candidate;
    }
  }

  throw new Error("Unable to generate a unique quotation reference.");
}
