import { notFound } from "next/navigation";
import { updateProject } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  const project = data as Project | null;
  if (!project) notFound();

  const boundAction = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-950">Edit Project</h1>
      <div className="mt-6">
        <ProjectForm project={project} action={boundAction} />
      </div>
    </div>
  );
}
