/**
 * @file InviteFamilyFriends.tsx
 * @description Component rendering the family and friends invitation screen,
 */

'use client';

import {
  ArrowLeft,
  Heart,
  Users,
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
        transition={{ duration: 0.4, ease: "easeOut" }}
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

          {/* Visual Network Graphic */}
          <div className="relative mb-10 flex h-60 w-full max-w-md items-center justify-center rounded-2xl border border-memory-border bg-memory-card shadow-2xs overflow-hidden">

            {/* Horizontal Connection */}
            <div className="absolute h-px w-36 bg-memory-border" />

            {/* Vertical Connection */}
            <div className="absolute h-28 w-px bg-memory-border" />

            {/* Center Memory */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10 flex h-18 w-18 items-center justify-center rounded-full border border-memory-border bg-white shadow-xs"
            >
              <Heart
                size={28}
                fill="var(--memory-card)"
                className="text-memory-primary"
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Person 1 */}
            <motion.div 
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute left-[16%]"
              style={{ top: '25%' }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-memory-border bg-white text-memory-primary shadow-xs">
                <Users size={20} strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Person 2 */}
            <motion.div 
              animate={{ y: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute right-[16%]"
              style={{ top: '25%' }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-memory-border bg-white text-memory-primary shadow-xs">
                <Users size={20} strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Person 3 */}
            <motion.div 
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="absolute bottom-[14%] left-1/2 -translate-x-1/2"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-memory-border bg-white text-memory-primary shadow-xs">
                <Users size={20} strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Visual Caption */}
            <p className="absolute bottom-3 text-xs font-serif italic text-memory-muted">
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