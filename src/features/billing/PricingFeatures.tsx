
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  "Written Memories",
  "Voice Memories & Transcriptions",
  "Photos & Videos",
  "Family Contributions",
  "Final Memoir",
  "Beautiful PDF",
];

export default function PricingFeatures() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/subscription");
  };

  return (
    <main className="min-h-screen bg-memory-bg text-memory-primary flex items-center justify-center px-4 py-10 md:px-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl"
      >
        {/* Open Journal */}
        <div className="relative flex flex-col lg:flex-row items-stretch">
          {/* LEFT PAGE */}
          <section className="relative w-full lg:w-1/2 min-h-145 lg:min-h-160 bg-[#FBF8F1] border border-memory-accent/40 rounded-t-[4px] lg:rounded-l-[5px] lg:rounded-r-none px-8 py-10 md:px-12 md:py-14 shadow-[0_18px_40px_rgba(80,45,35,0.10)]">
            {/* Page border */}
            <div className="absolute inset-3 border border-memory-primary/10 pointer-events-none" />

            {/* Paper lines */}
            <div className="absolute inset-x-8 md:inset-x-12 bottom-12 top-36 opacity-40 pointer-events-none">
              <div className="h-full bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_31px,rgba(118,85,72,0.08)_32px)]" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-memory-accent mb-8">
                  Your Memoir
                </p>

                <h1 className="max-w-md font-serif text-4xl md:text-5xl leading-[1.08] text-memory-primary">
                  Your Story Deserves to Be Remembered.
                </h1>

                <div className="mt-8 max-w-md space-y-5 font-serif text-[15px] md:text-base leading-7 text-memory-muted">
                  <p>
                    Every life holds stories worth keeping — the little
                    moments, the voices, the photographs, and the memories
                    shared by the people who were there.
                  </p>

                  <p>
                    Bring them together and turn them into something you can
                    return to, share, and pass down.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <div className="w-16 border-t border-memory-accent/60 mb-4" />

                <p className="font-serif italic text-memory-primary/70">
                  One story. One beautiful keepsake. Forever.
                </p>
              </div>
            </div>
          </section>

          {/* CENTER SPIRAL / BINDING */}
          <div className="relative z-20 hidden lg:flex w-12 shrink-0 items-center justify-center bg-[#EDE4D7] border-y border-memory-accent/30">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-memory-primary/15" />

            <div className="relative h-[88%] flex flex-col justify-between py-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className="relative block w-9 h-4 rounded-full border-2 border-memory-accent/70 bg-[#F6F0E6] shadow-[0_1px_2px_rgba(80,45,35,0.18)]"
                />
              ))}
            </div>
          </div>

          {/* MOBILE SPIRAL */}
          <div className="relative z-20 flex lg:hidden h-10 w-full items-center justify-center bg-[#EDE4D7] border-x border-memory-accent/30">
            <div className="flex w-[82%] justify-between">
              {Array.from({ length: 9 }).map((_, index) => (
                <span
                  key={index}
                  className="block w-5 h-3 rounded-full border-2 border-memory-accent/70 bg-[#F6F0E6]"
                />
              ))}
            </div>
          </div>

          {/* RIGHT PAGE */}
          <section className="relative w-full lg:w-1/2 min-h-145 lg:min-h-160 bg-[#FBF8F1] border border-memory-accent/40 rounded-b-[4px] lg:rounded-r-[5px] lg:rounded-l-none px-8 py-10 md:px-12 md:py-14 shadow-[0_18px_40px_rgba(80,45,35,0.10)]">
            {/* Page border */}
            <div className="absolute inset-3 border border-memory-primary/10 pointer-events-none" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="text-center border-b border-memory-primary/15 pb-7">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-memory-primary/65">
                  Create Your Memoir
                </p>

                <div className="mt-4 flex items-end justify-center">
                  <span className="font-serif text-6xl md:text-7xl leading-none text-memory-primary">
                    $3
                  </span>
                </div>

                <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-memory-muted">
                  One-Time Payment
                </p>
              </div>

              <div className="flex-1 py-7">
                <p className="mb-5 font-serif text-sm italic text-memory-primary/65">
                  Everything you need to preserve your story:
                </p>

                <ul className="space-y-4">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[14px] md:text-[15px] text-memory-primary"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-memory-accent/60 text-memory-accent">
                        <Check size={12} strokeWidth={2.5} />
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full rounded-sm bg-memory-primary px-6 py-4 text-sm font-semibold tracking-wide text-memory-light transition-all duration-300 hover:bg-memory-maroon hover:shadow-md"
                >
                  Continue for $3 →
                </button>

                <p className="mt-5 text-center text-[10px] md:text-[11px] leading-5 text-memory-muted">
                  One-time payment • No subscription • No recurring charges
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Small caption beneath the journal */}
        <p className="mt-6 text-center font-serif text-xs italic text-memory-muted">
          Your memories, gathered in one place.
        </p>
      </motion.div>
    </main>
  );
}
