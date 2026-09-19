const BASE_URL =
  process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** Normalizes Kenyan numbers (07.., 7.., +254.., 254..) to 2547XXXXXXXX / 2541XXXXXXXX. */
export function formatPhoneNumber(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  let normalized: string | null = null;

  if (/^0[17]\d{8}$/.test(digits)) {
    normalized = `254${digits.slice(1)}`;
  } else if (/^254[17]\d{8}$/.test(digits)) {
    normalized = digits;
  } else if (/^[17]\d{8}$/.test(digits)) {
    normalized = `254${digits}`;
  }

  return normalized;
}

async function getAccessToken(): Promise<string> {
  const consumerKey = requireEnv("MPESA_CONSUMER_KEY");
  const consumerSecret = requireEnv("MPESA_CONSUMER_SECRET");
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  const res = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${credentials}` },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to get M-Pesa access token (${res.status})`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function buildTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

export type StkPushResult = {
  merchantRequestId: string;
  checkoutRequestId: string;
  responseDescription: string;
};

export async function initiateStkPush(params: {
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}): Promise<StkPushResult> {
  const shortcode = requireEnv("MPESA_SHORTCODE");
  const passkey = requireEnv("MPESA_PASSKEY");
  const callbackUrl = requireEnv("MPESA_CALLBACK_URL");
  const transactionType =
    process.env.MPESA_TRANSACTION_TYPE ?? "CustomerBuyGoodsOnline";

  const accessToken = await getAccessToken();
  const timestamp = buildTimestamp();
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
    "base64"
  );

  const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: transactionType,
      Amount: Math.round(params.amount),
      PartyA: params.phone,
      PartyB: shortcode,
      PhoneNumber: params.phone,
      CallBackURL: callbackUrl,
      AccountReference: params.accountReference,
      TransactionDesc: params.transactionDesc,
    }),
  });

  const data = await res.json();

  if (!res.ok || data.ResponseCode !== "0") {
    throw new Error(
      data.errorMessage ?? data.ResponseDescription ?? "STK push failed"
    );
  }

  return {
    merchantRequestId: data.MerchantRequestID,
    checkoutRequestId: data.CheckoutRequestID,
    responseDescription: data.ResponseDescription,
  };
}

export type StkStatus = "pending" | "success" | "failed" | "cancelled";

export async function queryStkStatus(
  checkoutRequestId: string
): Promise<{ status: StkStatus; resultDesc: string }> {
  const shortcode = requireEnv("MPESA_SHORTCODE");
  const passkey = requireEnv("MPESA_PASSKEY");

  const accessToken = await getAccessToken();
  const timestamp = buildTimestamp();
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
    "base64"
  );

  const res = await fetch(`${BASE_URL}/mpesa/stkpushquery/v1/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }),
  });

  const data = await res.json();

  // 1037/1032/etc = still awaiting user action or request not found yet.
  if (data.errorCode || data.ResultCode === undefined) {
    return { status: "pending", resultDesc: "Awaiting customer action" };
  }

  const resultCode = Number(data.ResultCode);
  if (resultCode === 0) {
    return { status: "success", resultDesc: data.ResultDesc };
  }
  if (resultCode === 1032) {
    return { status: "cancelled", resultDesc: data.ResultDesc };
  }
  return { status: "failed", resultDesc: data.ResultDesc ?? "Payment failed" };
}
