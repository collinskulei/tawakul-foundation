import { NextResponse } from "next/server";
import { formatPhoneNumber, initiateStkPush } from "@/lib/mpesa";

export async function POST(request: Request) {
  let body: { phone?: string; amount?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const phone =
    typeof body.phone === "string" ? formatPhoneNumber(body.phone) : null;
  const amount = Number(body.amount);

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
