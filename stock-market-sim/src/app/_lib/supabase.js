import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// By default Nextjs loads environment variables from the .env.local file.
// This doesn't happen when we want to run a script, like a seeder, so we need to load it manually.
// dotenv.config({ path: ".env.local" });

// Only load dotenv if running outside Next.js (i.e., in Node scripts)
if (
  typeof window === "undefined" &&
  // process.env.NODE_ENV === "development" &&
  !process.env.SUPABASE_URL
) {
  dotenv.config({ path: ".env.local" });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
