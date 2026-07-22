/**
 * The SERVER data path.
 *
 * Functions here are called from server components during rendering. The
 * result arrives as HTML — no loading spinner, no client-side round trip, and
 * the request happens server-to-server rather than from the user's browser.
 *
 * This is the default path. Reach for `hooks.ts` only when data has to change
 * in response to the user.
 */

// Importing `server-only` makes the boundary enforced rather than advisory:
// if a client component ever imports this file, the build fails with a clear
// message instead of leaking server code into the browser bundle.
import "server-only";

import { postGreeting } from "@/features/example/api";
import type { GreetingResponse } from "@/features/example/schemas";

/**
 * Fetches the greeting rendered on page load.
 *
 * `cache: "no-store"` because the backend exposes this as a POST, and Next.js
 * only caches GET requests. For a GET endpoint you would instead pass
 * `next: { revalidate: 60 }` to cache for a minute, or
 * `next: { tags: ["example"] }` to invalidate on demand via `revalidateTag`.
 */
export async function getGreeting(name: string): Promise<GreetingResponse> {
  return postGreeting({ name, excited: true }, { cache: "no-store" });
}
