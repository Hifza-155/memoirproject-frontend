'use client';

import { useEffect } from 'react';

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logs the error to the console for debugging
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-start gap-4 px-6 py-24 min-h-screen justify-center bg-[#faf8f5] text-[#381c24] font-sans">
      <h1 className="text-2xl font-semibold tracking-tight font-serif">
        Something went wrong
      </h1>
      
      <p className="text-[#78716c]">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>

      {error.digest && (
        <p className="font-mono text-xs text-[#78716c]/70">
          digest: {error.digest}
        </p>
      )}

      <button
        onClick={reset}
        className="mt-2 bg-[#381c24] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#4a222a] transition shadow-md cursor-pointer"
      >
        Try again
      </button>
    </main>
  );
}