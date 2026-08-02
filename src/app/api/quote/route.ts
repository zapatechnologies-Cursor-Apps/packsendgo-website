import { NextResponse } from "next/server";
import { MAX_QUOTE_PAYLOAD_BYTES } from "@/lib/quote/constants";
import { submitQuote } from "@/lib/quote/submit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Invalid request format." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_QUOTE_PAYLOAD_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Request payload is too large." },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const result = await submitQuote(payload);

  if (!result.ok) {
    const status =
      result.code === "configuration"
        ? 503
        : result.code === "rate-limit"
          ? 429
          : result.code === "honeypot"
            ? 400
            : 400;

    return NextResponse.json(
      {
        ok: false,
        code: result.code,
        message: result.message,
        fieldErrors: result.fieldErrors,
      },
      { status },
    );
  }

  return NextResponse.json({
    ok: true,
    reference: result.reference,
    emailMode: result.emailMode,
  });
}
