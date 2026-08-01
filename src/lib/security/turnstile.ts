type TurnstileVerificationResult =
  | { success: true; mode: "live" | "development-bypass" | "development-placeholder" }
  | { success: false; reason: "missing-token" | "invalid-token" | "configuration" };

export function isTurnstileBypassEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.TURNSTILE_BYPASS_DEV === "true"
  );
}

export function hasTurnstileSiteKey(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());
}

export async function verifyTurnstileToken(
  token: string | undefined,
): Promise<TurnstileVerificationResult> {
  if (!token?.trim()) {
    return { success: false, reason: "missing-token" };
  }

  if (isTurnstileBypassEnabled()) {
    return { success: true, mode: "development-bypass" };
  }

  if (process.env.NODE_ENV !== "production" && token === "development-placeholder-token") {
    return { success: true, mode: "development-placeholder" };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { success: false, reason: "configuration" };
    }
    return { success: true, mode: "development-placeholder" };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    return { success: false, reason: "invalid-token" };
  }

  const result = (await response.json()) as { success?: boolean };
  if (!result.success) {
    return { success: false, reason: "invalid-token" };
  }

  return { success: true, mode: "live" };
}
