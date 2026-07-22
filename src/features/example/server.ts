/**
 * The feature's public surface, server-only.
 *
 * Import this from server components (pages, layouts, route handlers). Import
 * `./index` from anywhere. Splitting the barrel in two is what lets the
 * `server-only` guard do its job: a client component that reaches for this
 * file fails at build time with a clear message.
 */

import "server-only";

export { getGreeting } from "@/features/example/queries";
