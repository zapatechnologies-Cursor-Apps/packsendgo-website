"use client";

import Link from "next/link";
import type { UseFormReturn } from "react-hook-form";
import { Field, FieldError, TextArea } from "@/components/forms/Field";
import { PRIVACY_POLICY_PATH } from "@/lib/quote/constants";
import { buildReviewSections } from "@/lib/quote/review-summary";
import type { QuoteFormValues } from "@/lib/quote/schema";

type StepProps = {
  form: UseFormReturn<QuoteFormValues>;
  onGoToStep: (step: number) => void;
  submitError?: string;
  configurationError?: boolean;
};

export function QuoteStepReview({
  form,
  onGoToStep,
  submitError,
  configurationError,
}: StepProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = form;

  const values = watch();
  const sections = buildReviewSections(values);

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="review-summary-heading"
        className="space-y-6 border border-outline/20 bg-surface-container/30 p-6"
      >
        <h2 id="review-summary-heading" className="font-display text-2xl font-semibold text-on-surface">
          Review your enquiry
        </h2>

        {sections.map((section) => (
          <div key={section.step} className="space-y-3 border-t border-outline/15 pt-4 first:border-t-0 first:pt-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-cobalt uppercase tracking-[0.12em]">
                {section.title}
              </h3>
              <button
                type="button"
                onClick={() => onGoToStep(section.step)}
                className="text-sm font-medium text-signal-lime underline"
              >
                Edit
              </button>
            </div>
            {section.emphasis ? (
              <p className="border-l-2 border-signal-lime pl-3 text-sm text-on-surface">{section.emphasis}</p>
            ) : null}
            <dl className="grid gap-3 text-sm md:grid-cols-2">
              {section.rows.map((row) => (
                <div key={`${section.step}-${row.label}`}>
                  <dt className="text-on-surface-variant">{row.label}</dt>
                  <dd
                    className={
                      row.unanswered ? "text-on-surface-variant italic" : "text-on-surface"
                    }
                  >
                    {row.value || "Not provided"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>

      <Field label="Additional requirements" htmlFor="additionalNotes" optional error={errors.additionalNotes?.message}>
        <TextArea id="additionalNotes" {...register("additionalNotes")} />
      </Field>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-on-surface">
          Privacy consent
          <span className="ml-2 text-xs font-normal text-on-surface-variant">Required</span>
        </legend>
        <label className="flex items-start gap-3 text-sm text-on-surface">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-signal-lime"
            aria-invalid={errors.privacyConsent ? true : undefined}
            {...register("privacyConsent")}
          />
          <span>
            I have reviewed and accept the{" "}
            <Link href={PRIVACY_POLICY_PATH} className="text-signal-lime underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.privacyConsent?.message ? <FieldError message={errors.privacyConsent.message} /> : null}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-on-surface">
          Marketing communications
          <span className="ml-2 text-xs font-normal text-on-surface-variant">Optional</span>
        </legend>
        <label className="flex items-start gap-3 text-sm text-on-surface">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-signal-lime" {...register("marketingConsent")} />
          <span>I would like to receive marketing communications from PackSendGo.</span>
        </label>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-on-surface">
          Accuracy confirmation
          <span className="ml-2 text-xs font-normal text-on-surface-variant">Required</span>
        </legend>
        <label className="flex items-start gap-3 text-sm text-on-surface">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-signal-lime"
            aria-invalid={errors.accuracyConfirmation ? true : undefined}
            {...register("accuracyConfirmation")}
          />
          <span>I confirm that the information provided is accurate.</span>
        </label>
        {errors.accuracyConfirmation?.message ? (
          <FieldError message={errors.accuracyConfirmation.message} />
        ) : null}
      </fieldset>

      {submitError ? (
        <div
          role="alert"
          className="border border-red-400/40 bg-red-950/20 p-4 text-sm text-red-200"
        >
          <p className="font-semibold text-red-100">
            {configurationError ? "Service temporarily unavailable" : "Submission failed"}
          </p>
          <p className="mt-1">{submitError}</p>
          {configurationError ? (
            <p className="mt-2 text-on-surface-variant">
              Your entered details remain in this form so you can try again once configuration is corrected.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
