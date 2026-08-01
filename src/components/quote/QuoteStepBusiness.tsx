"use client";

import type { UseFormReturn } from "react-hook-form";
import { CheckboxGroup, Field, SelectInput, TextInput } from "@/components/forms/Field";
import {
  BUSINESS_STAGES,
  CURRENT_FULFILMENT,
  ENQUIRY_REASONS,
  PRODUCT_CATEGORIES,
  REQUIRED_START_DATES,
  SALES_CHANNELS,
} from "@/lib/quote/constants";
import type { QuoteFormValues } from "@/lib/quote/schema";

type StepProps = {
  form: UseFormReturn<QuoteFormValues>;
};

export function QuoteStepBusiness({ form }: StepProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const productCategory = watch("productCategory");
  const salesChannels = watch("salesChannels") ?? [];

  return (
    <div className="space-y-6">
      <Field label="Business stage" htmlFor="businessStage" error={errors.businessStage?.message}>
        <SelectInput id="businessStage" defaultValue="" {...register("businessStage")}>
          <option value="" disabled>
            Select business stage
          </option>
          {BUSINESS_STAGES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field
        label="Product category"
        htmlFor="productCategory"
        hint="Select the category that best describes your products."
        error={errors.productCategory?.message}
      >
        <SelectInput id="productCategory" defaultValue="" {...register("productCategory")}>
          <option value="" disabled>
            Select product category
          </option>
          {PRODUCT_CATEGORIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      {productCategory === "other" ? (
        <Field
          label="Describe your product category"
          htmlFor="productCategoryOther"
          error={errors.productCategoryOther?.message}
        >
          <TextInput id="productCategoryOther" {...register("productCategoryOther")} />
        </Field>
      ) : null}
      <Field label="Current fulfilment arrangement" htmlFor="currentFulfilment" error={errors.currentFulfilment?.message}>
        <SelectInput id="currentFulfilment" defaultValue="" {...register("currentFulfilment")}>
          <option value="" disabled>
            Select current arrangement
          </option>
          {CURRENT_FULFILMENT.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Desired start date" htmlFor="requiredStartDate" optional error={errors.requiredStartDate?.message}>
        <SelectInput id="requiredStartDate" defaultValue="" {...register("requiredStartDate")}>
          <option value="">Select start timeframe</option>
          {REQUIRED_START_DATES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Primary reason for enquiry" htmlFor="enquiryReason" error={errors.enquiryReason?.message}>
        <SelectInput id="enquiryReason" defaultValue="" {...register("enquiryReason")}>
          <option value="" disabled>
            Select reason
          </option>
          {ENQUIRY_REASONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <CheckboxGroup
        legend="Sales channels"
        groupId="salesChannels-group"
        options={SALES_CHANNELS}
        values={salesChannels}
        onChange={(values) =>
          setValue("salesChannels", values as QuoteFormValues["salesChannels"], {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        error={errors.salesChannels?.message}
      />
      {salesChannels.includes("other_marketplace") ? (
        <Field label="Other marketplace details" htmlFor="salesChannelOther" error={errors.salesChannelOther?.message}>
          <TextInput id="salesChannelOther" {...register("salesChannelOther")} />
        </Field>
      ) : null}
      {salesChannels.includes("custom_platform") ? (
        <Field label="Custom platform details" htmlFor="customPlatformDetails" error={errors.customPlatformDetails?.message}>
          <TextInput id="customPlatformDetails" {...register("customPlatformDetails")} />
        </Field>
      ) : null}
    </div>
  );
}
