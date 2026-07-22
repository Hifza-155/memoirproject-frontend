# features/example

A placeholder feature that calls the backend's placeholder endpoint,
`POST /example/greet`. It exists to be read and copied, not shipped.

It deliberately consumes **one endpoint two ways**, because real features need both.

## The two paths

```
server path:  app/example/page.tsx  ->  queries.ts  ->  api.ts  ->  lib/api/client.ts  ->  backend
client path:  GreetingForm.tsx      ->  hooks.ts    ->  api.ts  ->  lib/api/client.ts  ->  backend
```

Both converge on `api.ts` and the same schemas, so the endpoint path and its contract are each
written exactly once.

> **Default to the server path. Use the client path only when the data changes in response to the
> user.**

## Files, in reading order

| File | What to notice |
| --- | --- |
| `schemas.ts` | The twin of `example_models.py`. One definition drives form validation, request validation, and the TypeScript types. |
| `api.ts` | The only place `/example/greet` appears. No `fetch`, no base URL, no error handling — that is `lib/api/client.ts`'s job. |
| `queries.ts` | Server path. Imports `server-only`, so the build fails if it reaches the browser. |
| `hooks.ts` | Client path. Note `exampleKeys` — cache keys as a factory, not hand-written arrays. |
| `components/GreetingCard.tsx` | Display only. No directive, so it works on the server *and* inside the client form. |
| `components/GreetingForm.tsx` | `"use client"`. React Hook Form driven by `greetingRequestSchema` — the field error text comes from the schema, not the component. |
| `index.ts` / `server.ts` | Two barrels. See below. |

## Why two barrel files

`queries.ts` imports `server-only`. A single barrel re-exporting it would break the build for any
client component that imported the feature — even one that only wanted a type.

- `from "@/features/example"` — anywhere
- `from "@/features/example/server"` — server components only

## Try breaking it

The fastest way to understand the error handling is to cause it:

1. **Stop the backend**, reload `/example` → `app/error.tsx` renders "Backend unavailable"
   (`code: "network"`).
2. **Rename `message` to `text`** in `schemas.ts`, reload → a `contract` error naming the field.
   That is the drift guard doing its job.
3. **Submit an empty name** → the schema blocks it in the browser; no request is ever sent.

## Copying it

Delete whichever data path you do not need, rename the files, and point `api.ts` at your endpoint.
See `src/features/README.md` for the full recipe.
