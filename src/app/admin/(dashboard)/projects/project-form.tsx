"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/admin/actions";
import type { Project } from "@/lib/types";

export function ProjectForm({
  project,
  action,
}: {
  project?: Project;
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="title" className="text-sm font-medium text-green-950">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={project?.title}
          disabled={pending}
          className="mt-1.5 w-full rounded-lg border border-green-200 px-3 py-2 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40 disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-medium text-green-950"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={project?.description ?? ""}
          disabled={pending}
          className="mt-1.5 w-full rounded-lg border border-green-200 px-3 py-2 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40 disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="cover_image_url"
          className="text-sm font-medium text-green-950"
        >
          Cover Image URL
        </label>
        <input
          id="cover_image_url"
          name="cover_image_url"
          type="url"
          placeholder="https://…"
          defaultValue={project?.cover_image_url ?? ""}
          disabled={pending}
          className="mt-1.5 w-full rounded-lg border border-green-200 px-3 py-2 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40 disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="goal_amount"
          className="text-sm font-medium text-green-950"
        >
          Goal Amount (KES)
        </label>
        <input
          id="goal_amount"
          name="goal_amount"
          type="number"
          min={0}
          step="0.01"
          defaultValue={project?.goal_amount ?? 0}
          disabled={pending}
          className="mt-1.5 w-full rounded-lg border border-green-200 px-3 py-2 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40 disabled:opacity-60"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-green-950">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={project?.is_active ?? true}
          disabled={pending}
          className="h-4 w-4 rounded border-green-300"
        />
        Active (visible on the public Projects page)
      </label>

      {state?.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary rounded-full px-6 py-3 text-sm font-bold text-green-950 shadow-sm transition-transform hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-70"
      >
        {pending ? "Saving…" : project ? "Save Changes" : "Create Project"}
      </button>
    </form>
  );
}
