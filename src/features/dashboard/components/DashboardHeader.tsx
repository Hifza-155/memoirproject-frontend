"use client";

import React from "react";

interface DashboardHeaderProps {
  subjectName?: string;
  dob?: string;
  dod?: string;
  onLogout?: () => void;
}

export function DashboardHeader({
  subjectName = "Ahmad Khan",
  dob = "1942",
  dod = "2024",
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-memory-border bg-memory-card px-6 py-5 sm:px-8">
      {/* Memoir Subject */}
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-memory-accent">
          Remembering
        </p>

        <h2 className="font-serif text-xl font-bold tracking-tight text-memory-maroon sm:text-2xl">
          {subjectName}
        </h2>

        <p className="mt-1 font-serif text-xs italic text-memory-muted">
          {dob} — {dod}
        </p>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="rounded-lg border border-memory-accent bg-memory-light px-4 py-2 text-xs font-semibold uppercase tracking-wider text-memory-maroon transition-all duration-200 hover:bg-memory-maroon hover:text-memory-light"
      >
        Logout
      </button>
    </header>
  );
}