"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/supabase/require-user";
import { slugify } from "@/lib/site";
import {
  MAX_PROJECT_IMAGE_BYTES,
  deleteProjectImage,
  uploadProjectImage,
} from "@/lib/supabase/storage";

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
  const goalAmount = Number(formData.get("goal_amount") ?? 0);
  const isActive = formData.get("is_active") === "on";

  return {
    title,
    description: description || null,
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

  const imageFile = formData.get("cover_image");
  let coverImageUrl: string | null = null;

  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > MAX_PROJECT_IMAGE_BYTES) {
      return { error: "Image must be 5 MB or smaller." };
    }
    try {
      coverImageUrl = await uploadProjectImage(imageFile);
    } catch (uploadError) {
      return {
        error:
          uploadError instanceof Error
            ? uploadError.message
            : "Image upload failed.",
      };
    }
  }

  const { error } = await supabase.from("projects").insert({
    ...fields,
    cover_image_url: coverImageUrl,
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

  const existingImageUrl =
    String(formData.get("existing_cover_image_url") ?? "") || null;
  const removeImage = formData.get("remove_cover_image") === "on";
  const imageFile = formData.get("cover_image");

  let coverImageUrl = existingImageUrl;

  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > MAX_PROJECT_IMAGE_BYTES) {
      return { error: "Image must be 5 MB or smaller." };
    }
    try {
      coverImageUrl = await uploadProjectImage(imageFile);
    } catch (uploadError) {
      return {
        error:
          uploadError instanceof Error
            ? uploadError.message
            : "Image upload failed.",
      };
    }
    if (existingImageUrl) {
      await deleteProjectImage(existingImageUrl).catch(() => {});
    }
  } else if (removeImage) {
    if (existingImageUrl) {
      await deleteProjectImage(existingImageUrl).catch(() => {});
    }
    coverImageUrl = null;
  }

  const { error } = await supabase
    .from("projects")
    .update({ ...fields, cover_image_url: coverImageUrl })
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
