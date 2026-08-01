/**
 * Server-only site visibility mode.
 * Import only from Server Components, route handlers, and metadata routes.
 */

export type SiteMode = "preview" | "public";

const PUBLIC_MODE: SiteMode = "public";

/**
 * Resolves SITE_MODE from the server environment.
 * Missing, blank or unknown values fail safely to preview.
 */
export function getSiteMode(): SiteMode {
  const raw = process.env.SITE_MODE?.trim().toLowerCase();

  if (raw === PUBLIC_MODE) {
    return PUBLIC_MODE;
  }

  return "preview";
}

export function isPublicSite(): boolean {
  return getSiteMode() === PUBLIC_MODE;
}

export function isPreviewSite(): boolean {
  return !isPublicSite();
}
