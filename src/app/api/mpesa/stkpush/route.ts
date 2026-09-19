import { NextResponse } from "next/server";
import { formatPhoneNumber, initiateStkPush } from "@/lib/mpesa";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  let body: { phone?: string; amount?: number; projectId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const phone =
    typeof body.phone === "string" ? formatPhoneNumber(body.phone) : null;
  const amount = Number(body.amount);
  const projectId =
    typeof body.projectId === "string" && body.projectId ? body.projectId : null;

  if (!phone) {
    return NextResponse.json(
      { error: "Enter a valid Safaricom number, e.g. 07XXXXXXXX." },
      { status: 400 }
    );
  }

  if (!Number.isFinite(amount) || amount < 1) {
    return NextResponse.json(
      { error: "Enter a donation amount of at least KES 1." },
      { status: 400 }
    );
  }

  try {
    const result = await initiateStkPush({
      phone,
      amount,
      accountReference: "TAWAKUL DONATION",
      transactionDesc: "Donation to Tawakul Foundation",
    });

    try {
      const supabase = createAdminClient();
      const { error: dbError } = await supabase.from("donations").insert({
        project_id: projectId,
        phone,
        amount,
        status: "pending",
        checkout_request_id: result.checkoutRequestId,
        merchant_request_id: result.merchantRequestId,
      });
      if (dbError) console.error("Failed to record donation:", dbError);
    } catch (dbError) {
      // Don't fail the donor's request if persistence has an issue —
      // the STK push has already gone out to their phone.
      console.error("Failed to record donation:", dbError);
    }

    return NextResponse.json({
      checkoutRequestId: result.checkoutRequestId,
      message: result.responseDescription,
    });
  } catch (error) {
    console.error("M-Pesa STK push error:", error);
    return NextResponse.json(
      {
        error:
          "We couldn't reach M-Pesa right now. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
