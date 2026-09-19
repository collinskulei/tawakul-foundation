"use client";

import { Loader2, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "submitting" | "polling" | "success" | "failed";

const POLL_INTERVAL_MS = 4000;
const POLL_TIMEOUT_MS = 90000;

export function MpesaDonateForm() {
  const [amount, setAmount] = useState("500");
  const [phone, setPhone] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollDeadline = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, []);

  function pollStatus(checkoutRequestId: string) {
    pollDeadline.current = Date.now() + POLL_TIMEOUT_MS;
    pollTimer.current = setInterval(async () => {
      if (Date.now() > pollDeadline.current) {
        if (pollTimer.current) clearInterval(pollTimer.current);
        setPhase("failed");
        setMessage(
          "We didn't get a confirmation in time. If you completed the payment, it may still go through."
        );
        return;
      }

      try {
        const res = await fetch(
          `/api/mpesa/status?checkoutRequestId=${encodeURIComponent(checkoutRequestId)}`
        );
        const data = await res.json();

        if (data.status === "success") {
          if (pollTimer.current) clearInterval(pollTimer.current);
          setPhase("success");
          setMessage("Jazakumullahu khairan! Your donation was received.");
        } else if (data.status === "failed" || data.status === "cancelled") {
          if (pollTimer.current) clearInterval(pollTimer.current);
          setPhase("failed");
          setMessage(data.resultDesc || "The payment was not completed.");
        }
      } catch {
        // transient network error while polling; keep trying until timeout
      }
    }, POLL_INTERVAL_MS);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: Number(amount) }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPhase("failed");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setPhase("polling");
      setMessage("Check your phone and enter your M-Pesa PIN to complete the donation.");
      pollStatus(data.checkoutRequestId);
    } catch {
      setPhase("failed");
      setMessage("Couldn't connect. Check your internet connection and try again.");
    }
  }

  const isBusy = phase === "submitting" || phase === "polling";

  if (phase === "success") {
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-full bg-amber-50 px-4 py-1.5 text-center text-xs font-semibold tracking-wide text-amber-700 uppercase">
        Sandbox mode — no real money is charged yet
      </div>

      <div>
        <label
          htmlFor="mpesa-amount"
          className="text-sm font-medium text-green-950"
        >
          Amount (KES)
        </label>
        <input
          id="mpesa-amount"
          type="number"
          min={1}
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isBusy}
          className="mt-1.5 w-full rounded-lg border border-green-200 px-3 py-2 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40 disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="mpesa-phone"
          className="text-sm font-medium text-green-950"
        >
          M-Pesa Phone Number
        </label>
        <input
          id="mpesa-phone"
          type="tel"
          required
          placeholder="07XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isBusy}
          className="mt-1.5 w-full rounded-lg border border-green-200 px-3 py-2 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40 disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={isBusy}
        className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-green-950 shadow-sm transition-transform hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-70"
      >
        {isBusy ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <Smartphone size={18} />
        )}
        {phase === "polling"
          ? "Waiting for confirmation…"
          : phase === "submitting"
            ? "Sending request…"
            : "Send M-Pesa Request"}
      </button>

      {message ? (
        <p
          className={`text-center text-sm ${
            phase === "failed" ? "text-red-600" : "text-stone-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
