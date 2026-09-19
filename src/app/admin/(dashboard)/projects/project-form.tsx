"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import type { ActionState } from "@/app/admin/actions";
import type { Project } from "@/lib/types";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function ProjectForm({
  project,
  action,
}: {
  project?: Project;
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [clientError, setClientError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(
    project?.cover_image_url ?? null
  );
  const [removeImage, setRemoveImage] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setClientError(null);

    if (!file) {
      setPreview(project?.cover_image_url ?? null);
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setClientError("Image must be 5 MB or smaller.");
      e.target.value = "";
      setPreview(project?.cover_image_url ?? null);
      return;
    }

    setRemoveImage(false);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {project ? (
        <input
          type="hidden"
          name="existing_cover_image_url"
          value={project.cover_image_url ?? ""}
        />
      ) : null}

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
          htmlFor="cover_image"
          className="text-sm font-medium text-green-950"
        >
          Cover Image (max 5 MB)
        </label>

        {preview && !removeImage ? (
          <div className="relative mt-2 aspect-[4/3] w-48 overflow-hidden rounded-lg border border-green-200">
            <Image
              src={preview}
              alt="Cover preview"
              fill
              sizes="192px"
              className="object-cover"
              unoptimized={preview.startsWith("blob:")}
            />
          </div>
        ) : null}

        <input
          id="cover_image"
          name="cover_image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={pending}
          className="mt-2 block w-full text-sm text-stone-600 file:mr-4 file:rounded-full file:border-0 file:bg-green-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-800 hover:file:bg-green-200 disabled:opacity-60"
        />

        {project?.cover_image_url ? (
          <label className="mt-2 flex items-center gap-2 text-sm text-stone-600">
            <input
              type="checkbox"
              name="remove_cover_image"
              checked={removeImage}
              onChange={(e) => {
                setRemoveImage(e.target.checked);
                setPreview(e.target.checked ? null : project.cover_image_url);
              }}
              disabled={pending}
              className="h-4 w-4 rounded border-green-300"
            />
            Remove current image
          </label>
        ) : null}

        {clientError ? (
          <p className="mt-1.5 text-sm text-red-600">{clientError}</p>
        ) : null}
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
        disabled={pending || !!clientError}
        className="btn-primary rounded-full px-6 py-3 text-sm font-bold text-green-950 shadow-sm transition-transform hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-70"
      >
        {pending ? "Saving…" : project ? "Save Changes" : "Create Project"}
      </button>
    </form>
  );
}
