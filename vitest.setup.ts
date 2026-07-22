// Adds DOM matchers such as `toBeInTheDocument` to `expect`.
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount between tests so one test's DOM can never satisfy another's query.
afterEach(cleanup);
