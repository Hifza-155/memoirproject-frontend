import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

/**
 * Landing page. Deliberately static — it exists to point at the example
 * feature, which is where the actual pattern lives.
 */
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 px-6 py-24">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Frontend Template
        </h1>
        <p className="text-muted-foreground">
          A reference structure for consuming the FastAPI backend. Each layer
          here mirrors a layer in the backend repo — read{" "}
          <code className="font-mono text-sm">README.md</code> for the mapping,
          then copy <code className="font-mono text-sm">features/example/</code>{" "}
          to start a feature of your own.
        </p>
      </div>

      <Link href="/example" className={buttonVariants()}>
        View the example feature
      </Link>
    </main>
  );
}
