"use client";

import React from "react";

interface MemoirLayoutProps {
  children: React.ReactNode;
}

export default function MemoirLayout({ children }: MemoirLayoutProps) {
  return (
    <div className="min-h-screen bg-memory-bg text-memory-primary">
      {/* Memoir Header */}
      <header className="relative overflow-hidden bg-memory-primary text-memory-light border-b border-memory-accent/50">
        
        {/* Subtle Golden Circular Texture */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-20 h-44 w-44 rounded-full border border-memory-accent/25" />
          <div className="absolute -right-16 -bottom-24 h-52 w-52 rounded-full border border-memory-accent/25" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-memory-accent/20" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-memory-accent/80 text-memory-accent">
                <span className="text-xs">✦</span>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.20em] text-memory-accent">
                  A Life Remembered
                </p>

                <p className="text-[11px] text-memory-light/55">
                  Personal Memoir
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-serif text-xs tracking-wide text-memory-light/80">
                1942 — 2024
              </p>
            </div>
          </div>

          <div className="mt-1.5 text-center">
            <div className="mb-1 flex items-center justify-center gap-2">
              <span className="h-px w-7 bg-memory-accent/70" />
              <span className="text-[11px] text-memory-accent">❦</span>
              <span className="h-px w-7 bg-memory-accent/70" />
            </div>

            {/* Center Memoir Title */}
            <h1 className="relative -top-1 font-serif text-xl font-medium tracking-wide md:text-2xl">
              Robert’s Memoir
            </h1>

            {/* Center Memoir Subtitle */}
            <p className="relative -top-1 font-serif text-[11px] italic text-memory-light/60">
              A life remembered
            </p>
          </div>

          <div className="mt-1.5 flex items-center gap-2">
            <span className="h-px flex-1 bg-memory-accent/30" />

            <span className="text-[8px] uppercase tracking-[0.20em] text-memory-accent/85">
              Memories preserved with love
            </span>

            <span className="h-px flex-1 bg-memory-accent/30" />
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}