# src/lib

App-wide infrastructure. Covers the ground the backend splits between `src/integrations/`
(talking to the outside world) and `src/core/` (app setup).

Code here knows nothing about any particular feature. If it mentions a greeting, a user, or an
order, it belongs in `src/features/` instead.

## Contents

| Path | Role | Backend equivalent |
| --- | --- | --- |
| `api/client.ts` | The **only** module that calls `fetch`. Base URL, timeouts, error normalization, response validation. | `integrations/llm_client.py` |
| `api/errors.ts` | The `ApiError` taxonomy: `network`, `http`, `contract`. | — |
| `config/env.ts` | Zod-validated environment variables. Fails at boot, not at runtime. | `core/` |
| `query/client.ts` | TanStack Query defaults: stale time, retry policy. | — |
| `utils.ts` | shadcn's `cn` helper. Managed by the shadcn CLI — leave it alone. | — |

## Adding to this directory

Ask first whether it is really app-wide. A helper used by one feature belongs in that feature.

Good reasons to add here:

- A second external service the app talks to (analytics, file uploads) → new folder under `lib/`,
  built the way `api/` is: one module owning all contact with that service.
- App-wide configuration or a provider used by every route.

When authentication arrives, the token belongs in `api/client.ts` — the single place requests are
built — and nowhere else.
