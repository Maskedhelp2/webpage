
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.MASKEDFLIPPER_TOKEN;

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
      return NextResponse.json(
        {
          error: "Gateway unavailable",
          gatewayStatus: response.status,
        },
        { status: 502 }
      );
    }

    const status: unknown = await response.json();

    return NextResponse.json(status, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Raspberry Pi gateway" },
      { status: 502 }
    );
  }
}
