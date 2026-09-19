import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Safaricom posts the STK push result here.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const callback = body?.Body?.stkCallback;

  if (!callback) {
    console.warn("M-Pesa callback: unrecognized payload", body);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  const metadata: Record<string, unknown> = {};
  for (const item of callback.CallbackMetadata?.Item ?? []) {
    metadata[item.Name] = item.Value;
  }

  console.log("M-Pesa callback:", {
    merchantRequestId: callback.MerchantRequestID,
    checkoutRequestId: callback.CheckoutRequestID,
    resultCode: callback.ResultCode,
    resultDesc: callback.ResultDesc,
    ...metadata,
  });

  const resultCode = Number(callback.ResultCode);
  const status =
    resultCode === 0 ? "success" : resultCode === 1032 ? "cancelled" : "failed";

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("donations")
      .update({
        status,
        result_desc: callback.ResultDesc,
        mpesa_receipt_number: (metadata.MpesaReceiptNumber as string) ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("checkout_request_id", callback.CheckoutRequestID);

    if (error) console.error("Failed to update donation from callback:", error);
  } catch (error) {
    console.error("Failed to update donation from callback:", error);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
