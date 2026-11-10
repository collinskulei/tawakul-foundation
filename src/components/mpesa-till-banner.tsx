"use client";

import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

const steps = [
  "Go to M-Pesa and select Lipa na M-Pesa",
  "Choose Buy Goods and Services",
  `Enter Till Number ${site.tillNumber}`,
  "Enter the amount, your PIN, and confirm",
];

export function MpesaTillBanner({ projectTitle }: { projectTitle?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyTill() {
    try {
      await navigator.clipboard.writeText(site.tillNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); the number stays visible on the banner.
    }
  }

  return (
    <div className="w-full">
      <Image
        src="/images/mpesa-till.png"
        alt={`Lipa na M-Pesa — Buy Goods Till Number ${site.tillNumber}`}
        width={3016}
        height={1590}
        sizes="(min-width: 1024px) 28rem, (min-width: 640px) 50vw, 100vw"
        className="mx-auto h-auto w-full max-w-md"
      />

      <button
        type="button"
        onClick={copyTill}
        className="mx-auto mt-5 flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-900"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied ? "Till number copied" : `Copy Till Number ${site.tillNumber}`}
      </button>

      <ol className="mx-auto mt-6 max-w-md list-decimal space-y-1.5 pl-5 text-left text-sm text-stone-600">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      {projectTitle ? (
        <p className="mx-auto mt-4 max-w-md text-left text-sm text-stone-500">
          Donating to {projectTitle}?{" "}
          <a
            href={whatsappLink(
              `Assalamu alaikum, I have just donated to "${projectTitle}" via Till ${site.tillNumber}.`
            )}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-green-800 underline underline-offset-2"
          >
            Let us know on WhatsApp
          </a>{" "}
          after paying so we can count it toward this project.
        </p>
      ) : null}
    </div>
  );
}
