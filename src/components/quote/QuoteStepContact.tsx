"use client";

import type { UseFormReturn } from "react-hook-form";
import { Field, RadioGroup, SelectInput, TextInput } from "@/components/forms/Field";
import { COUNTRIES, PREFERRED_CONTACT_METHODS } from "@/lib/quote/constants";
import type { QuoteFormValues } from "@/lib/quote/schema";

type StepProps = {
  form: UseFormReturn<QuoteFormValues>;
};

export function QuoteStepContact({ form }: StepProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  return (
    <div className="space-y-6">
      <Field label="Your name" htmlFor="contactName" error={errors.contactName?.message}>
        <TextInput id="contactName" autoComplete="name" {...register("contactName")} />
      </Field>
      <Field label="Company name" htmlFor="companyName" error={errors.companyName?.message}>
        <TextInput id="companyName" autoComplete="organization" {...register("companyName")} />
      </Field>
      <Field label="Email address" htmlFor="email" error={errors.email?.message}>
        <TextInput id="email" type="email" autoComplete="email" {...register("email")} />
      </Field>
      <Field
        label="Telephone"
        htmlFor="telephone"
        hint="Include country code where applicable."
        error={errors.telephone?.message}
      >
        <TextInput id="telephone" type="tel" autoComplete="tel" inputMode="tel" {...register("telephone")} />
      </Field>
      <Field
        label="Website or store URL"
        htmlFor="websiteUrl"
        optional
        hint="www and https:// are optional."
        error={errors.websiteUrl?.message}
      >
        <TextInput
          id="websiteUrl"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="example.com"
          {...register("websiteUrl")}
        />
      </Field>
      <Field label="Country" htmlFor="country" error={errors.country?.message}>
        <SelectInput id="country" defaultValue="" {...register("country")}>
          <option value="" disabled>
            Select country
          </option>
          {COUNTRIES.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <RadioGroup
        legend="Preferred contact method"
        name="preferredContactMethod"
        groupId="preferredContactMethod-group"
        options={PREFERRED_CONTACT_METHODS}
        value={watch("preferredContactMethod")}
        onChange={(value) =>
          setValue("preferredContactMethod", value as QuoteFormValues["preferredContactMethod"], {
            shouldDirty: true,
          })
        }
        error={errors.preferredContactMethod?.message}
      />
    </div>
  );
}
