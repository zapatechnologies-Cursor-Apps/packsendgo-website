"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { QuoteProgress } from "@/components/quote/QuoteProgress";
import { QuoteStepBusiness } from "@/components/quote/QuoteStepBusiness";
import { QuoteStepContact } from "@/components/quote/QuoteStepContact";
import { QuoteStepDelivery } from "@/components/quote/QuoteStepDelivery";
import { QuoteStepOrders } from "@/components/quote/QuoteStepOrders";
import { QuoteStepReview } from "@/components/quote/QuoteStepReview";
import { QuoteSubmissionError } from "@/components/quote/QuoteSubmissionError";
import { QuoteSuccess } from "@/components/quote/QuoteSuccess";
import { applyZodErrors, validateWithSchema } from "@/lib/quote/client-validation";
import { QUOTE_STEPS } from "@/lib/quote/constants";
import { normaliseWebsite } from "@/lib/quote/normalise-website";
import {
  clearQuoteDraft,
  getOrCreateIdempotencyKey,
  readQuoteDraft,
  resetIdempotencyKey,
  writeQuoteDraft,
} from "@/lib/quote/session";
import { defaultQuoteFormValues, type QuoteFormValues } from "@/lib/quote/types";
import { quoteStepSchemas } from "@/lib/quote/schema";

function focusFirstInvalidField(summaryRef: React.RefObject<HTMLDivElement | null>) {
  requestAnimationFrame(() => {
    const firstInvalid = document.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    summaryRef.current?.focus();
  });
}

