import { z } from "zod";

const envSchema = z.object({
  /** Base URL of the FastAPI backend, with no trailing slash. */
  NEXT_PUBLIC_API_BASE_URL: z
    .url("must be a valid URL, e.g. http://localhost:8000")
    .transform((url) => url.replace(/\/+$/, "")),

  /** How long a single API request may take before it is aborted. */
  NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(10_000),

  /** Supabase Configuration */
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("https://fqpizscquprqqubsaymq.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcGl6c2NxdXBycXF1YnNheW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDY5NjUsImV4cCI6MjEwMTUyMjk2NX0.2VbuUfMTDsG-eqEisfCYDTeqKf1852uzkYKf6RwonmA"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_TIMEOUT_MS: process.env.NEXT_PUBLIC_API_TIMEOUT_MS,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");

  throw new Error(
    `Invalid environment configuration:\n${details}\n\n` +
      `Copy .env.example to .env.local and fill in the missing values.`,
  );
}

export const env = parsed.data;