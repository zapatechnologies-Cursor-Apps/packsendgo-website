import Link from "next/link";
import { footerNavigation, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-outline/20 bg-surface-container">
      <div className="mx-auto w-full max-w-container px-margin-mobile py-12 md:px-margin-desktop">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-display text-xl font-semibold text-on-surface">
              {siteConfig.name}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-on-surface-variant">
              {siteConfig.description}
            </p>
            <p className="text-xs text-on-surface-variant">
              Contact details: pending Product Owner input
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
              Company
            </h2>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm text-on-surface-variant hover:text-on-surface",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-cobalt",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
              Legal
            </h2>
            <ul className="space-y-2">
              {footerNavigation.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm text-on-surface-variant hover:text-on-surface",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-cobalt",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-outline/10 pt-6 text-xs text-on-surface-variant">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