export function QuoteForm() {
  const initialDraft = typeof window === "undefined" ? null : readQuoteDraft();
  const [step, setStep] = useState(initialDraft?.step ?? 1);
  const [mounted, setMounted] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [configurationError, setConfigurationError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [liveMessage, setLiveMessage] = useState("");
  const summaryErrorRef = useRef<HTMLDivElement>(null);

  const form = useForm<QuoteFormValues>({
    defaultValues: defaultQuoteFormValues,
    mode: "onBlur",
  });

  const { watch, setValue, getValues, reset, setError, clearErrors } = form;

  useEffect(() => {
    setMounted(true);
    const draft = readQuoteDraft();
    if (draft) {
      reset(draft.values);
      setStep(draft.step);
    }
  }, [reset]);

  useEffect(() => {
    if (!mounted) return;
    const subscription = watch((values: Partial<QuoteFormValues>) => {
      writeQuoteDraft({ step, values: values as QuoteFormValues });
    });
    return () => subscription.unsubscribe();
  }, [watch, step, mounted]);

  useEffect(() => {
    const current = QUOTE_STEPS[step - 1];
    if (current) {
      setLiveMessage(`Step ${step} of ${QUOTE_STEPS.length}: ${current.title}`);
    }
  }, [step]);

  const productCategory = watch("productCategory");
  const salesChannels = watch("salesChannels");
  const specialCourierRequired = watch("specialCourierRequired");
  const deliveryRegions = watch("deliveryRegions");
  const additionalServices = watch("additionalServices");
  const specialHandling = watch("specialHandling");

  useEffect(() => {
    if (productCategory !== "other") {
      setValue("productCategoryOther", "");
      clearErrors("productCategoryOther");
    }
  }, [productCategory, setValue, clearErrors]);

  useEffect(() => {
    if (!salesChannels?.includes("other_marketplace")) {
      setValue("salesChannelOther", "");
      clearErrors("salesChannelOther");
    }
    if (!salesChannels?.includes("custom_platform")) {
      setValue("customPlatformDetails", "");
      clearErrors("customPlatformDetails");
    }
  }, [salesChannels, setValue, clearErrors]);

  useEffect(() => {
    if (specialCourierRequired !== "yes") {
      setValue("specialCourierDetails", "");
      clearErrors("specialCourierDetails");
    }
  }, [specialCourierRequired, setValue, clearErrors]);

  useEffect(() => {
    if (!deliveryRegions?.includes("international")) {
      setValue("internationalDestinations", "");
      clearErrors("internationalDestinations");
    }
  }, [deliveryRegions, setValue, clearErrors]);

  useEffect(() => {
    if (!additionalServices?.includes("other")) {
      setValue("additionalServicesOther", "");
      clearErrors("additionalServicesOther");
    }
    if (!additionalServices?.includes("branded_packaging")) {
      setValue("brandedPackagingDetails", "");
      clearErrors("brandedPackagingDetails");
    }
    if (!additionalServices?.includes("returns")) {
      setValue("returnsVolume", "" as QuoteFormValues["returnsVolume"]);
      clearErrors("returnsVolume");
    }
  }, [additionalServices, setValue, clearErrors]);

  useEffect(() => {
    const requiresDetails = (specialHandling ?? []).some(
      (value: string) => value !== "none" && value !== "not_sure",
    );
    if (!requiresDetails) {
      setValue("specialHandlingDetails", "");
      clearErrors("specialHandlingDetails");
    }
  }, [specialHandling, setValue, clearErrors]);

  function validateCurrentStep(currentStep: number) {
    const schema = quoteStepSchemas[currentStep as keyof typeof quoteStepSchemas];
    const result = validateWithSchema(schema, getValues());
    clearErrors();
    setSummaryError(null);
    if (!result.success) {
      applyZodErrors(result.error, setError);
      setSummaryError("Please review the highlighted fields before continuing.");
      setLiveMessage("Validation failed. Please review the highlighted fields.");
      focusFirstInvalidField(summaryErrorRef);
      return false;
    }
    return true;
  }

  function handleContinue() {
    if (!validateCurrentStep(step)) return;
    setStep((current) => Math.min(current + 1, QUOTE_STEPS.length));
  }

  function handleBack() {
    setSummaryError(null);
    setStep((current) => Math.max(current - 1, 1));
  }

  function handleGoToStep(nextStep: number) {
    setSummaryError(null);
    setSubmitError(null);
    setConfigurationError(false);
    setStep(nextStep);
  }

  function handleStartAgain() {
    if (!window.confirm("Start again and clear your current quotation draft?")) return;
    clearQuoteDraft();
    reset(defaultQuoteFormValues);
    resetIdempotencyKey();
    setStep(1);
    setSuccessReference(null);
    setSubmitError(null);
    setConfigurationError(false);
    setSummaryError(null);
    setHoneypot("");
    setLiveMessage("Quotation draft cleared. Step 1 of 5.");
  }

  async function handleSubmit() {
    if (!validateCurrentStep(5)) return;

    setSubmitting(true);
    setSubmitError(null);
    setConfigurationError(false);
    setSummaryError(null);
    setLiveMessage("Submitting your quotation request.");

    try {
      const values = getValues();
      const trimmedWebsite = values.websiteUrl?.trim();
      const websiteNormalisation = trimmedWebsite ? normaliseWebsite(trimmedWebsite) : null;

      const payload = {
        ...values,
        websiteUrl:
          trimmedWebsite && websiteNormalisation?.ok
            ? websiteNormalisation.url
            : values.websiteUrl,
        idempotencyKey: getOrCreateIdempotencyKey(),
        website: honeypot,
      };

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as
        | { ok: true; reference: string }
        | { ok: false; message: string; code?: string; fieldErrors?: Record<string, string> };

      if (!response.ok || !result.ok) {
        if ("fieldErrors" in result && result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, message]) => {
            setError(field as keyof QuoteFormValues, { type: "server", message });
          });
        }
        const isConfiguration =
          response.status === 503 || (!result.ok && "code" in result && result.code === "configuration");
        setConfigurationError(isConfiguration);
        setSubmitError(result.ok ? "We could not submit your enquiry." : result.message);
        setLiveMessage(
          isConfiguration
            ? "Quotation submission is temporarily unavailable."
            : "Submission failed. Please review the form and try again.",
        );
        focusFirstInvalidField(summaryErrorRef);
        return;
      }

      clearQuoteDraft();
      resetIdempotencyKey();
      setSuccessReference(result.reference);
      setLiveMessage(`Quotation request received. Reference ${result.reference}.`);
    } catch {
      setSubmitError("We could not submit your enquiry. Please try again.");
      setLiveMessage("Submission failed due to a network error.");
    } finally {
      setSubmitting(false);
    }
  }

  if (successReference) {
    return (
      <>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {liveMessage}
        </div>
        <QuoteSuccess reference={successReference} />
      </>
    );
  }

  const currentTitle = QUOTE_STEPS[step - 1]?.title ?? "Quotation form";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (step === 5) void handleSubmit();
      }}
      noValidate
      className="space-y-8"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>

      <QuoteProgress currentStep={step} />

      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">{currentTitle}</h1>
        <button
          type="button"
          onClick={handleStartAgain}
          className="min-h-11 text-sm font-medium text-on-surface-variant underline"
        >
          Start again
        </button>
      </div>

      {summaryError ? (
        <QuoteSubmissionError ref={summaryErrorRef} message={summaryError} />
      ) : null}

      {step === 1 ? <QuoteStepContact form={form} /> : null}
      {step === 2 ? <QuoteStepBusiness form={form} /> : null}
      {step === 3 ? <QuoteStepOrders form={form} /> : null}
      {step === 4 ? <QuoteStepDelivery form={form} /> : null}
      {step === 5 ? (
        <QuoteStepReview
          form={form}
          onGoToStep={handleGoToStep}
          submitError={submitError ?? undefined}
          configurationError={configurationError}
        />
      ) : null}

      <div className="hidden" aria-hidden="true">
        <input
          id="website-honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 1 ? (
          <Button type="button" variant="secondary" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < 5 ? (
          <Button type="button" onClick={handleContinue}>
            Continue
          </Button>
        ) : (
          <Button type="submit" disabled={submitting} aria-busy={submitting}>
            {submitting ? "Submitting..." : "Submit quotation request"}
          </Button>
        )}
      </div>
    </form>
  );
}
