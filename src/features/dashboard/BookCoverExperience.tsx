"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface BookCoverExperienceProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function BookCoverExperience({
  children,
  title = "A Lifetime Remembered",
  subtitle = "A Living Archive of Stories & Voices",
}: BookCoverExperienceProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-memory-bg relative overflow-x-hidden [perspective:2000px]">

      {/* Dashboard underneath */}
      <div className="w-full min-h-screen">
        {children}
      </div>

      {/* Book Cover */}
      <motion.div
        initial={false}
        animate={
          isOpen
            ? {
                rotateY: -180,
                opacity: 0,
              }
            : {
                rotateY: 0,
                opacity: 1,
              }
        }
        transition={{
          duration: 1,
          ease: [0.645, 0.045, 0.355, 1],
        }}
        style={{
          transformOrigin: "left center",
          backfaceVisibility: "hidden",
        }}
        className={`absolute inset-0 z-50 min-h-screen w-full bg-memory-primary text-memory-light flex flex-col items-center justify-between px-6 py-10 sm:px-12 sm:py-14 lg:px-20 lg:py-16 select-none ${
          isOpen
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >

        {/* Book spine shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />

        {/* Inner frame */}
        <div className="absolute inset-5 sm:inset-8 lg:inset-10 border border-memory-accent/25 pointer-events-none" />

        <div className="absolute inset-7 sm:inset-10 lg:inset-12 border border-memory-light/10 pointer-events-none" />

        {/* Top */}
        <div className="relative z-10 w-full max-w-4xl flex justify-between items-start">

          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-memory-accent font-semibold">
              Private Collection
            </p>
          </div>

        </div>

        {/* Center */}
        <div className="relative z-10 text-center max-w-2xl px-6">

          <div className="flex items-center justify-center gap-4 mb-7">
            <span className="w-14 h-px bg-memory-accent/60" />
            <span className="w-2 h-2 rotate-45 border border-memory-accent" />
            <span className="w-14 h-px bg-memory-accent/60" />
          </div>

          <p className="text-[10px] sm:text-xs uppercase tracking-[0.38em] text-memory-accent font-serif mb-5">
            A Memoir
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-memory-light tracking-wide leading-tight">
            {title}
          </h1>

          <p className="font-serif italic text-sm sm:text-base text-memory-border/75 font-light tracking-wide mt-6 max-w-md mx-auto leading-6">
            {subtitle}
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="w-1 h-1 rounded-full bg-memory-accent" />
            <span className="w-20 h-px bg-memory-accent/30" />
            <span className="w-1 h-1 rounded-full bg-memory-accent" />
          </div>

        </div>

        {/* Bottom */}
        <div className="relative z-10 text-center pb-2">

          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="inline-flex items-center justify-center bg-memory-accent text-memory-primary font-serif font-semibold text-[10px] sm:text-xs tracking-[0.28em] uppercase px-9 sm:px-11 py-3.5 sm:py-4 rounded-xl shadow-xl cursor-pointer transition-colors hover:bg-white"
          >
            Open Memoir
            <span className="ml-3 text-base">
              →
            </span>
          </motion.button>

          <p className="text-[9px] tracking-[0.2em] text-memory-muted uppercase font-serif mt-4">
            Click to enter the living archive
          </p>

        </div>

      </motion.div>
    </div>
  );
}