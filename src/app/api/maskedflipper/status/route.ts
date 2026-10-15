
import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const token = process.env.MASKEDFLIPPER_TOKEN;

  console.log("MF_DIAGNOSTIC", {
    configured: Boolean(token),
    length: token?.length ?? 0,
    fingerprint: token
      ? createHash("sha256").update(token).digest("hex").slice(0, 12)
      : "missing",
  });

  if (!token) {
    return NextResponse.json(
      { error: "Gateway credentials are not configured" },
      { status: 503 }
    );
  }

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
      console.error("MF_UPSTREAM_STATUS", response.status);

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

    return NextResponse.json(await response.json(), {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error(
      "MF_FETCH_ERROR",
      error instanceof Error ? error.name : "UnknownError"
    );

    return NextResponse.json(
      { error: "Could not reach Raspberry Pi gateway" },
      { status: 502 }
    );
  }
}
