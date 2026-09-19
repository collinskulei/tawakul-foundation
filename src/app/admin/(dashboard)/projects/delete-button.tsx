"use client";

import { useTransition } from "react";
import { deleteProject } from "@/app/admin/actions";

export function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm("Delete this project? This cannot be undone.")) return;
        startTransition(() => {
          deleteProject(id);
        });
      }}
      className="rounded-full border border-red-200 px-4 py-1.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
