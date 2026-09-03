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

export function MemoryCard({ memory, onOptionSelect, onPlayAudio }: MemoryCardProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <article className="bg-memory-card rounded-xl border border-memory-border p-6 shadow-2xs hover:border-memory-accent transition-all relative">
      
      {/* Top Metadata Row & Options Menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-memory-light border border-memory-border text-memory-muted capitalize">
            {memory.kind}
          </span>
          <span className="text-xs text-memory-muted">|</span>
          <span className="text-xs text-memory-muted">{memory.date}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-memory-accent">By {memory.author}</span>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className="w-7 h-7 rounded-lg border border-memory-border bg-memory-light hover:bg-memory-border text-memory-muted flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              aria-label="Memory options"
            >
              ...
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-1 w-32 bg-memory-card border border-memory-border rounded-lg shadow-md py-1 z-20">
                <button
                  type="button"
                  onClick={() => {
                    setShowOptions(false);
                    onOptionSelect?.("edit", memory.id);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-memory-primary hover:bg-memory-light transition-colors cursor-pointer"
                >
                  Edit Memory
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowOptions(false);
                    onOptionSelect?.("delete", memory.id);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-memory-maroon hover:bg-memory-light transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Title & Content */}
      <h4 className="font-serif font-bold text-lg text-memory-primary mb-2">{memory.title}</h4>
      <p className="text-sm text-memory-muted leading-relaxed mb-4">{memory.content}</p>

      {/* Photo Asset Display (Conditional) */}
      {memory.kind === "photo" && memory.mediaUrl && (
        <div className="rounded-lg overflow-hidden border border-memory-border max-h-72 bg-memory-light mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={memory.mediaUrl} alt={memory.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Audio Asset & Transcription Display (Conditional) */}
      {memory.kind === "audio" && (
        <div className="space-y-3">
          <div className="bg-memory-light border border-memory-border rounded-lg p-3 flex items-center gap-4">
            <button
              type="button"
              onClick={() => onPlayAudio?.(memory.id)}
              className="w-10 h-10 rounded-full bg-memory-primary text-memory-light flex items-center justify-center font-serif text-xs uppercase tracking-wider cursor-pointer hover:bg-memory-maroon transition-colors"
            >
              Play
            </button>
            <div className="flex-1">
              <p className="text-xs font-semibold text-memory-primary">Voice Note Recording</p>
              <p className="text-xs text-memory-muted">Duration: {memory.duration || "N/A"}</p>
            </div>
          </div>

          {memory.transcription && (
            <div className="bg-memory-light/50 border border-memory-border rounded-lg p-3 text-xs text-memory-muted leading-relaxed">
              <span className="font-semibold text-memory-primary block mb-1">Transcription:</span>
              {memory.transcription}
            </div>
          )}
        </div>
      )}

    </article>
  );
}