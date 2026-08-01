import Link from "next/link";
import { PackSendGoLogo } from "@/components/brand/PackSendGoLogo";
import { ThemeMenu } from "@/components/theme/ThemeMenu";
import { mainNavigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline/20 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-container items-center justify-between gap-6 px-margin-mobile py-4 md:px-margin-desktop">
        <PackSendGoLogo variant="lime" />

        <nav aria-label="Main">
          <ul className="hidden items-center gap-6 lg:flex">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium text-on-surface-variant transition-colors",
                    "hover:text-on-surface focus-visible:outline focus-visible:outline-2",
                    "focus-visible:outline-offset-4 focus-visible:outline-cobalt",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeMenu />
          <Link
            href="/get-a-quote"
            className={cn(
              "hidden min-h-11 items-center justify-center bg-signal-lime px-4 text-sm font-semibold",
              "text-midnight-graphite sm:inline-flex",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-cobalt",
            )}
          >
            Get a tailored quote
          </Link>
        </div>
      </div>
    </header>
  );
}
