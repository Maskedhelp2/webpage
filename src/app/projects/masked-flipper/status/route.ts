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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Gateway unavailable" },
        { status: 502 }
      );
    }

    const status = await response.json();

    return NextResponse.json(status, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Raspberry Pi" },
      { status: 502 }
    );
  }
}
//check