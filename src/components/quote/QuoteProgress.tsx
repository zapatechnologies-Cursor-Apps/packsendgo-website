import { QUOTE_STEPS } from "@/lib/quote/constants";
import { cn } from "@/lib/utils";

export function QuoteProgress({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Quotation progress" className="mb-8">
      <ol className="grid gap-3 md:grid-cols-5">
        {QUOTE_STEPS.map((step) => {
          const active = step.id === currentStep;
          const complete = step.id < currentStep;
          return (
            <li
              key={step.id}
              aria-current={active ? "step" : undefined}
              className={cn(
                "border px-3 py-3 text-sm",
                active
                  ? "border-signal-lime bg-surface-container/60 text-on-surface"
                  : complete
                    ? "border-outline/25 text-on-surface-variant"
                    : "border-outline/15 text-on-surface-variant",
              )}
            >
              <span className="block text-xs font-semibold tracking-[0.12em] text-cobalt uppercase">
                Step {step.id}
              </span>
              <span className="mt-1 block font-medium">{step.title}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
