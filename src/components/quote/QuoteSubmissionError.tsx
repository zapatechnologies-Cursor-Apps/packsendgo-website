import { forwardRef } from "react";

export const QuoteSubmissionError = forwardRef<
  HTMLDivElement,
  { message: string; title?: string }
>(function QuoteSubmissionError({ message, title = "There is a problem" }, ref) {
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-labelledby="quote-error-summary-title"
      className="border border-error-border bg-error-background p-4 text-sm text-error-foreground"
    >
      <p id="quote-error-summary-title" className="font-semibold text-error-title">
        {title}
      </p>
      <p className="mt-1">{message}</p>
    </div>
  );
});
