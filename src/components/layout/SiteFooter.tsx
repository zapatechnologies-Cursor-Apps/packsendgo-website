import Link from "next/link";
import { PackSendGoLogo } from "@/components/brand/PackSendGoLogo";
import { NavLink } from "@/components/layout/NavLink";
import { footerNavigation, siteConfig, siteCredit } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-outline/20 bg-surface-container">
      <div className="mx-auto w-full max-w-container px-margin-mobile py-12 md:px-margin-desktop">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <PackSendGoLogo variant="white" />
            <p className="max-w-sm text-sm leading-relaxed text-on-surface-variant">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
              Services
            </h2>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className={cn(
                      "text-sm text-on-surface-variant hover:text-on-surface",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
                    )}
                    activeClassName="text-on-surface"
                  >
                    {item.label}
                  </NavLink>
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
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 space-y-2 border-t border-outline/10 pt-6">
          <p className="text-xs text-on-surface-variant">
            © PackSendGo. All rights reserved.
          </p>
          <p className="text-xs text-on-surface-variant">
            Website designed and built by{" "}
            <a
              href={siteCredit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant underline decoration-outline/40 underline-offset-2 hover:text-on-surface hover:decoration-outline/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
            >
              {siteCredit.linkText}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
