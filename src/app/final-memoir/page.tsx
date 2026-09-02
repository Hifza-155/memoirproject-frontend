"use client";

import React, { useState } from "react";
import MemoirLayout from "../../features/FinalMemoir/MemoirLayout";
import MemoryCard from "../../features/FinalMemoir/MemoryCard";

// 1. Define a unified interface so TypeScript knows optional properties exist
interface MemoryItem {
  id: string;
  author: string;
  relation: string;
  text: string;
  reactionsCount: number;
  memoryType: "written" | "audio" | "media";
  imageUrl?: string;
  imageCaption?: string;
  audioDuration?: string; // 👈 Made optional here
}

const saraMemory: MemoryItem = {
  id: "mem-sara-1",
  author: "Sara",
  relation: "Daughter",
  text: "Dad always woke up before the sun. He claimed it was to get a head start on the day, but I think he just liked the quiet before the house woke up.",
  imageUrl: "/api/placeholder/800/600",
  imageCaption: "In the garden, summer of '94",
  reactionsCount: 5,
  memoryType: "written",
};

const audioMemory: MemoryItem = {
  id: "mem-audio-1",
  author: "Michael",
  relation: "Son",
  text: "I still remember those early mornings. Dad would wake up before everyone else and sit quietly with his coffee. Those were simple moments, but they are some of the memories I miss the most.",
  reactionsCount: 5,
  memoryType: "audio",
  audioDuration: "0:42", // 👈 Now fully valid on MemoryItem
};

const pages = [
  {
    title: "Written Memory",
    memory: saraMemory,
    isAudio: false,
  },
  {
    title: "Voice Recording & Transcription",
    memory: audioMemory,
    isAudio: true,
  },
];

export default function FinalMemoirPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <MemoirLayout>
      <div className="w-full py-8 space-y-16">
        {pages.map((page, index) => (
          <div key={index} className="w-full">
            {/* PAGE TITLE */}
            <div className="mb-6 text-center">
              <p className="mb-1 text-xs uppercase tracking-[0.25em] text-memory-muted">
                {page.title}
              </p>
              <div className="mx-auto h-px w-16 bg-memory-maroon/30" />
            </div>

            {/* SINGLE MEMORY PAGE */}
            <div className="mx-auto w-full max-w-4xl space-y-4">
              <div className="relative w-full">
                {/* subtle paper stack effect with soft pink stroke tint */}
                <div className="absolute inset-x-2 top-2 bottom-1 rounded-sm border border-memory-maroon/20 bg-memory-maroon/5" />

                <div className="relative z-10">
                  {page.isAudio ? (
                    /* Side-by-Side Grid Layout for Michael's Audio Memory with Clean White Background */
                    <div className="p-6 md:p-8 bg-white rounded-2xl border border-memory-maroon/20 shadow-xs">
                      {/* Author Header */}
                      <div className="mb-6">
                        <h4 className="font-serif font-bold text-lg text-memory-primary">Michael</h4>
                        <p className="text-[10px] uppercase tracking-widest text-memory-muted">Son</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left: The Quote Box with Pure White Background */}
                        <div className="relative p-6 bg-white border border-memory-maroon/20 rounded-xl shadow-2xs">
                          <span className="absolute top-3 left-3 text-memory-maroon/40 font-serif text-xl">“</span>
                          <p className="font-serif text-sm text-memory-primary leading-relaxed px-2">
                            {page.memory.text}
                          </p>
                          <span className="absolute bottom-1 right-4 text-memory-maroon/40 font-serif text-xl">”</span>
                        </div>

                        {/* Right: Audio Player & Transcription Block with Pure White Background */}
                        <div className="space-y-4 bg-white p-5 rounded-2xl border border-memory-maroon/20">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-memory-muted">
                              Voice Note
                            </span>
                            <span className="text-[10px] bg-memory-maroon/10 text-memory-maroon px-2 py-0.5 rounded-full font-medium">
                              Verified Audio
                            </span>
                          </div>

                          <div className="flex items-center gap-4 bg-memory-light p-3.5 rounded-xl border border-memory-maroon/15">
                            <button
                              type="button"
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="w-10 h-10 rounded-full bg-memory-primary text-memory-light flex items-center justify-center hover:bg-memory-maroon transition shadow-sm cursor-pointer shrink-0"
                              aria-label={isPlaying ? "Pause audio" : "Play audio"}
                            >
                              <span className="text-sm font-bold">
                                {isPlaying ? "❚❚" : "▶"}
                              </span>
                            </button>

                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between text-[11px] text-memory-muted font-mono">
                                <span>{isPlaying ? "0:14" : "0:00"}</span>
                                <span>{page.memory.audioDuration}</span>
                              </div>
                              <div className="w-full h-1.5 bg-memory-border rounded-full overflow-hidden flex items-center">
                                <div 
                                  className={`h-full bg-memory-primary transition-all duration-350 ${
                                    isPlaying ? "w-1/3" : "w-0"
                                  }`} 
                                />
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-memory-muted italic leading-relaxed">
                            Click play to listen to Michael&apos;s recorded narrative in his own voice.
                          </p>
                        </div>
                      </div>

                      {/* Card Footer Reactions */}
                      <div className="mt-8 pt-4 border-t border-memory-maroon/15 flex items-center justify-between text-xs text-memory-muted">
                        <span className="flex items-center gap-1.5 font-medium">
                          ✓ I REMEMBER THIS TOO <span className="bg-memory-maroon/10 text-memory-maroon px-2 py-0.5 rounded-full text-[10px]">{page.memory.reactionsCount}</span>
                        </span>
                        <span className="hover:text-memory-primary cursor-pointer transition">
                          View family notes (3) ↓
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Standard Default Memory Card for Sara */
                    <MemoryCard {...page.memory} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MemoirLayout>
  );
}