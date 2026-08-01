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
      className="border border-red-400/40 bg-red-950/20 p-4 text-sm text-red-200"
    >
      <p id="quote-error-summary-title" className="font-semibold text-red-100">
        {title}
      </p>
      <p className="mt-1">{message}</p>
    </div>
  );
});
