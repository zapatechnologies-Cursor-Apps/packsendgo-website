"use client";

import type { UseFormReturn } from "react-hook-form";
import { CheckboxGroup, Field, RadioGroup, SelectInput, TextArea, TextInput } from "@/components/forms/Field";
import {
  ADDITIONAL_SERVICES,
  DELIVERY_REGIONS,
  PARCEL_DIMENSIONS,
  PRODUCT_WEIGHTS,
  RETURNS_VOLUMES,
  SPECIAL_COURIER_OPTIONS,
  TRACKING_REQUIRED,
} from "@/lib/quote/constants";
import type { QuoteFormValues } from "@/lib/quote/schema";

type StepProps = {
  form: UseFormReturn<QuoteFormValues>;
};

export function QuoteStepDelivery({ form }: StepProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const deliveryRegions = watch("deliveryRegions") ?? [];
  const additionalServices = watch("additionalServices") ?? [];
  const specialCourierRequired = watch("specialCourierRequired");

  return (
    <div className="space-y-6">
      <CheckboxGroup
        legend="Delivery regions"
        groupId="deliveryRegions-group"
        options={DELIVERY_REGIONS}
        values={deliveryRegions}
        onChange={(values) =>
          setValue("deliveryRegions", values as QuoteFormValues["deliveryRegions"], {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        error={errors.deliveryRegions?.message}
      />
      {deliveryRegions.includes("international") ? (
        <Field
          label="International destinations"
          htmlFor="internationalDestinations"
          error={errors.internationalDestinations?.message}
        >
          <TextArea id="internationalDestinations" {...register("internationalDestinations")} />
        </Field>
      ) : null}
      <Field label="Average parcel size" htmlFor="parcelDimensions" optional error={errors.parcelDimensions?.message}>
        <SelectInput id="parcelDimensions" defaultValue="" {...register("parcelDimensions")}>
          <option value="">Select parcel size</option>
          {PARCEL_DIMENSIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Average parcel weight" htmlFor="parcelWeight" optional error={errors.parcelWeight?.message}>
        <SelectInput id="parcelWeight" defaultValue="" {...register("parcelWeight")}>
          <option value="">Select parcel weight</option>
          {PRODUCT_WEIGHTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Tracked delivery required" htmlFor="trackingRequired" optional error={errors.trackingRequired?.message}>
        <SelectInput id="trackingRequired" defaultValue="" {...register("trackingRequired")}>
          <option value="">Select tracking requirement</option>
          {TRACKING_REQUIRED.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      </Field>
      <RadioGroup
        legend="Special courier requirements"
        name="specialCourierRequired"
        groupId="specialCourierRequired-group"
        optional
        options={SPECIAL_COURIER_OPTIONS}
        value={specialCourierRequired ?? ""}
        onChange={(value) =>
          setValue("specialCourierRequired", value as QuoteFormValues["specialCourierRequired"], {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        error={errors.specialCourierRequired?.message}
      />
      {specialCourierRequired === "yes" ? (
        <Field
          label="Special courier details"
          htmlFor="specialCourierDetails"
          hint="Describe any courier or delivery requirements."
          error={errors.specialCourierDetails?.message}
        >
          <TextArea id="specialCourierDetails" {...register("specialCourierDetails")} />
        </Field>
      ) : null}
      <CheckboxGroup
        legend="Additional services"
        groupId="additionalServices-group"
        optional
        options={ADDITIONAL_SERVICES}
        values={additionalServices}
        onChange={(values) =>
          setValue("additionalServices", values as QuoteFormValues["additionalServices"], {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        error={errors.additionalServices?.message}
      />
      {additionalServices.includes("other") ? (
        <Field label="Other service details" htmlFor="additionalServicesOther" error={errors.additionalServicesOther?.message}>
          <TextInput id="additionalServicesOther" {...register("additionalServicesOther")} />
        </Field>
      ) : null}
      {additionalServices.includes("branded_packaging") ? (
        <Field label="Branded packaging details" htmlFor="brandedPackagingDetails" optional error={errors.brandedPackagingDetails?.message}>
          <TextArea id="brandedPackagingDetails" {...register("brandedPackagingDetails")} />
        </Field>
      ) : null}
      {additionalServices.includes("returns") ? (
        <Field label="Expected returns volume" htmlFor="returnsVolume" optional error={errors.returnsVolume?.message}>
          <SelectInput id="returnsVolume" defaultValue="" {...register("returnsVolume")}>
            <option value="">Select returns volume</option>
            {RETURNS_VOLUMES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      ) : null}
    </div>
  );
}
