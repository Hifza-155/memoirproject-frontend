"use client";

import React, { useState } from "react";

export interface MemoryItem {
  id: string;
  kind: "text" | "photo" | "audio";
  title: string;
  content: string;
  date: string;
  author: string;
  mediaUrl?: string | null;
  duration?: string;
  transcription?: string | null;
}

interface MemoryCardProps {
  memory: MemoryItem;
  onOptionSelect?: (action: string, memoryId: string) => void;
  onPlayAudio?: (memoryId: string) => void;
}

export function MemoryCard({
  memory,
  onOptionSelect,
  onPlayAudio,
}: MemoryCardProps) {
  const [showOptions, setShowOptions] = useState(false);

  const kindLabel =
    memory.kind === "text"
      ? "Written Reflection"
      : memory.kind === "photo"
        ? "Photograph"
        : "Voice Recording";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-memory-border bg-memory-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-memory-accent hover:shadow-md sm:p-7">
      {/* =========================
          TOP META
      ========================== */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-memory-border bg-memory-light px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-memory-primary">
            {kindLabel}
          </span>

          {memory.date && (
            <>
              <span className="text-xs text-memory-border">•</span>

              <span className="text-xs text-memory-muted">
                {memory.date}
              </span>
            </>
          )}
        </div>

        {/* Options */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-memory-border bg-memory-light text-sm font-bold tracking-widest text-memory-muted transition-colors hover:bg-memory-primary hover:text-memory-light"
            aria-label="Memory options"
            aria-expanded={showOptions}
          >
            ...
          </button>

          {showOptions && (
            <div className="absolute right-0 top-10 z-30 w-36 overflow-hidden rounded-xl border border-memory-border bg-memory-card py-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setShowOptions(false);
                  onOptionSelect?.("edit", memory.id);
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-medium text-memory-primary transition-colors hover:bg-memory-light"
              >
                Edit Memory
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOptions(false);
                  onOptionSelect?.("delete", memory.id);
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-medium text-memory-maroon transition-colors hover:bg-memory-light"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          MEMORY CONTENT
      ========================== */}
      <div className="max-w-3xl">
        <h4 className="font-serif text-xl font-semibold leading-tight text-memory-primary sm:text-2xl">
          {memory.title}
        </h4>

        {memory.content && (
          <p className="mt-3 text-sm leading-7 text-memory-muted">
            {memory.content}
          </p>
        )}
      </div>

      {/* =========================
          PHOTO
      ========================== */}
      {memory.kind === "photo" && memory.mediaUrl && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-memory-border bg-memory-light">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={memory.mediaUrl}
            alt={memory.title}
            className="max-h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      )}

      {/* =========================
          AUDIO
      ========================== */}
      {memory.kind === "audio" && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4 rounded-2xl border border-memory-border bg-memory-light p-4">
            <button
              type="button"
              onClick={() => onPlayAudio?.(memory.id)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-memory-primary text-[10px] font-semibold uppercase tracking-wider text-memory-light transition-colors hover:bg-memory-maroon"
            >
              Play
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-memory-primary">
                Voice Note Recording
              </p>

              <p className="mt-0.5 text-xs text-memory-muted">
                Duration: {memory.duration || "N/A"}
              </p>
            </div>
          </div>

          {memory.transcription && (
            <div className="rounded-2xl border border-memory-border bg-memory-light/60 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-memory-accent" />

                <span className="text-[10px] font-semibold uppercase tracking-wider text-memory-primary">
                  Transcription
                </span>
              </div>

              <p className="text-sm leading-7 text-memory-muted">
                {memory.transcription}
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================
          FOOTER
      ========================== */}
      <div className="mt-6 flex items-center justify-between border-t border-memory-border pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-memory-light text-[9px] font-bold text-memory-primary">
            {memory.author
              ? memory.author
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "M"}
          </div>

          <span className="text-xs text-memory-muted">
            By{" "}
            <span className="font-medium text-memory-primary">
              {memory.author}
            </span>
          </span>
        </div>

        <span className="text-[10px] uppercase tracking-[0.18em] text-memory-muted">
          Preserved memory
        </span>
      </div>
    </article>
  );
}