import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function insertRow(table: string, data: Record<string, unknown>) {
  if (!supabase) {
    console.warn(`[Supabase] Not configured — skipping insert to ${table}`, data);
    return null;
  }
  const { error } = await supabase.from(table).insert(data);
  if (error) {
    console.error(`[Supabase] Insert to ${table} failed:`, error.message);
  }
  return error;
}
