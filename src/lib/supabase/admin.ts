import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for privileged, server-only writes (e.g. recording
 * M-Pesa callback results) where there is no signed-in user session to
 * satisfy RLS. Never import this from client components or expose the key
 * to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
