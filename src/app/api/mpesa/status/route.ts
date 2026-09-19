import { NextResponse } from "next/server";
import { queryStkStatus } from "@/lib/mpesa";

export async function GET(request: Request) {
  const checkoutRequestId = new URL(request.url).searchParams.get(
    "checkoutRequestId"
  );

  if (!checkoutRequestId) {
    return NextResponse.json(
      { error: "Missing checkoutRequestId" },
      { status: 400 }
    );
  }

  try {
    const result = await queryStkStatus(checkoutRequestId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("M-Pesa status query error:", error);
    return NextResponse.json({ status: "pending", resultDesc: "" });
  }
}
