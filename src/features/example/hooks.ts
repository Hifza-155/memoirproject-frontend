"use client";

/**
 * The CLIENT data path.
 *
 * Use this path only when data changes in response to the user: mutations,
 * polling, user-triggered refetch, optimistic updates. Everything else should
 * be fetched on the server in `queries.ts`.
 *
 * Components never call `postGreeting` directly — they call these hooks, so
 * cache keys and invalidation rules stay in one place.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postGreeting } from "@/features/example/api";
import type {
  GreetingRequest,
  GreetingResponse,
} from "@/features/example/schemas";

/**
 * Cache keys as a factory rather than scattered string arrays.
 *
 * `exampleKeys.all` invalidates everything the feature owns; narrower keys
 * invalidate one entry. Hand-writing `["example", name]` at each call site is
 * how cache invalidation quietly stops working.
 */
export const exampleKeys = {
  all: ["example"] as const,
  greeting: (name: string) => [...exampleKeys.all, "greeting", name] as const,
};

export function useGreetingMutation() {
  const queryClient = useQueryClient();

  return useMutation<GreetingResponse, Error, GreetingRequest>({
    mutationFn: (request) => postGreeting(request),
    onSuccess: () => {
      // Anything cached under this feature is now potentially stale.
      void queryClient.invalidateQueries({ queryKey: exampleKeys.all });
    },
  });
}
