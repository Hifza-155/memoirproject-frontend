/**
 * @file PricingFeatures.tsx
 * @description Pricing and feature comparison screen.
 */

'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

export default function PricingFeatures() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-memory-bg text-memory-primary flex flex-col items-center px-6 py-8 md:py-12 relative z-10 font-sans selection:bg-memory-primary/20">
      <div className="w-full max-w-170 flex flex-col">

        {/* Back Button */}
        <div className="w-full flex justify-start mb-8 relative z-30">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-memory-primary/70 hover:text-memory-primary transition cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl text-memory-primary font-bold mb-3">
            Create something worth remembering
          </h1>

          <p className="text-memory-primary/60 text-sm md:text-base max-w-xl mx-auto">
            Everything you need to bring your family&apos;s memories together
            in one beautiful memoir.
          </p>
        </div>

        {/* Features + Pricing */}
        <div className="w-full bg-memory-bg border border-memory-border rounded-3xl overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-[1.2fr_0.8fr]">

            {/* Features */}
            <div className="p-7 md:p-10 bg-memory-bg">
              <h2 className="text-xl md:text-2xl font-semibold text-memory-primary mb-7">
                What&apos;s included
              </h2>

              <div className="space-y-5">

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check size={18} className="text-memory-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold">
                      Gather memories
                    </h3>
                    <p className="text-sm text-memory-primary/60 mt-1">
                      Bring written memories from family and friends together.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check size={18} className="text-memory-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold">
                      Voice memories
                    </h3>
                    <p className="text-sm text-memory-primary/60 mt-1">
                      Preserve the voices and stories that make each memory
                      special.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check size={18} className="text-memory-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold">
                      Beautiful memoir
                    </h3>
                    <p className="text-sm text-memory-primary/60 mt-1">
                      Turn everything into a thoughtfully designed family
                      memoir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check size={18} className="text-memory-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold">
                      Download your memoir
                    </h3>
                    <p className="text-sm text-memory-primary/60 mt-1">
                      Keep a final PDF copy of your completed memoir.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Pricing */}
            <div className="p-7 md:p-10 bg-memory-maroon text-white flex flex-col justify-center">
              <p className="text-memory-accent text-xs uppercase tracking-[0.25em] font-semibold mb-4">
                One-time purchase
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                Your Family Memoir
              </h2>

              <p className="text-sm text-white/75 leading-relaxed mb-7">
                A complete memoir created from the memories, stories, voices,
                and moments shared by your loved ones.
              </p>

              <div className="mb-7">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl md:text-6xl font-bold text-white">
                    $3
                  </span>
                  <span className="text-sm text-white/70">
                    one-time
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push('/login')}
                className="w-full py-3.5 rounded-2xl text-[16px] font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md bg-white text-memory-maroon hover:bg-memory-accent hover:text-white"
              >
                Continue
              </button>

              <p className="text-center text-xs text-white/55 mt-4">
                No subscription. No recurring charges.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}