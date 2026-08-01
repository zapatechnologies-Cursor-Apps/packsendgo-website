import type { QuoteFormValues } from "@/lib/quote/schema";
import { quoteFormDefaultValues } from "@/lib/quote/schema";

export type { QuoteFormValues };

export type QuoteDraftState = {
  step: number;
  values: Partial<QuoteFormValues>;
};

export const defaultQuoteFormValues = quoteFormDefaultValues as unknown as QuoteFormValues;
