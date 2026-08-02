import {
  Children,
  cloneElement,
  isValidElement,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  htmlFor: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

function describedByIds(htmlFor: string, hint?: string, error?: string) {
  return [hint ? `${htmlFor}-hint` : null, error ? `${htmlFor}-error` : null]
    .filter(Boolean)
    .join(" ");
}

function enhanceControl(
  child: ReactNode,
  htmlFor: string,
  hint?: string,
  error?: string,
): ReactNode {
  if (!isValidElement(child)) return child;
  const describedBy = describedByIds(htmlFor, hint, error);
  const props: Record<string, unknown> = {
    id: htmlFor,
    "aria-invalid": error ? true : undefined,
  };
  if (describedBy) {
    props["aria-describedby"] = describedBy;
  }
  return cloneElement(child as ReactElement<Record<string, unknown>>, props);
}

export function Field({ label, htmlFor, optional, hint, error, children }: FieldProps) {
  const requirement = optional ? "Optional" : "Required";

  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-on-surface">
        {label}
        <span className="ml-2 text-xs font-normal text-on-surface-variant">{requirement}</span>
      </label>
      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-sm text-on-surface-variant">
          {hint}
        </p>
      ) : null}
      {enhanceControl(Children.only(children), htmlFor, hint, error)}
      {error ? <FieldError message={error} id={`${htmlFor}-error`} /> : null}
    </div>
  );
}

export function FieldError({ message, id }: { message: string; id?: string }) {
  return (
    <p id={id} role="alert" className="text-sm text-error-foreground">
      {message}
    </p>
  );
}

const controlClassName =
  "min-h-11 w-full border border-outline/25 bg-input-background px-3 py-2 text-sm text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClassName, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(controlClassName, "min-h-28 resize-y", props.className)}
    />
  );
}

export function SelectInput(props: InputHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(controlClassName, props.className)} />;
}

export function CheckboxGroup({
  legend,
  options,
  values,
  onChange,
  error,
  optional,
  groupId,
}: {
  legend: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  values: string[];
  onChange: (next: string[]) => void;
  error?: string;
  optional?: boolean;
  groupId: string;
}) {
  const requirement = optional ? "Optional" : "Required";
  const describedBy = error ? `${groupId}-error` : undefined;

  return (
    <fieldset className="space-y-3" aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
      <legend className="text-sm font-medium text-on-surface">
        {legend}
        <span className="ml-2 text-xs font-normal text-on-surface-variant">{requirement}</span>
      </legend>
      <div className="space-y-2">
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <label key={option.value} className="flex min-h-11 items-center gap-3 text-sm text-on-surface">
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => {
                  if (event.target.checked) {
                    onChange([...values, option.value]);
                  } else {
                    onChange(values.filter((value) => value !== option.value));
                  }
                }}
                className="h-4 w-4 accent-signal-lime"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? <FieldError message={error} id={`${groupId}-error`} /> : null}
    </fieldset>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  optional,
  groupId,
}: {
  legend: string;
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  optional?: boolean;
  groupId: string;
}) {
  const requirement = optional ? "Optional" : "Required";
  const describedBy = error ? `${groupId}-error` : undefined;

  return (
    <fieldset className="space-y-3" aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
      <legend className="text-sm font-medium text-on-surface">
        {legend}
        <span className="ml-2 text-xs font-normal text-on-surface-variant">{requirement}</span>
      </legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex min-h-11 items-center gap-3 text-sm text-on-surface">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 accent-signal-lime"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error ? <FieldError message={error} id={`${groupId}-error`} /> : null}
    </fieldset>
  );
}
