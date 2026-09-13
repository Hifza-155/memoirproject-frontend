"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Lock, Copy, Check } from "lucide-react";

interface DashboardHeaderProps {
  name: string;
  setName: (name: string) => void;
  dates: string;
  setDates: (dates: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleCopyLink: () => void;
  isLinkCopied: boolean;
}

export function DashboardHeader({
  name, setName, dates, setDates, searchQuery, setSearchQuery, handleCopyLink, isLinkCopied
}: DashboardHeaderProps) {
  return (
    <>
      <header className="w-full border-b border-stone-300/80 bg-memory-bg/80 backdrop-blur-sm px-8 py-5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent font-sans text-2xl text-memory-primary font-normal tracking-tight placeholder:text-stone-300 border-none outline-none focus:ring-0 p-0 w-40"
          />
          <span className="text-stone-400">/</span>
          <input
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="bg-transparent text-xs font-sans uppercase tracking-[0.15em] text-stone-500 placeholder:text-stone-300 border-none outline-none focus:ring-0 p-0 w-28"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Restored Creative Search Bar shape */}
          <div className="relative p-2 shadow-sm bg-white border border-stone-300 w-48 transform -rotate-1 hover:rotate-0 transition-all z-10"
               style={{ borderRadius: "2px 20px 4px 15px / 15px 4px 20px 3px" }}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-stone-400/50 border-dashed pl-6 py-0.5 text-[12px] font-sans text-stone-800 placeholder-stone-400 outline-none focus:border-memory-primary transition-colors"
            />
          </div>

          {/* Restored Book-Spine Share Button */}
          <motion.button 
            type="button"
            onClick={handleCopyLink}
            whileHover={{ y: -1, boxShadow: "0 6px 16px rgba(0,0,0,0.06)" }}
            whileTap={{ y: 1 }}
            className="relative w-40 h-11 bg-white shadow-sm border border-stone-300 rounded-r-md rounded-l-sm flex items-center justify-between pl-5 pr-3 cursor-pointer overflow-hidden group"
          >
            {/* The dark "book spine" accent on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#240d14]" />
            <span className="font-sans text-[12px] text-stone-700 font-medium tracking-wide">
              {isLinkCopied ? "Link Copied." : "Share Memoir"}
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isLinkCopied ? 'bg-memory-primary text-white' : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'}`}>
              {isLinkCopied ? <Check size={10} /> : <Copy size={10} />}
            </div>
          </motion.button>

          {/* Restored Rounded Lock Button */}
          <motion.button 
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-11 h-11 bg-memory-primary rounded-full flex items-center justify-center shadow-md cursor-pointer border border-white/20 hover:bg-[#240d14] transition-colors"
            title="Lock & Publish Memoir"
          >
            <Lock size={15} className="text-white" />
          </motion.button>
        </div>
      </header>

      <div className="w-full flex items-center justify-center py-2 px-12">
        <div className="w-full h-0.5 bg-stone-400 animate-smooth-pulse rounded-full"></div>
      </div>
    </>
  );
}