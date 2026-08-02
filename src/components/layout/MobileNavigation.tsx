"use client";

import { NavLink } from "@/components/layout/NavLink";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNavigation } from "@/lib/site";
import { cn } from "@/lib/utils";

type MobileNavigationProps = {
  quoteHref?: string;
};

export function MobileNavigation({ quoteHref = "/get-a-quote" }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-sm border border-outline/30 lg:hidden",
          "bg-surface-container text-on-surface hover:bg-surface-container-high",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
        )}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          {open ? (
            <path
              fill="currentColor"
              d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"
            />
          ) : (
            <path
              fill="currentColor"
              d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
            />
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-navigation-panel"
          className="fixed inset-0 z-40 bg-background/70 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <nav
            aria-label="Mobile"
            className="absolute top-[4.75rem] right-0 left-0 border-b border-outline/20 bg-surface-container px-margin-mobile py-6 shadow-elevated"
            onClick={(event) => event.stopPropagation()}
          >
            <ul className="space-y-1">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center px-3 text-base font-medium text-on-surface",
                      "hover:bg-surface-container-high focus-visible:outline focus-visible:outline-2",
                      "focus-visible:outline-offset-2 focus-visible:outline-cobalt",
                    )}
                    activeClassName="bg-surface-container-high"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              href={quoteHref}
              onClick={() => setOpen(false)}
              className={cn(
                "mt-4 inline-flex min-h-11 w-full items-center justify-center bg-signal-lime px-4",
                "text-sm font-semibold text-on-lime",
              )}
            >
              Get a tailored quote
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
