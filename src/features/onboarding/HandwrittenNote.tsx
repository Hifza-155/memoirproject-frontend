/**
 * @file HandwrittenNote.tsx
 * @description Component rendering a handwritten style note card for user Hafsa,
 * using the globally loaded Caveat font and shared theme tokens.
 */

'use client';

import Link from 'next/link';

export default function HandwrittenNote() {
  return (
    <section className="min-h-screen bg-memory-bg text-memory-primary flex flex-col items-center justify-center px-6 py-16 relative z-10 font-sans selection:bg-memory-primary selection:text-white">

      {/* Note Card */}
      <div
        className="relative w-full max-w-105 bg-white border border-memory-border shadow-lg shadow-memory-primary/5 -rotate-1 transition-transform hover:rotate-0 duration-500 p-8 sm:p-10"
        style={{
          borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px'
        }}
      >
        {/* Lined Paper Lines */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            borderRadius: 'inherit', 
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 43px, var(--memory-primary) 43px, var(--memory-primary) 44px)',
            backgroundPositionY: '56px'
          }}
        />

        <div className="relative z-10">
          {/* Using the global font-caveat utility class */}
          <h2 className="font-caveat text-center text-[36px] font-bold text-memory-primary mb-4 -ml-2">
            Dear Hafsa!
          </h2>

          <p className="font-caveat text-[28px] text-memory-primary leading-11">
            Every family has a story worth keeping, the quiet mornings,
            the faded photographs, and the voices you never want to lose.
            We built this space to hold those precious pieces safe for you
            and the ones you love.
          </p>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4 mt-12 w-full max-w-105">
        <Link
          href="/small-personal-context"
          className="flex-1 text-center bg-white border border-memory-border text-memory-primary text-[16px] font-semibold py-4 rounded-xl hover:border-memory-accent transition shadow-xs"
        >
          Back
        </Link>

        <Link
          href="/story-prompt"
          className="flex-1 text-center bg-memory-primary text-white text-[16px] font-semibold py-4 rounded-xl hover:bg-memory-maroon transition shadow-md"
        >
          Continue
        </Link>
      </div>

    </section>
  );
}
