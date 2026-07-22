/**
 * Contract tests. These live next to the schema and answer one question:
 * does the schema actually reject what it claims to reject?
 *
 * Cheap to write, and the first place to add a case when a backend field
 * changes shape.
 */

import { describe, expect, it } from "vitest";

import {
  greetingRequestSchema,
  greetingResponseSchema,
} from "@/features/example/schemas";

describe("greetingRequestSchema", () => {
  it("fills in the default for `excited`", () => {
    const parsed = greetingRequestSchema.parse({ name: "Ada" });
    expect(parsed).toEqual({ name: "Ada", excited: false });
  });

  it("trims whitespace around the name", () => {
    expect(greetingRequestSchema.parse({ name: "  Ada  " }).name).toBe("Ada");
  });

  it("rejects a name that is empty once trimmed", () => {
    const result = greetingRequestSchema.safeParse({ name: "   " });
    expect(result.success).toBe(false);
  });
});

describe("greetingResponseSchema", () => {
  it("accepts the shape the backend documents", () => {
    const result = greetingResponseSchema.safeParse({
      message: "Hello, Ada!",
      success: true,
      error: null,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a payload missing a required field", () => {
    // This is the case that matters: if the backend drops `success`, the app
    // should fail at the boundary rather than render `undefined`.
    const result = greetingResponseSchema.safeParse({ message: "Hello!" });
    expect(result.success).toBe(false);
  });

  it("rejects a field of the wrong type", () => {
    const result = greetingResponseSchema.safeParse({
      message: "Hello!",
      success: "yes",
    });
    expect(result.success).toBe(false);
  });
});
