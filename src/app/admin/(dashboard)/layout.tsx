import Link from "next/link";
import { requireUser } from "@/lib/supabase/require-user";
import { logout } from "@/app/admin/actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-[70vh] bg-green-50/50">
      <header className="border-b border-green-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <nav className="flex items-center gap-6">
            <Link href="/admin/projects" className="font-bold text-green-950">
              Admin
            </Link>
            <Link
              href="/admin/projects"
              className="text-sm font-medium text-stone-600 hover:text-green-800"
            >
              Projects
            </Link>
            <Link
              href="/admin/donations"
              className="text-sm font-medium text-stone-600 hover:text-green-800"
            >
              Donations
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500">{user.email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-green-700 px-4 py-1.5 text-sm font-semibold text-green-800 transition-colors hover:bg-green-50"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
