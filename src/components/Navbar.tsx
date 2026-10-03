/**
 * @file Navbar.tsx
 * @description Component rendering the site navigation bar.
 */

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function Navbar() {
  const [showOurStory, setShowOurStory] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-8 md:px-16 py-2 bg-memory-bg border-b border-memory-border">
        <Logo />

        <ul className="flex items-center gap-8 text-sm md:text-base font-medium text-memory-primary tracking-[0.2px]">
          <li>
            <Link href="/" className="hover:text-memory-muted transition">
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/pricing"
              className="hover:text-memory-muted transition"
            >
              Plans
            </Link>
          </li>

          <li>
            <button
              type="button"
              onClick={() => setShowOurStory(true)}
              className="hover:text-memory-muted transition cursor-pointer"
            >
              Our Story
            </button>
          </li>

          <li>
            <Link
              href="/#faqs"
              className="hover:text-memory-muted transition"
            >
              FAQs
            </Link>
          </li>

          <li>
            <Link href="/login" className="hover:text-memory-muted transition">
              Login
            </Link>
          </li>
        </ul>
      </nav>

      <AnimatePresence>
        {showOurStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-stone-950/60 backdrop-blur-3xl flex items-center justify-center p-6"
            onClick={() => setShowOurStory(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-memory-bg rounded-3xl border border-memory-border shadow-2xl px-8 py-10 md:px-12 md:py-12 text-center"
            >
              <button
                type="button"
                onClick={() => setShowOurStory(false)}
                className="absolute top-5 right-5 text-memory-primary/60 hover:text-memory-primary transition cursor-pointer"
                aria-label="Close Our Story"
              >
                <X size={20} />
              </button>

              <p className="text-memory-accent text-xs tracking-[0.3em] uppercase font-sans mb-6">
                Our Story
              </p>

              <h2 className="text-memory-primary text-2xl md:text-3xl font-serif italic leading-relaxed mb-7">
                “Every family has stories that deserve to stay.”
              </h2>

              <p className="text-memory-primary/70 text-sm md:text-base leading-relaxed font-sans max-w-md mx-auto">
                We created this space to bring scattered memories together.
                The stories, voices and little moments that make a family’s
                story worth remembering.
              </p>

              <p className="text-memory-accent text-sm font-serif italic mt-8">
                — Team Nexus
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}