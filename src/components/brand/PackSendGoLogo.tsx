import Link from "next/link";
import { cn } from "@/lib/utils";

type PackSendGoLogoProps = {
  variant?: "lime" | "white" | "black";
  className?: string;
};

const variantClasses: Record<NonNullable<PackSendGoLogoProps["variant"]>, string> = {
  lime: "text-signal-lime",
  white: "text-on-surface",
  black: "text-midnight-graphite",
};

export function PackSendGoLogo({
  variant = "lime",
  className,
}: PackSendGoLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-baseline gap-0 font-sans text-lg font-semibold tracking-tight",
        variantClasses[variant],
        className,
      )}
      aria-label="PackSendGo home"
    >
      <span>PackSend</span>
      <span className="relative">
        Go
        <span
          aria-hidden
          className={cn(
            "absolute -top-1 left-[calc(100%+0.1rem)] inline-block h-2 w-2 border border-current",
            "transition-transform motion-reduce:transition-none",
            "group-hover:rotate-12 group-focus-visible:rotate-12",
          )}
        />
      </span>
    </Link>
  );
}
