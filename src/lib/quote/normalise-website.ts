export const WEBSITE_VALIDATION_MESSAGE =
  "Enter a valid website, for example example.com.";

export type NormaliseWebsiteResult =
  | { ok: true; url: string }
  | { ok: false };

const SCHEME_PATTERN = /^[a-z][a-z0-9+.-]*:/i;
const HOSTNAME_LABEL_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

function isValidHostname(hostname: string): boolean {
  if (!hostname || hostname.length > 253 || hostname.includes(" ")) {
    return false;
  }

  if (hostname.startsWith(".") || hostname.endsWith(".")) {
    return false;
  }

  if (hostname === "localhost") {
    return true;
  }

  const labels = hostname.split(".");
  if (labels.length < 2) {
    return false;
  }

  if (labels.some((label) => !label || !HOSTNAME_LABEL_PATTERN.test(label))) {
    return false;
  }

  const tld = labels[labels.length - 1] ?? "";
  if (tld.length < 2) {
    return false;
  }

  return true;
}

function formatNormalisedUrl(url: URL): string {
  const pathname = url.pathname;
  const path =
    pathname === "/" && !url.search && !url.hash ? "" : pathname;
  return `${url.protocol}//${url.host}${path}${url.search}${url.hash}`;
}

export function normaliseWebsite(raw: string): NormaliseWebsiteResult {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return { ok: false };
  }

  let candidate = trimmed;

  if (SCHEME_PATTERN.test(candidate)) {
    const scheme = candidate.slice(0, candidate.indexOf(":")).toLowerCase();
    if (scheme !== "http" && scheme !== "https") {
      return { ok: false };
    }
  } else {
    candidate = `https://${candidate}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return { ok: false };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false };
  }

  if (parsed.username || parsed.password) {
    return { ok: false };
  }

  if (!isValidHostname(parsed.hostname)) {
    return { ok: false };
  }

  return { ok: true, url: formatNormalisedUrl(parsed) };
}
