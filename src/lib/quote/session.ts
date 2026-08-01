import type { QuoteDraftState, QuoteFormValues } from "@/lib/quote/types";
import { defaultQuoteFormValues } from "@/lib/quote/types";
import {
  QUOTE_DRAFT_STORAGE_KEY,
  QUOTE_IDEMPOTENCY_STORAGE_KEY,
} from "@/lib/quote/constants";

export type { QuoteDraftState };

export function createIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `idemp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function readQuoteDraft(): { step: number; values: QuoteFormValues } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(QUOTE_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuoteDraftState;
    if (!parsed?.values || typeof parsed.step !== "number") return null;
    return {
      step: Math.min(Math.max(parsed.step, 1), 5),
      values: { ...defaultQuoteFormValues, ...parsed.values },
    };
  } catch {
    return null;
  }
}

export function writeQuoteDraft(state: { step: number; values: QuoteFormValues }): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(QUOTE_DRAFT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable — continue without persistence.
  }
}

export function clearQuoteDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(QUOTE_DRAFT_STORAGE_KEY);
    window.sessionStorage.removeItem(QUOTE_IDEMPOTENCY_STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export function readIdempotencyKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(QUOTE_IDEMPOTENCY_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeIdempotencyKey(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(QUOTE_IDEMPOTENCY_STORAGE_KEY, key);
  } catch {
    // Ignore storage errors.
  }
}

export function getOrCreateIdempotencyKey(): string {
  const existing = readIdempotencyKey();
  if (existing) return existing;
  const created = createIdempotencyKey();
  writeIdempotencyKey(created);
  return created;
}

export function resetIdempotencyKey(): string {
  const created = createIdempotencyKey();
  writeIdempotencyKey(created);
  return created;
}
