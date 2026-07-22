/**
 * The example route — the frontend twin of the backend's `src/api/example.py`.
 *
 * Routes stay thin. This page fetches through the feature's server entry point
 * and composes the feature's components. It contains no HTTP details, no URL,
 * no business logic — exactly as a FastAPI route delegates to `domain/`.
 *
 * This is a server component (no `"use client"`), so `getGreeting` runs during
 * rendering and the result arrives as HTML with no client round trip.
 */

import Link from "next/link";

import { GreetingCard, GreetingForm } from "@/features/example";
import { getGreeting } from "@/features/example/server";

export default async function ExamplePage() {
  const greeting = await getGreeting("Template");

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 px-6 py-16">
      <header className="space-y-2">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Home
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">
          Example feature
        </h1>
        <p className="text-muted-foreground">
          One backend endpoint, consumed both ways.
        </p>
      </header>

      {/* Server path: fetched above, rendered as HTML. */}
      <GreetingCard
        greeting={greeting}
        title="Server path"
        description="Fetched during render in a server component."
      />

      {/* Client path: fetched in the browser when the user submits. */}
      <GreetingForm />
    </main>
  );
}
