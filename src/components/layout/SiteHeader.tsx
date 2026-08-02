import Link from "next/link";
import { PackSendGoLogo } from "@/components/brand/PackSendGoLogo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { NavLink } from "@/components/layout/NavLink";
import { ThemeMenu } from "@/components/theme/ThemeMenu";
import { mainNavigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const navItems = mainNavigation.filter((item) => item.href !== "/");

  return (
    <header className="sticky top-0 z-50 border-b border-outline/20 bg-background/90 shadow-elevated backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-container items-center justify-between gap-4 px-margin-mobile py-4 md:px-margin-desktop">
        <PackSendGoLogo variant="lime" priority />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className={cn(
                    "text-sm font-medium text-on-surface-variant transition-colors",
                    "hover:text-on-surface focus-visible:outline focus-visible:outline-2",
                    "focus-visible:outline-offset-4 focus-visible:outline-cobalt",
                  )}
                  activeClassName="text-on-surface"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeMenu />
          <Link
            href="/get-a-quote"
            className={cn(
              "hidden min-h-11 items-center justify-center bg-signal-lime px-4 text-sm font-semibold",
              "text-on-lime sm:inline-flex",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
            )}
          >
            Get a tailored quote
          </Link>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
