import { createClient } from "@/lib/supabase/server";
import type { Donation } from "@/lib/types";

const statusStyles: Record<Donation["status"], string> = {
  success: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-stone-100 text-stone-600",
};

export default async function AdminDonationsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("donations")
    .select("*, projects(title)")
    .order("created_at", { ascending: false })
    .limit(100);

  const donations =
    (data as (Donation & { projects: { title: string } | null })[] | null) ??
    [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-950">
        Recent Donations
      </h1>

      {error ? (
        <p className="mt-6 text-sm text-red-600">
          Couldn&apos;t load donations: {error.message}
        </p>
      ) : null}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-green-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-green-100 bg-green-50 text-xs font-semibold tracking-wide text-green-700 uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-50">
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                  {new Date(donation.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-stone-700">
                  {donation.projects?.title ?? "General Fund"}
                </td>
                <td className="px-4 py-3 text-stone-700">{donation.phone}</td>
                <td className="px-4 py-3 font-semibold text-green-950">
                  KES {donation.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[donation.status]}`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {donation.mpesa_receipt_number ?? "N/A"}
                </td>
              </tr>
            ))}
            {donations.length === 0 && !error ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-stone-500"
                >
                  No donations yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
