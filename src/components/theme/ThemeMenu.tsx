"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useSyncExternalStore, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

const emptySubscribe = () => () => undefined;

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-11 w-11 rounded-sm border border-outline/30 bg-surface-container"
        aria-hidden
      />
    );
  }

  const current = themes.find((item) => item.value === theme)?.label ?? "System";

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current}. Open theme menu`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-sm border border-outline/30",
          "bg-surface-container text-on-surface hover:bg-surface-container-high",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-4a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM8 12a1 1 0 0 1-1 1H5a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm9.95 5.95a1 1 0 0 1-1.41 0l-1.41-1.41a1 1 0 1 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41ZM8.88 8.88 7.46 7.46a1 1 0 0 1 1.41-1.41l1.42 1.42a1 1 0 1 1-1.41 1.41ZM16.54 16.54a1 1 0 0 1-1.41 0l-1.42-1.42a1 1 0 1 1 1.41-1.41l1.42 1.42a1 1 0 0 1 0 1.41ZM8.88 15.12a1 1 0 1 1-1.41 1.41L6.05 15.1a1 1 0 1 1 1.41-1.41l1.42 1.43ZM18 12a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Z"
          />
        </svg>
      </button>
      {open ? (
        <div
          role="menu"
          aria-label="Theme options"
          className="absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-36 border border-outline/20 bg-surface-container p-1 shadow-elevated"
        >
          {themes.map((item) => (
            <button
              key={item.value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === item.value}
              onClick={() => {
                setTheme(item.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-3 py-2 text-left text-sm",
                theme === item.value
                  ? "bg-cobalt/10 text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
