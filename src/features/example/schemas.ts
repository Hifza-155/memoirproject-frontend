/**
 * The contract for the `example` feature — the direct twin of the backend's
 * `src/models/example_models.py`.
 *
 * Zod schemas play the role Pydantic models play on the backend: they are the
 * single description of a request and response shape, they validate at runtime,
 * and the TypeScript types are derived from them rather than written twice.
 *
 * When the backend's Pydantic model changes, this file changes. Nothing else
 * in the feature should need to know the field names.
 */

import { z } from "zod";

/** Mirrors `GreetingRequest`. */
export const greetingRequestSchema = z.object({
  name: z.string().trim().min(1, "Please enter a name."),
  excited: z.boolean().default(false),
});

/** Mirrors `GreetingResponse`. */
export const greetingResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
  error: z.string().nullish(),
});

/**
 * `z.input` is what a caller may pass (fields with defaults are optional);
 * `z.infer` is what exists after parsing (defaults filled in). Using the right
 * one at each boundary is what keeps `excited` optional for callers while
 * guaranteed present inside the feature.
 */
export type GreetingRequest = z.input<typeof greetingRequestSchema>;
export type GreetingResponse = z.infer<typeof greetingResponseSchema>;

/**
 * The post-parse shape, used as the form's value type. React Hook Form holds
 * every field including the ones with defaults, so it wants the output type
 * rather than the looser input type callers of `postGreeting` may pass.
 */
export type GreetingFormValues = z.output<typeof greetingRequestSchema>;
