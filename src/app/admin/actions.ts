"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/supabase/require-user";
import { slugify } from "@/lib/site";

export type ActionState = { error?: string } | undefined;

export async function login(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Invalid email or password." };
  }

  redirect("/admin/projects");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function readProjectForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const coverImageUrl = String(formData.get("cover_image_url") ?? "").trim();
  const goalAmount = Number(formData.get("goal_amount") ?? 0);
  const isActive = formData.get("is_active") === "on";

  return {
    title,
    description: description || null,
    cover_image_url: coverImageUrl || null,
    goal_amount: Number.isFinite(goalAmount) ? goalAmount : 0,
    is_active: isActive,
  };
}

export async function createProject(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();
  const supabase = await createClient();
  const fields = readProjectForm(formData);

  if (!fields.title) {
    return { error: "Title is required." };
  }

  const { error } = await supabase.from("projects").insert({
    ...fields,
    slug: `${slugify(fields.title)}-${Date.now().toString(36)}`,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();
  const supabase = await createClient();
  const fields = readProjectForm(formData);

  if (!fields.title) {
    return { error: "Title is required." };
  }

  const { error } = await supabase
    .from("projects")
    .update(fields)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireUser();
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
