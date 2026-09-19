import { NextResponse } from "next/server";
import { queryStkStatus } from "@/lib/mpesa";
import { createAdminClient } from "@/lib/supabase/admin";

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

    // Fallback sync in case the async callback (src/app/api/mpesa/callback)
    // never lands — keeps the donation record from being stuck "pending".
    if (result.status !== "pending") {
      try {
        const supabase = createAdminClient();
        await supabase
          .from("donations")
          .update({
            status: result.status,
            result_desc: result.resultDesc,
            updated_at: new Date().toISOString(),
          })
          .eq("checkout_request_id", checkoutRequestId)
          .eq("status", "pending");
      } catch (dbError) {
        console.error("Failed to sync donation status:", dbError);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("M-Pesa status query error:", error);
    return NextResponse.json({ status: "pending", resultDesc: "" });
  }
}
