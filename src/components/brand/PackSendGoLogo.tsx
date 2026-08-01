"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type LogoVariant = "lime" | "white" | "black";

type PackSendGoLogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

const logoColours: Record<LogoVariant, string> = {
  lime: "#D1FF26",
  white: "#E1E2E9",
  black: "#121417",
};

const emptySubscribe = () => () => undefined;

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function LogoMark({ colour }: { colour: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 154 32"
      fill="none"
      aria-hidden
      className="h-8 w-auto md:h-9"
    >
      <text
        x="0"
        y="26"
        fill={colour}
        fontFamily="var(--font-geist), Geist, system-ui, sans-serif"
        fontSize="24"
        fontWeight="600"
        letterSpacing="-0.02em"
      >
        PackSendGo
      </text>
      <g transform="translate(136 0)" className="parcel-mark origin-center">
        <path
          d="M1 4.5 8 1l7 3.5v7L8 15l-7-3.5v-7Z"
          stroke={colour}
          strokeWidth="1.25"
        />
        <path
          d="M8 1v14M1 4.5 8 8l7-3.5"
          stroke={colour}
          strokeWidth="1.25"
        />
      </g>
    </svg>
  );
}

export function PackSendGoLogo({
  variant = "lime",
  className,
}: PackSendGoLogoProps) {
  const mounted = useIsClient();
  const { resolvedTheme } = useTheme();

  const resolvedVariant: LogoVariant = mounted
    ? resolvedTheme === "light"
      ? "black"
      : variant === "lime"
        ? "lime"
        : "white"
    : variant;

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center",
        "transition-transform duration-500 motion-reduce:transition-none",
        "group-hover:[&_.parcel-mark]:rotate-12 group-focus-visible:[&_.parcel-mark]:rotate-12",
        className,
      )}
      aria-label="PackSendGo home"
    >
      <LogoMark colour={logoColours[resolvedVariant]} />
    </Link>
  );
}
