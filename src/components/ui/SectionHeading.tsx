import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-cobalt uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
