/**
 * The feature's calls to the backend.
 *
 * This is the only file that knows the endpoint path exists. Both data paths
 * — the server fetcher in `queries.ts` and the client hook in `hooks.ts` —
 * route through here, so an endpoint is described exactly once.
 *
 * Note what this file does NOT do: no `fetch`, no base URL, no error handling.
 * That belongs to `lib/api/client.ts`, the same way backend domain code calls
 * into `integrations/` rather than talking to a service SDK directly.
 */

import { apiRequest, type ApiRequestCaching } from "@/lib/api/client";
import {
  greetingRequestSchema,
  greetingResponseSchema,
  type GreetingRequest,
  type GreetingResponse,
} from "@/features/example/schemas";

const ENDPOINTS = {
  greet: "/example/greet",
} as const;

export async function postGreeting(
  request: GreetingRequest,
  options: ApiRequestCaching & { signal?: AbortSignal } = {},
): Promise<GreetingResponse> {
  // Validate on the way out as well as on the way in. A malformed request
  // caught here produces a clear message at the call site instead of a 422
  // round-tripped from the backend.
  const body = greetingRequestSchema.parse(request);

  return apiRequest({
    path: ENDPOINTS.greet,
    method: "POST",
    body,
    schema: greetingResponseSchema,
    ...options,
  });
}
