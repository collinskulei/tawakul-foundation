"use client";

import Image from "next/image";
import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-green-50 px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-green-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Tawakul Foundation logo"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <h1 className="mt-4 text-xl font-bold text-green-950">
            Admin Sign In
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Manage projects and donation tracking.
          </p>
        </div>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-green-950"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={pending}
              className="mt-1.5 w-full rounded-lg border border-green-200 px-3 py-2 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40 disabled:opacity-60"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-green-950"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={pending}
              className="mt-1.5 w-full rounded-lg border border-green-200 px-3 py-2 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40 disabled:opacity-60"
            />
          </div>

          {state?.error ? (
            <p className="text-sm text-red-600">{state.error}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full rounded-full px-6 py-3 text-sm font-bold text-green-950 shadow-sm transition-transform hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-70"
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
