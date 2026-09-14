"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Image as ImageIcon, Mic, PenLine, MoreHorizontal, Edit2, Trash2, FileText } from "lucide-react";
import { MemoryItem } from "../types";

interface MemoryCardProps {
  memory: MemoryItem & { audioUrl?: string };
  onOptionSelect?: (action: string, memoryId: string) => void;
  onPlayAudio?: (memoryId: string) => void;
}

export function MemoryCard({ memory, onOptionSelect, onPlayAudio }: MemoryCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Icon = memory.kind === "photo" ? ImageIcon : memory.kind === "audio" ? Mic : memory.kind === "combined" ? FileText : PenLine;

  return (
    <article className="relative group bg-[#FAF7F2] border border-stone-300/80 p-6 md:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 rounded-xl">
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-xl"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative flex items-start justify-between mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFECE6] border border-stone-300 flex items-center justify-center text-stone-600 shadow-sm">
            <Icon size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[15px] font-medium text-stone-800 leading-tight">
              Added by {memory.author || "Owner"}
            </span>
            <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-semibold mt-0.5">
              {memory.date}
            </span>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors cursor-pointer md:opacity-0 md:group-hover:opacity-100"
          >
            <MoreHorizontal size={18} />
          </button>

          <AnimatePresence>
            {showOptions && (
              <motion.div 
                key="card-options"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-1 w-36 bg-[#FAF7F2] border border-stone-300 rounded-xl shadow-xl py-1.5 z-20"
              >
                <button
                  type="button"
                  onClick={() => { setShowOptions(false); onOptionSelect?.("edit", memory.id); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-sans font-medium text-stone-600 hover:bg-[#EFECE6] hover:text-stone-900 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Edit2 size={14} /> Edit Detail
                </button>
                <button
                  type="button"
                  onClick={() => { setShowOptions(false); onOptionSelect?.("delete", memory.id); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-sans font-medium text-[#7a2e39] hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer mt-0.5"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10">
        {(memory.kind === "text" || memory.kind === "combined") && (
          <div>
            {memory.title && <h4 className="font-sans font-bold text-xl text-stone-900 mb-3 leading-tight">{memory.title}</h4>}
            
            {memory.mediaUrl && (
              <div className="mb-4">
                <figure className="inline-block p-2.5 bg-white shadow-md border border-stone-200 rounded-sm transform -rotate-1">
                  <div className="relative w-55 aspect-4/3 bg-stone-100 overflow-hidden border border-stone-200/50 rounded-sm">
                    <Image 
                      src={memory.mediaUrl} 
                      alt={memory.title || "Memory Photo"} 
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </figure>
              </div>
            )}
            
            {memory.content && (
              <p className="font-sans text-[15px] text-stone-700 leading-relaxed whitespace-pre-wrap book-text mb-4">
                {memory.content}
              </p>
            )}

            {/* CRITICAL FIX: Audio player added for combined cards (e.g. Photo + Audio) */}
            {memory.audioUrl && (
              <div className="bg-white border border-stone-300 py-2 px-3 rounded-xl shadow-sm max-w-sm mb-4">
                <audio 
                  controls 
                  src={memory.audioUrl} 
                  className="w-full h-10 outline-none" 
                  controlsList="nodownload"
                />
              </div>
            )}

            {memory.transcription && memory.kind === "combined" && (
              <div className="mt-4 pt-3 border-t border-stone-300/60 border-dashed">
                <p className="text-[10px] font-sans uppercase tracking-[0.15em] text-stone-400 mb-1 font-semibold">Voice Transcription</p>
                <p className="font-sans text-[14px] text-stone-600 leading-relaxed pl-3 border-l-2 border-stone-300">&quot;{memory.transcription}&quot;</p>
              </div>
            )}
          </div>
        )}

        {memory.kind === "photo" && (
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {memory.mediaUrl && (
              <figure className="p-2.5 bg-white shadow-md border border-stone-200 rounded-sm transform -rotate-1 shrink-0">
                <div className="relative w-55 aspect-4/3 bg-stone-100 overflow-hidden border border-stone-200/50 rounded-sm">
                  <Image 
                    src={memory.mediaUrl} 
                    alt={memory.title || "Memory Photo"} 
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </figure>
            )}
            <div className="flex-1">
              {memory.title && <h4 className="font-sans font-bold text-xl text-stone-900 mb-2 leading-tight">{memory.title}</h4>}
              <p className="font-sans text-[15px] text-stone-700 leading-relaxed book-text">{memory.content}</p>
            </div>
          </div>
        )}

        {memory.kind === "audio" && (
          <div className="space-y-5">
            {memory.title && <h4 className="font-sans font-bold text-xl text-stone-900 mb-1">{memory.title}</h4>}
            
            <p className="font-sans text-[15px] text-stone-700 leading-relaxed book-text">{memory.content}</p>
            
            {memory.audioUrl ? (
              <div className="bg-white border border-stone-300 py-2 px-3 rounded-xl shadow-sm max-w-sm mt-3">
                <audio 
                  controls 
                  src={memory.audioUrl} 
                  className="w-full h-10 outline-none" 
                  controlsList="nodownload"
                />
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-[#FAF7F2] border border-stone-300 p-3 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] max-w-xs">
                <button
                  type="button"
                  onClick={() => onPlayAudio?.(memory.id)}
                  className="w-12 h-12 rounded-xl bg-[#EFECE6] flex items-center justify-center hover:bg-memory-primary hover:text-memory-light text-stone-700 transition-colors shadow-sm border border-stone-300 shrink-0 cursor-pointer"
                >
                  <Play size={16} className="ml-0.5" />
                </button>
                <div className="flex flex-col">
                  <span className="font-sans text-[14px] font-medium text-stone-800">Voice Note</span>
                  {memory.duration && <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-semibold mt-0.5">{memory.duration}</span>}
                </div>
              </div>
            )}

            {memory.transcription && (
              <div className="mt-4 pt-4 border-t border-stone-300/60 border-dashed">
                <p className="text-[10px] font-sans uppercase tracking-[0.15em] text-stone-400 mb-2 font-semibold">Transcription</p>
                <p className="font-sans text-[14px] text-stone-600 leading-relaxed pl-4 border-l-2 border-stone-300">&quot;{memory.transcription}&quot;</p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}