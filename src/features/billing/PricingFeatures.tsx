"use client";

import { motion } from "framer-motion";
import { BookOpen, Camera, Mic, PenLine } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: PenLine,
    title: "Written Memories",
    description: "Write and preserve your stories",
  },
  {
    icon: Mic,
    title: "Voice Memories",
    description: "Keep voice memories and transcriptions",
  },
  {
    icon: Camera,
    title: "Photos & Videos",
    description: "Add the moments you want to remember",
  },
  {
    icon: BookOpen,
    title: "Final Memoir",
    description: "Create your memoir and beautiful PDF",
  },
];

const includedFeatures = [
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
    <main className="min-h-screen bg-memory-bg px-6 py-10 text-memory-primary md:px-10 md:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-5xl items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full overflow-hidden border border-memory-primary/15 bg-[#FBF8F1] shadow-[0_20px_55px_rgba(80,45,35,0.10)]"
        >
          {/* Header */}
          <div className="border-b border-memory-primary/15 px-7 py-8 text-center md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-memory-accent">
              MEMOIR
            </p>

            <h1 className="mt-3 font-serif text-3xl md:text-4xl">
              Pricing & Features
            </h1>

            <p className="mt-2 text-sm text-memory-muted">
              Everything you need to create your memoir.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-[1.2fr_0.8fr]">
            {/* Features */}
            <section className="px-7 py-8 md:px-12 md:py-10">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-memory-accent">
                WHAT'S INCLUDED
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.08,
                      }}
                      className="border border-memory-primary/10 bg-memory-bg/40 p-5"
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.5}
                        className="mb-4 text-memory-accent"
                      />

                      <h2 className="font-serif text-lg">
                        {feature.title}
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-memory-muted">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-7 border-t border-memory-primary/10 pt-6">
                <ul className="grid gap-3 sm:grid-cols-3">
                  {includedFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-memory-primary"
                    >
                      <span className="text-memory-accent">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Pricing */}
            <section className="flex flex-col justify-center border-t border-memory-primary/15 bg-memory-primary px-7 py-9 text-memory-light md:border-l md:border-t-0 md:px-10">
              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-memory-light/65">
                  CREATE YOUR MEMOIR
                </p>

                <div className="mt-5">
                  <span className="font-serif text-7xl leading-none">
                    $3
                  </span>
                </div>

                <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-memory-light/60">
                  ONE-TIME PAYMENT
                </p>
              </div>

              <div className="my-8 h-px bg-memory-light/15" />

              <div className="space-y-3 text-sm">
                <p className="flex items-center justify-between">
                  <span className="text-memory-light/70">Access</span>
                  <span>Full Memoir Experience</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-memory-light/70">Payment</span>
                  <span>One-time</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-memory-light/70">Subscription</span>
                  <span>None</span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="mt-8 w-full rounded-sm bg-memory-light px-6 py-4 text-sm font-semibold tracking-wide text-memory-primary transition-all duration-300 hover:bg-[#F1E3DF]"
              >
                Continue for $3 →
              </button>

              <p className="mt-4 text-center text-[10px] text-memory-light/50">
                No recurring charges
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}