import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export const PROJECT_IMAGE_BUCKET = "project-images";
export const MAX_PROJECT_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

export async function uploadProjectImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Image must be a PNG, JPEG, WEBP, or GIF file.");
  }
  if (file.size > MAX_PROJECT_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(PROJECT_IMAGE_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PROJECT_IMAGE_BUCKET).getPublicUrl(path);

  return publicUrl;
}

export async function deleteProjectImage(publicUrl: string): Promise<void> {
  const marker = `/object/public/${PROJECT_IMAGE_BUCKET}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return; // not one of our storage URLs (e.g. external link)

  const path = publicUrl.slice(index + marker.length);
  const supabase = createAdminClient();
  await supabase.storage.from(PROJECT_IMAGE_BUCKET).remove([path]);
}
