"use client";

import type { UseFormReturn } from "react-hook-form";
import { CheckboxGroup, Field, SelectInput, TextArea, TextInput } from "@/components/forms/Field";
import {
  GROWTH_EXPECTATIONS,
  ITEMS_PER_ORDER,
  MONTHLY_ORDER_RANGES,
  PRODUCT_WEIGHTS,
  SEASONAL_PEAKS,
  SKU_COUNTS,
  SPECIAL_HANDLING,
  STOCK_VOLUMES,
  STORAGE_TYPES,
} from "@/lib/quote/constants";
import type { QuoteFormValues } from "@/lib/quote/schema";

type StepProps = {
  form: UseFormReturn<QuoteFormValues>;
};

export function QuoteStepOrders({ form }: StepProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const specialHandling = watch("specialHandling") ?? [];
  const requiresHandlingDetails = specialHandling.some(
    (value: string) => value !== "none" && value !== "not_sure",
  );

  return (
    <div className="space-y-6">
      <Field label="Approximate monthly orders" htmlFor="monthlyOrderRange" error={errors.monthlyOrderRange?.message}>
        <SelectInput id="monthlyOrderRange" defaultValue="" {...register("monthlyOrderRange")}>
          <option value="" disabled>
            Select monthly order range
          </option>
          {MONTHLY_ORDER_RANGES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Number of SKUs" htmlFor="skuCount" error={errors.skuCount?.message}>
        <SelectInput id="skuCount" defaultValue="" {...register("skuCount")}>
          <option value="" disabled>
            Select SKU count
          </option>
          {SKU_COUNTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Average items per order" htmlFor="itemsPerOrder" error={errors.itemsPerOrder?.message}>
        <SelectInput id="itemsPerOrder" defaultValue="" {...register("itemsPerOrder")}>
          <option value="" disabled>
            Select items per order
          </option>
          {ITEMS_PER_ORDER.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Seasonal volume changes" htmlFor="seasonalPeaks" optional error={errors.seasonalPeaks?.message}>
        <SelectInput id="seasonalPeaks" defaultValue="" {...register("seasonalPeaks")}>
          <option value="">Select seasonal pattern</option>
          {SEASONAL_PEAKS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Expected growth (12 months)" htmlFor="growthExpectation" optional error={errors.growthExpectation?.message}>
        <SelectInput id="growthExpectation" defaultValue="" {...register("growthExpectation")}>
          <option value="">Select growth expectation</option>
          {GROWTH_EXPECTATIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Approximate stock volume" htmlFor="stockVolume" error={errors.stockVolume?.message}>
        <SelectInput id="stockVolume" defaultValue="" {...register("stockVolume")}>
          <option value="" disabled>
            Select stock volume
          </option>
          {STOCK_VOLUMES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <CheckboxGroup
        legend="Storage type required"
        groupId="storageType-group"
        options={STORAGE_TYPES}
        values={watch("storageType") ?? []}
        onChange={(values) =>
          setValue("storageType", values as QuoteFormValues["storageType"], {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        error={errors.storageType?.message}
      />
      <Field label="Average product dimensions" htmlFor="productDimensions" optional error={errors.productDimensions?.message}>
        <TextInput id="productDimensions" {...register("productDimensions")} />
      </Field>
      <Field label="Average product weight" htmlFor="productWeight" optional error={errors.productWeight?.message}>
        <SelectInput id="productWeight" defaultValue="" {...register("productWeight")}>
          <option value="">Select average weight</option>
          {PRODUCT_WEIGHTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <CheckboxGroup
        legend="Fragile or specialist handling"
        groupId="specialHandling-group"
        optional
        options={SPECIAL_HANDLING}
        values={specialHandling}
        onChange={(values) =>
          setValue("specialHandling", values as QuoteFormValues["specialHandling"], {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        error={errors.specialHandling?.message}
      />
      {requiresHandlingDetails ? (
        <Field label="Special handling details" htmlFor="specialHandlingDetails" error={errors.specialHandlingDetails?.message}>
          <TextArea id="specialHandlingDetails" {...register("specialHandlingDetails")} />
        </Field>
      ) : null}
    </div>
  );
}
