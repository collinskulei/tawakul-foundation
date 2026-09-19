import { NextResponse } from "next/server";

// Safaricom posts the STK push result here. There's no database yet
// (see the project/donation-tracker work planned for the admin dashboard),
// so for now this just logs the outcome for manual reconciliation.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const callback = body?.Body?.stkCallback;

  if (callback) {
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
  } else {
    console.warn("M-Pesa callback: unrecognized payload", body);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
