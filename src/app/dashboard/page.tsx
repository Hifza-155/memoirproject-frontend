"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Copy, Lock, Search, Play, 
  Image as ImageIcon, Mic, PenLine, X, Users, Check,
  MoreHorizontal, Edit2, Trash2, Layers
} from "lucide-react";

// =========================================
// TYPES & MOCK DATA
// =========================================

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

const mockMemories: MemoryItem[] = [
  {
    id: "mem-1",
    kind: "photo",
    title: "The Storefront",
    content: "Found this old Polaroid of him standing outside the original storefront in 1982. The sign was still missing the 'S' at the end.",
    date: "OCT 12, 1982",
    author: "Ahmad",
    mediaUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mem-2",
    kind: "photo",
    title: "Baking the First Batch",
    content: "His hands were always covered in flour. This was the first morning he let me help knead the dough.",
    date: "NOV 04, 1985",
    author: "Sarah",
    mediaUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "mem-3",
    kind: "audio",
    title: "4 AM Starts",
    content: "He used to wake up at 4 AM to start the ovens. I remember the smell of the yeast hitting the street before the sun was even up.",
    date: "OCT 14, 2023",
    author: "Uncle Tariq",
    duration: "01:24",
    transcription: "He used to wake up at four AM to start the ovens. I remember the smell of the yeast hitting the street before the sun was even up."
  },
  {
    id: "mem-4",
    kind: "text",
    title: "Sunday Porch Conversations",
    content: "Every Sunday afternoon he would sit on the wooden rocking chair with his radio tuned to the old broadcast. He never said much, but his presence was enough.",
    date: "NOV 02, 2023",
    author: "Sarah"
  },
  {
    id: "mem-5",
    kind: "text",
    title: "The Secret Recipe",
    content: "He finally told me the secret to the sourdough starter. 'It’s patience,' he said. 'You can't rush yeast, and you can't rush life.'",
    date: "JAN 15, 2024",
    author: "Ahmad"
  }
];

// =========================================
// MEMORY CARD COMPONENT
// =========================================

interface MemoryCardProps {
  memory: MemoryItem;
  onOptionSelect?: (action: string, memoryId: string) => void;
  onPlayAudio?: (memoryId: string) => void;
}

