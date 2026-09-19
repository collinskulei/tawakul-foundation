import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { ProjectProgress } from "@/lib/types";
import { DeleteProjectButton } from "./delete-button";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_progress")
    .select("*")
    .order("created_at", { ascending: false });

  const projects = (data as ProjectProgress[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-950">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="btn-primary rounded-full px-5 py-2.5 text-sm font-bold text-green-950 shadow-sm transition-transform hover:scale-[1.02]"
        >
          New Project
        </Link>
      </div>

      {error ? (
        <p className="mt-6 text-sm text-red-600">
          Couldn&apos;t load projects: {error.message}
        </p>
      ) : null}

      {!error && projects.length === 0 ? (
        <p className="mt-6 text-sm text-stone-600">
          No projects yet. Create your first one.
        </p>
      ) : null}

      <div className="mt-6 space-y-4">
        {projects.map((project) => {
          const pct =
            project.goal_amount > 0
              ? Math.min(100, (project.raised_amount / project.goal_amount) * 100)
              : 0;

          return (
            <div
              key={project.project_id}
              className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-green-950">
                      {project.title}
                    </h2>
                    {!project.is_active ? (
                      <span className="rounded bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-500">
                        Inactive
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-stone-500">
                    KES {project.raised_amount.toLocaleString()} raised of{" "}
                    {project.goal_amount.toLocaleString()} · {project.donor_count}{" "}
                    donor{project.donor_count === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/admin/projects/${project.project_id}/edit`}
                    className="rounded-full border border-green-700 px-4 py-1.5 text-sm font-semibold text-green-800 transition-colors hover:bg-green-50"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton id={project.project_id} />
                </div>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-green-100">
                <div
                  className="h-full rounded-full bg-gold-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
