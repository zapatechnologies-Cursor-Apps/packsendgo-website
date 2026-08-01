export type RateLimitContext = {
  email: string;
  idempotencyKey: string;
};

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: "rate-limit" };

export interface RateLimiter {
  check(context: RateLimitContext): Promise<RateLimitResult>;
}

class NoOpRateLimiter implements RateLimiter {
  async check(): Promise<RateLimitResult> {
    return { allowed: true };
  }
}

export const rateLimiter: RateLimiter = new NoOpRateLimiter();