function MemoryCard({ memory, onOptionSelect, onPlayAudio }: MemoryCardProps) {
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

  const Icon = memory.kind === "photo" ? ImageIcon : memory.kind === "audio" ? Mic : PenLine;

  return (
    <article className="relative group bg-[#FCFBF8] border border-stone-200/80 p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 rounded-sm">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-sm"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative flex items-start justify-between mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-500 shadow-sm">
            <Icon size={14} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif italic text-[14px] text-stone-700 leading-tight">
              Added by {memory.author}
            </span>
            <span className="text-[9px] font-sans uppercase tracking-[0.15em] text-stone-400 font-semibold mt-0.5">
              {memory.date}
            </span>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="w-8 h-8 flex items-center justify-center text-stone-300 hover:text-stone-600 transition-colors cursor-pointer md:opacity-0 md:group-hover:opacity-100"
          >
            <MoreHorizontal size={18} />
          </button>

          <AnimatePresence>
            {showOptions && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-1 w-36 bg-white border border-stone-200 rounded-sm shadow-xl py-1.5 z-20"
              >
                <button
                  type="button"
                  onClick={() => { setShowOptions(false); onOptionSelect?.("edit", memory.id); }}
                  className="w-full text-left px-4 py-2 text-[12px] font-sans tracking-wide text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Edit2 size={12} /> Edit Detail
                </button>
                <button
                  type="button"
                  onClick={() => { setShowOptions(false); onOptionSelect?.("delete", memory.id); }}
                  className="w-full text-left px-4 py-2 text-[12px] font-sans tracking-wide text-[#7a2e39] hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer mt-0.5"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10">
        {memory.kind === "text" && (
          <div>
            {memory.title && <h4 className="font-serif font-bold text-xl text-stone-900 mb-3 leading-tight">{memory.title}</h4>}
            <p className="font-serif text-[15px] text-stone-700 leading-relaxed whitespace-pre-wrap book-text">{memory.content}</p>
          </div>
        )}

        {memory.kind === "photo" && (
          <div>
            {memory.mediaUrl && (
              <div className="mb-4">
                <figure className="inline-block p-2 bg-white shadow-sm border border-stone-200 transform -rotate-1">
                  <div className="relative w-full max-w-[200px] aspect-[4/3] bg-stone-100 overflow-hidden border border-stone-200/50">
                    <img src={memory.mediaUrl} alt={memory.title} className="w-full h-full object-cover" />
                  </div>
                </figure>
              </div>
            )}
            {memory.title && <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">{memory.title}</h4>}
            <p className="font-serif text-[15px] text-stone-700 leading-relaxed book-text">{memory.content}</p>
          </div>
        )}

        {memory.kind === "audio" && (
          <div className="space-y-5">
            {memory.title && <h4 className="font-serif font-bold text-xl text-stone-900 mb-1">{memory.title}</h4>}
            <p className="font-serif text-[15px] text-stone-700 leading-relaxed book-text">{memory.content}</p>
            <div className="flex items-center gap-4 bg-white border border-stone-200 p-3 rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.02)] max-w-xs">
              <button
                type="button"
                onClick={() => onPlayAudio?.(memory.id)}
                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-[#7a2e39] hover:text-white text-stone-700 transition-colors shadow-sm border border-stone-200 shrink-0 cursor-pointer"
              >
                <Play size={14} className="ml-0.5" />
              </button>
              <div className="flex flex-col">
                <span className="font-serif italic text-[13px] text-stone-600">Voice Note</span>
                {memory.duration && <span className="text-[10px] font-sans uppercase tracking-widest text-stone-400 font-semibold mt-0.5">{memory.duration}</span>}
              </div>
            </div>
            {memory.transcription && (
              <div className="mt-4 pt-4 border-t border-stone-200/60 border-dashed">
                <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-stone-400 mb-2 font-semibold">Transcription</p>
                <p className="font-serif italic text-[14px] text-stone-600 leading-relaxed pl-4 border-l-2 border-stone-200">"{memory.transcription}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

// =========================================
// MAIN DASHBOARD COMPONENT
// =========================================

export default function OwnerDashboard() {
  const [name, setName] = useState("Nadia");
  const [dates, setDates] = useState("1947 — 2024");
  
  const [activeInput, setActiveInput] = useState<"none" | "text" | "audio" | "media">("none");
  const [isTextExpanded, setIsTextExpanded] = useState(false); 
  const [isAssembling, setIsAssembling] = useState(false); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputContent, setInputContent] = useState("");

  const [showCollaborators, setShowCollaborators] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  
  const [expandedStacks, setExpandedStacks] = useState<string[]>([]);

  const toggleStack = (kind: string) => {
    setExpandedStacks(prev => 
      prev.includes(kind) ? prev.filter(k => k !== kind) : [...prev, kind]
    );
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle) {
      alert("Please provide a heading fragment.");
      return;
    }
    setIsAssembling(true);
    setTimeout(() => {
      setIsAssembling(false);
      setActiveInput("none");
      setInputTitle("");
      setInputDate("");
      setInputContent("");
      setIsTextExpanded(false);
    }, 1400);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("memoir.project/nadia");
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 3500);
  };

  const modalBubbles = [
    { name: "Sarah", top: "25%", left: "15%", delay: 0.05, duration: 4 },
    { name: "Jasra", top: "35%", left: "45%", delay: 0.1, duration: 5 },
    { name: "Ahmad", top: "50%", left: "20%", delay: 0.15, duration: 4.5 },
    { name: "Uncle Tariq", top: "55%", left: "55%", delay: 0.2, duration: 6 },
    { name: "Aunt Salma", top: "22%", left: "65%", delay: 0.25, duration: 5.5 },
    { name: "Elena", top: "70%", left: "30%", delay: 0.3, duration: 4.8 },
    { name: "Daniel", top: "40%", left: "75%", delay: 0.35, duration: 5.2 },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-serif selection:bg-memory-maroon/20 pb-32 overflow-x-hidden relative">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .font-serif { font-family: "Times New Roman", Times, serif !important; }
        .book-text { hyphens: auto; -webkit-hyphens: auto; -ms-hyphens: auto; }
      `}} />

      {/* FOCUS MODE BACKDROP */}
      <AnimatePresence>
        {activeInput !== "none" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#FAF9F6]/92 backdrop-blur-md z-40 pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="max-w-4xl mx-auto pt-20 px-6 sm:px-12 flex flex-col items-center justify-center text-center relative z-10">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-center bg-transparent font-serif italic text-5xl md:text-6xl text-memory-maroon font-normal tracking-tight placeholder:text-stone-300 border-none outline-none focus:ring-0 p-0 mb-3"
        />
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px w-8 bg-stone-300"></div>
          <input
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="w-48 text-center bg-transparent text-sm font-serif uppercase tracking-[0.2em] text-stone-500 placeholder:text-stone-300 border-none outline-none focus:ring-0 p-0"
          />
          <div className="h-px w-8 bg-stone-300"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 mt-12 mb-10 flex flex-col gap-0.5 opacity-60 relative z-10">
        <div className="w-full h-[1px] bg-stone-300"></div>
        <div className="w-full h-[1px] bg-stone-300"></div>
      </div>

      {/* CONTROL SPINE */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 flex flex-wrap justify-center md:justify-between items-center gap-8 relative z-10">
        <div className="flex justify-start relative z-20 shrink-0 transform -rotate-1 hover:rotate-0 transition-transform">
          <motion.button 
            onClick={handleCopyLink}
            whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
            whileTap={{ y: 2, boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}
            className="relative w-44 h-14 bg-white shadow-md border border-stone-200 rounded-r-md rounded-l-sm flex items-center justify-between pl-6 pr-4 cursor-pointer overflow-hidden group"
          >
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#240d14] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.3)]" />
            <span className="font-serif italic text-[13px] text-stone-700 font-medium tracking-wide">
              {isLinkCopied ? "Link Copied." : "Share Memoir"}
            </span>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isLinkCopied ? 'bg-memory-maroon text-white' : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'}`}>
              {isLinkCopied ? <Check size={12} /> : <Copy size={12} />}
            </div>
          </motion.button>
        </div>

        <div className="hidden md:flex relative w-36 h-24 items-center justify-center shrink-0 perspective-[1000px]">
          <div className="absolute inset-0 bg-[#E5DFD6] shadow-sm rounded-sm transform -rotate-6 translate-y-2 border border-stone-300" />
          <div className="absolute inset-0 bg-[#F8F5F1] shadow-sm rounded-sm transform rotate-3 translate-x-2 border border-stone-200" />
          <div 
            className="absolute inset-0 bg-white shadow-md rounded-sm transform -rotate-1 border border-stone-200 flex flex-col items-center justify-center p-3 z-10 hover:rotate-0 transition-transform duration-300"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")` }}
          >
            <span className="font-serif italic text-[11px] text-stone-500 leading-tight">Archive Holds</span>
            <span className="font-sans uppercase tracking-[0.15em] text-[13px] text-memory-maroon font-bold mt-1.5">20 Memories</span>
          </div>
        </div>

        <div className="flex items-center justify-end z-10 shrink-0">
          <div className="relative p-2 shadow-md bg-white border-2 border-[#EAE3D9] w-48 lg:w-56 transform -rotate-1 hover:rotate-0 transition-all z-10"
               style={{ borderRadius: "2px 20px 4px 15px / 15px 4px 20px 3px", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")` }}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-stone-400/50 border-dashed pl-6 py-0.5 text-[13px] font-serif text-stone-800 placeholder-stone-400 outline-none focus:border-memory-maroon transition-colors"
            />
          </div>

          <button 
            onClick={() => setShowCollaborators(true)}
            className="relative w-11 h-11 rounded-full border-[3px] border-stone-300 border-dashed flex items-center justify-center bg-white shadow-md cursor-pointer -ml-4 z-20 transform rotate-6 hover:rotate-0 hover:border-memory-maroon hover:text-memory-maroon text-stone-500 transition-all"
            title="View Collaborators"
          >
            <Users size={18} />
          </button>

          <motion.button 
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-12 h-12 bg-memory-maroon rounded-full flex items-center justify-center shadow-lg cursor-pointer border border-white/20 -ml-3 z-30 hover:bg-stone-900 transition-colors"
            title="Lock & Publish Memoir"
          >
            <Lock size={16} className="text-white" />
          </motion.button>
        </div>
      </section>

      {/* =========================================
          HORIZONTAL THREE-BLOCK PUZZLE DESK
      ========================================= */}
      <section className="max-w-4xl mx-auto mt-16 px-6 sm:px-12 relative z-50">
        <div className="relative">
          
          {/* Default State: Floating Orbs */}
          {activeInput === "none" && (
            <div className="flex flex-col items-center justify-center py-10 space-y-8">
              <p className="font-serif italic text-2xl text-stone-600 tracking-wide">How would you like to remember today?</p>
              
              <div className="flex flex-wrap justify-center gap-8 sm:gap-14 pt-4">
                <motion.button
                  onClick={() => setActiveInput("text")}
                  animate={{ scale: [1, 1.05, 1], y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#5A1827] via-[#3a0f18] to-[#1a090e] text-white flex flex-col items-center justify-center shadow-2xl cursor-pointer border border-white/20 p-4 text-center group"
                >
                  <PenLine size={22} className="mb-2 text-stone-200 group-hover:text-white transition-colors" />
                  <span className="font-serif italic text-sm tracking-wide">Write Story</span>
                </motion.button>

                <motion.button
                  onClick={() => setActiveInput("audio")}
                  animate={{ scale: [1, 1.05, 1], y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ scale: 1.12, rotate: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#4a131f] via-[#2d0a11] to-[#120407] text-white flex flex-col items-center justify-center shadow-2xl cursor-pointer border border-white/20 p-4 text-center group"
                >
                  <Mic size={22} className="mb-2 text-stone-200 group-hover:text-white transition-colors" />
                  <span className="font-serif italic text-sm tracking-wide">Voice Note</span>
                </motion.button>

                <motion.button
                  onClick={() => setActiveInput("media")}
                  animate={{ scale: [1, 1.05, 1], y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#3b0f19] via-[#24070e] to-[#0a0204] text-white flex flex-col items-center justify-center shadow-xl cursor-pointer border border-white/20 p-4 text-center group"
                >
                  <Camera size={22} className="mb-2 text-stone-200 group-hover:text-white transition-colors" />
                  <span className="font-serif italic text-sm tracking-wide">Photograph</span>
                </motion.button>
              </div>
            </div>
          )}

          {/* Horizontal 3-Block Puzzle Layout */}
          <AnimatePresence>
            {activeInput !== "none" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative space-y-6">
                  
                  <div className="flex items-center justify-end px-2 mb-1">
                    <button 
                      type="button" 
                      onClick={() => {
                        setActiveInput("none");
                        setIsTextExpanded(false);
                      }} 
                      className="text-stone-400 hover:text-stone-800 cursor-pointer p-1.5 bg-white/80 rounded-full shadow-sm transition-colors"
                      title="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleLocalSubmit} className="space-y-6">
                    
                    <motion.div 
                      animate={isAssembling ? { x: [0, 0, 0], scale: [1, 0.98, 0.95], opacity: [1, 0.9, 0] } : { x: 0, scale: 1, opacity: 1 }}
                      transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      
                      {/* BLOCK 1: HEADING */}
                      <motion.div 
                        animate={isAssembling ? { x: [0, 80, 0], rotate: [0, -2, 0] } : { x: 0, rotate: 0 }}
                        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                        className="p-8 bg-white border-2 border-stone-200 shadow-xl relative flex flex-col justify-between"
                        style={{ borderRadius: "28px 18px 22px 32px" }}
                      >
                        <div className="space-y-3">
                          <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-memory-maroon font-bold">Heading Piece</label>
                          <input
                            type="text"
                            required
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)}
                            placeholder="Title..."
                            autoFocus
                            className="w-full bg-transparent font-serif italic text-2xl text-stone-900 border-b border-stone-200 pb-2 outline-none focus:border-memory-maroon placeholder:text-stone-300"
                          />
                        </div>
                      </motion.div>

                      {/* BLOCK 2: DATE */}
                      <motion.div 
                        animate={isAssembling ? { scale: [1, 0.95, 0.9] } : { scale: 1 }}
                        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                        className="p-8 bg-white border-2 border-stone-200 shadow-xl relative flex flex-col justify-between"
                        style={{ borderRadius: "18px 32px 28px 16px" }}
                      >
                        <div className="space-y-3">
                          <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-memory-maroon font-bold">Date Piece</label>
                          <input
                            type="date"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                            className="bg-transparent text-base font-serif text-stone-700 border-b border-stone-200 pb-2 outline-none focus:border-memory-maroon cursor-pointer w-full mt-2"
                          />
                        </div>
                      </motion.div>

                      {/* BLOCK 3: CONTENT */}
                      <motion.div 
                        animate={isAssembling ? { x: [0, -80, 0], rotate: [0, 2, 0] } : { x: 0, rotate: 0 }}
                        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                        onClick={() => setIsTextExpanded(true)}
                        className={`p-8 bg-white border-2 border-stone-200 shadow-xl relative transition-all duration-300 ${isTextExpanded ? 'ring-2 ring-memory-maroon/20 md:col-span-3' : 'cursor-pointer hover:border-memory-maroon flex flex-col justify-between'}`}
                        style={{ borderRadius: "22px 20px 32px 18px" }}
                      >
                        <div className="space-y-3 w-full">
                          <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-memory-maroon font-bold">
                            Content Piece {isTextExpanded ? "(Expanded)" : "(Click to write)"}
                          </label>

                          {activeInput === "text" && (
                            <div>
                              {isTextExpanded ? (
                                <textarea
                                  value={inputContent}
                                  onChange={(e) => setInputContent(e.target.value)}
                                  placeholder="Write your story here with care..."
                                  rows={6}
                                  autoFocus
                                  className="w-full bg-stone-50/50 text-stone-800 font-serif text-base leading-relaxed placeholder:text-stone-300 border border-stone-200 p-4 rounded-sm outline-none focus:border-memory-maroon resize-none book-text shadow-inner mt-2"
                                />
                              ) : (
                                <div className="py-2 text-stone-400 font-serif italic text-base select-none truncate">
                                  {inputContent ? inputContent : "Click here to expand and write freely..."}
                                </div>
                              )}
                            </div>
                          )}

                          {activeInput === "audio" && (
                            <div className="flex items-center gap-3 py-3" onClick={(e) => e.stopPropagation()}>
                              <button type="button" className="w-10 h-10 rounded-full bg-memory-maroon text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer shrink-0">
                                <Mic size={16} />
                              </button>
                              <span className="font-serif italic text-sm text-stone-600">Tap to record voice note</span>
                            </div>
                          )}

                          {activeInput === "media" && (
                            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                              <div className="relative border border-dashed border-stone-300 rounded-sm bg-stone-50/50 flex items-center justify-center p-4 gap-2 cursor-pointer hover:bg-stone-100 transition-colors">
                                <Camera size={18} className="text-stone-400" />
                                <span className="text-[11px] font-sans uppercase tracking-widest text-stone-500 font-medium">Attach photo</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>

                    </motion.div>

                    {/* PRESERVE MEMORY BUTTON */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="cursor-pointer bg-memory-maroon text-white px-10 py-4 rounded-full text-xs font-sans font-medium uppercase tracking-widest hover:bg-stone-900 transition-all shadow-2xl flex items-center gap-3 hover:scale-105"
                      >
                        {isAssembling ? "Preserving..." : "Preserve Memory"}
                      </button>
                    </div>

                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================
          SECTION: SEGREGATED MEMORY STACKS
      ========================================= */}
      <section className="max-w-4xl mx-auto mt-24 px-6 sm:px-12 relative z-10">
        <div className="flex flex-col">
          
          <div className="text-center mb-16">
            <h3 className="font-serif italic text-3xl text-stone-900 mb-2">The Memory Archive</h3>
          </div>

          <div className="space-y-20">
            {[
              { id: 'text', title: "Written Reflections", items: mockMemories.filter(m => m.kind === 'text') },
              { id: 'photo', title: "Photographic Plates", items: mockMemories.filter(m => m.kind === 'photo') },
              { id: 'audio', title: "Voice Notes", items: mockMemories.filter(m => m.kind === 'audio') }
            ].map(group => {
              if (group.items.length === 0) return null;
              
              const isExpanded = expandedStacks.includes(group.id);

              return (
                <div key={group.id} className="flex flex-col">
                  
                  {/* Stack Header */}
                  <div className="flex items-center gap-4 mb-8 border-b border-stone-200 pb-3">
                    <h4 className="font-serif italic text-2xl text-stone-800">{group.title}</h4>
                  </div>

                  {/* The Physical Safe Stack with Consistent Card Sizes & Light Mode Back Cards */}
                  <div className="relative w-full max-w-2xl mx-auto flex flex-col">
                    <AnimatePresence>
                      {group.items.map((memory, index) => {
                        if (!isExpanded && index > 2) return null;
                        
                        const isStacked = !isExpanded && index > 0;

                        return (
                          <motion.div 
                            key={memory.id} 
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: 1,
                              scale: isStacked ? 1 - (index * 0.03) : 1,
                              rotate: isExpanded ? 0 : (index === 1 ? -1 : index === 2 ? 1 : 0),
                              marginTop: isExpanded ? (index > 0 ? "32px" : "0px") : (index > 0 ? "-120px" : "0px")
                            }}
                            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                            className={`w-full ${isStacked ? 'pointer-events-none' : ''}`}
                            style={{ zIndex: 40 - index }}
                          >
                            <div className={isStacked ? "opacity-50 saturate-50 bg-[#FAF9F6] border-stone-200/50 rounded-sm transition-all" : ""}>
                              <MemoryCard 
                                memory={memory} 
                                onOptionSelect={(action, id) => console.log(action, id)}
                                onPlayAudio={(id) => console.log("Play audio", id)}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Expand / Collapse Action */}
                  {group.items.length > 1 && (
                    <div className="mt-8 flex justify-center z-50">
                      <button
                        type="button"
                        onClick={() => toggleStack(group.id)}
                        className="cursor-pointer bg-white border-2 border-stone-300 text-stone-800 px-8 py-3 rounded-full text-xs font-sans font-medium uppercase tracking-widest hover:border-memory-maroon hover:text-memory-maroon transition-all shadow-md flex items-center gap-3 group"
                      >
                        <Layers size={16} className={`text-stone-400 group-hover:text-memory-maroon transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        {isExpanded ? `Close ${group.title} Stack` : `Unpack All ${group.items.length} Pieces`}
                      </button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* STATIC COLLABORATORS MODAL */}
      <AnimatePresence>
        {showCollaborators && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/50 backdrop-blur-sm"
            onClick={() => setShowCollaborators(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-[360px] h-[360px] md:w-[420px] md:h-[420px] rounded-full bg-[#FAF9F6] border-[6px] border-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
              }}
            >
              <div className="absolute top-10 flex flex-col items-center z-50">
                <h3 className="font-serif text-2xl text-stone-800">Contributors</h3>
                <p className="text-[9px] font-sans uppercase tracking-widest text-stone-400 mt-1">7 Family Members</p>
              </div>

              <button 
                onClick={() => setShowCollaborators(false)} 
                className="absolute top-12 right-12 md:top-14 md:right-16 text-stone-400 hover:text-memory-maroon cursor-pointer transition-colors z-50 bg-white rounded-full p-1 shadow-sm"
              >
                <X size={16}/>
              </button>
              
              <div className="absolute inset-0 mt-16 pointer-events-none">
                {modalBubbles.map((tag) => (
                  <motion.div 
                    key={tag.name}
                    initial={{ opacity: 0, scale: 0, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 250, damping: 20, delay: tag.delay }}
                    className="absolute px-4 py-2 rounded-full font-serif text-[13px] text-stone-700 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-stone-200 pointer-events-auto cursor-default hover:border-memory-maroon hover:text-memory-maroon transition-colors"
                    style={{ top: tag.top, left: tag.left }}
                  >
                    {tag.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}