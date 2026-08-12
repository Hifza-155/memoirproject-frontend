# src/utils

The direct twin of the backend's `src/utils/`: **generic helpers that are not tied to any feature.**

This directory is intentionally empty. Add a file the first time a helper is needed by a **second**
caller — not before.

## What belongs here

Pure functions. Same input, same output, no side effects. The test is whether you could paste the file
into an unrelated project and have it work untouched:

- `date.ts` — `formatRelativeTime`, `toIsoDate`, `isSameDay`
- `string.ts` — `truncate`, `slugify`, `initials`, `titleCase`
- `number.ts` — `formatBytes`, `clamp`, `formatCurrency`
- `array.ts` — `groupBy`, `chunk`, `uniqueBy`

One file per topic, named for the topic. Export named functions — no default exports. Put the test
beside it: `date.ts` and `date.test.ts`. Pure functions are the cheapest thing in the repo to test, so
there is no excuse for an untested helper here.

## What does not belong here

| Not this | It goes in |
| --- | --- |
| Anything that calls `fetch` or touches the network | `lib/api/` |
| Anything that reads `process.env` | `lib/config/env.ts` |
| Anything importing React, or a hook | `src/hooks/` or the feature |
| Anything that knows what a memoir, user, or greeting is | `src/features/<name>/` |
| A helper only one feature uses | `features/<name>/utils.ts` |

## utils vs. lib

Both hold code that no single feature owns, and the line between them is dependencies:

- **`src/lib/`** is *infrastructure*. It has dependencies, holds configuration or state, and talks to
  the outside world — the HTTP client, validated env, the query client. You mock it in tests.
- **`src/utils/`** is *pure functions*. No dependencies, no configuration, no I/O. You never mock it;
  you just call it.

Rule of thumb: if it has to be configured, awaited, or mocked, it is `lib/`.

> **Do not confuse this directory with `src/lib/utils.ts`.** That file is shadcn's `cn` helper, managed
> by the shadcn CLI — leave it where it is and do not move it here.
