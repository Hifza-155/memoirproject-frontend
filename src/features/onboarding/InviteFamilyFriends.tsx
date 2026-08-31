/**
 * @file InviteFamilyFriends.tsx
 * @description Component rendering the family and friends invitation screen.
 */

'use client';

import {
  ArrowLeft,
  ImagePlus,
  Quote,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function InviteFamilyFriends() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-memory-bg text-memory-primary flex items-center justify-center px-6 py-16 relative z-10 font-sans selection:bg-memory-primary selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-170 bg-white border border-memory-border rounded-3xl px-8 md:px-12 py-10 shadow-sm flex flex-col"
      >

        {/* Back */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-memory-muted hover:text-memory-primary text-[15px] font-medium transition inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={1.7} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">

          {/* Heading */}
          <h1 className="font-serif text-3xl md:text-4xl text-memory-primary mb-3">
            Some memories are
            <br />
            better shared.
          </h1>

          {/* Supporting Text */}
          <p className="text-memory-muted text-[15px] md:text-base leading-relaxed max-w-105 mx-auto font-serif italic mb-8">
            Invite the people who were part of the story.
          </p>

          {/* Shared Memory Visual */}
          <div className="relative mb-10 h-64 w-full max-w-md overflow-visible rounded-2xl border border-memory-border bg-memory-card">

            {/* Left Memory Note */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              whileHover={{
                y: -8,
                rotate: -2,
                scale: 1.06,
                zIndex: 30,
              }}
              className="group absolute left-5 top-7 z-10 w-36 -rotate-6 cursor-pointer rounded-lg border border-memory-border bg-white px-4 py-4 text-left shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <p className="font-serif text-[12px] italic leading-relaxed text-memory-muted">
                “I still remember the way you used to laugh...”
              </p>

              {/* Hover Popup */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute -bottom-12 left-1/2 z-40 w-40 -translate-x-1/2 rounded-lg border border-memory-border bg-white px-3 py-2 text-center shadow-md"
              >
                <p className="font-serif text-[10px] text-memory-primary">
                  Little moments become precious memories.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Photo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              whileHover={{
                y: -10,
                rotate: 2,
                scale: 1.08,
                zIndex: 30,
              }}
              className="group absolute right-5 top-6 z-10 h-32 w-28 rotate-6 cursor-pointer overflow-visible rounded-md border-4 border-white bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="h-full w-full overflow-hidden">
                <img
                  src="/BottomRightImage.jpg"
                  alt="A family memory"
                  className="h-full w-full object-cover"
                />
              </div>

  

              {/* Hover Popup */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute -bottom-12 left-1/2 z-40 w-40 -translate-x-1/2 rounded-lg border border-memory-border bg-white px-3 py-2 text-center shadow-md"
              >
                <p className="font-serif text-[10px] text-memory-primary">
                  The faces behind the memories.
                </p>
              </motion.div>
            </motion.div>

            {/* Central Memory Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              className="absolute left-1/2 top-1/2 z-20 w-64 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-memory-border bg-white px-6 py-4 text-center shadow-sm"
            >
              <Quote
                size={17}
                strokeWidth={1.2}
                className="mx-auto mb-2 text-memory-primary"
              />

              <p className="font-serif text-[14px] leading-relaxed text-memory-primary">
                The moments we hold closest
              <br />
                are often the ones
              <br />
                we remember together.
              </p>
            </motion.div>

            {/* Bottom Memory Note */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              whileHover={{
                y: -8,
                rotate: 1,
                scale: 1.06,
                zIndex: 30,
              }}
              className="group absolute bottom-8 right-8 z-10 w-40 rotate-3 cursor-pointer rounded-lg border border-memory-border bg-white px-4 py-4 text-left shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <p className="font-serif text-[12px] italic leading-relaxed text-memory-muted">
                “Some stories feel warmer when someone else remembers them too.”
              </p>

              {/* Hover Popup */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute -top-12 left-1/2 z-40 w-44 -translate-x-1/2 rounded-lg border border-memory-border bg-white px-3 py-2 text-center shadow-md"
              >
                <p className="font-serif text-[10px] text-memory-primary">
                  Invite someone who was there.
                </p>
              </motion.div>
            </motion.div>

            {/* Small Decorative Paper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              whileHover={{
                y: -5,
                rotate: -3,
                scale: 1.08,
              }}
              className="absolute bottom-8 left-10 h-12 w-12 -rotate-6 rounded-md border border-memory-border bg-white shadow-sm"
            />

            {/* Small Caption */}
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[10px] italic text-memory-muted">
              The people who make the story yours
            </p>

          </div>

          {/* Buttons */}
          <div className="w-full max-w-md flex flex-col gap-3">

            {/* Primary */}
            <motion.button
              type="button"
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 rounded-xl text-[16px] font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 bg-memory-primary text-white hover:bg-memory-maroon shadow-md shadow-memory-primary/10"
            >
              Invite Family & Friends
            </motion.button>

            {/* Secondary */}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="py-2 text-sm font-medium text-memory-muted hover:text-memory-primary transition cursor-pointer font-serif"
            >
              Maybe later
            </button>

          </div>

        </div>
      </motion.div>
    </section>
  );
}