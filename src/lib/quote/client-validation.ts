import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import type { z } from "zod";

export function applyZodErrors<TFieldValues extends FieldValues>(
  error: z.ZodError,
  setError: UseFormSetError<TFieldValues>,
) {
  for (const issue of error.issues) {
    const field = issue.path.join(".") as FieldPath<TFieldValues>;
    setError(field, { type: "manual", message: issue.message });
  }
}

export function validateWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  values: unknown,
):
  | { success: true; data: z.infer<TSchema> }
  | { success: false; error: z.ZodError } {
  const result = schema.safeParse(values);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
