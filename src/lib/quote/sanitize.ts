const markupPattern = /<[^>]*>/g;

/** Strip HTML-like markup from plain-text user input without altering ordinary punctuation. */
export function stripMarkup(value: string): string {
  return value.replace(markupPattern, "").trim();
}

export function sanitizePlainText(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const stripped = stripMarkup(value);
  return stripped.replace(/\s+/g, " ").trim();
}
