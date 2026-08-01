"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

const emptySubscribe = () => () => undefined;

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeMenu() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useIsClient();

  if (!mounted) {
    return (
      <div
        className="h-9 w-[7.5rem] rounded-sm border border-outline/30 bg-surface-container"
        aria-hidden
      />
    );
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Theme">
      {themes.map((item) => {
        const isActive = theme === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setTheme(item.value)}
            aria-pressed={isActive}
            className={cn(
              "min-h-9 min-w-9 rounded-sm px-2 text-xs font-semibold tracking-wide uppercase transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
              isActive
                ? "bg-cobalt/15 text-on-surface"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
            )}
          >
            {item.label}
          </button>
        );
      })}
      <span className="sr-only">
        Current theme: {resolvedTheme ?? theme}
      </span>
    </div>
  );
}
