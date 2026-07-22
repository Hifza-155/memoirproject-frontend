/**
 * The feature's public surface, client-safe.
 *
 * Everything outside `features/example/` imports from here — never from a
 * file inside the folder. That keeps the internals free to change and makes
 * what a feature offers readable at a glance.
 *
 * Server-only fetchers live in the sibling `server.ts`. They are kept out of
 * this file on purpose: `queries.ts` imports `server-only`, so re-exporting it
 * here would break the build for any client component that touched this
 * barrel — even one that only wanted a type.
 *
 * Deliberately not exported: `api.ts`. Callers pick a data path, and both
 * paths already route through it.
 */

export { useGreetingMutation, exampleKeys } from "@/features/example/hooks";
export { GreetingCard } from "@/features/example/components/GreetingCard";
export { GreetingForm } from "@/features/example/components/GreetingForm";
export type {
  GreetingRequest,
  GreetingResponse,
} from "@/features/example/schemas";
