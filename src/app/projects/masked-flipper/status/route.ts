
import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function fingerprint(token: string): string {
  return createHash("sha256")
    .update(token)
    .digest("hex")
    .slice(0, 12);
}

export async function GET() {
  const token = process.env.MASKEDFLIPPER_TOKEN;

  if (!token) {
    console.error("MaskedFlipper: gateway token is not configured");

    return NextResponse.json(
      { error: "Gateway credentials are not configured" },
      { status: 503 }
    );
  }

  console.info("MaskedFlipper token diagnostic", {
    configured: true,
    length: token.length,
    fingerprint: fingerprint(token),
  });

  try {
    const response = await fetch(
      "https://gateway.maskedhelp.com/api/status",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.error("MaskedFlipper gateway request failed", {
        status: response.status,
      });

      return NextResponse.json(
        {
          error: "Gateway unavailable",
          gatewayStatus: response.status,
        },
        {
          status: 502,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const status: unknown = await response.json();

    return NextResponse.json(status, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error(
      "MaskedFlipper gateway request error",
      error instanceof Error ? error.name : "UnknownError"
    );

    return NextResponse.json(
      { error: "Could not reach Raspberry Pi gateway" },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
//check