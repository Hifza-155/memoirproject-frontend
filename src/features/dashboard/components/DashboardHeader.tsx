"use client";

import { motion } from "framer-motion";
import { Lock, Copy, Check, FileDown } from "lucide-react"; // Added FileDown icon

interface DashboardHeaderProps {
  name: string;
  setName: (name: string) => void;
  dates: string;
  setDates: (dates: string) => void;
  handleCopyLink: () => void;
  isLinkCopied: boolean;
  // PDF Export Props
  pdfFileName: string;
  setPdfFileName: (val: string) => void;
  triggerExport: (name: string) => void;
  isExporting: boolean;
}

export function DashboardHeader({
  name, 
  setName, 
  dates, 
  setDates, 
  handleCopyLink, 
  isLinkCopied,
  pdfFileName,
  setPdfFileName,
  triggerExport,
  isExporting
}: DashboardHeaderProps) {
  return (
    <>
      <header className="w-full border-b border-stone-400/80 bg-memory-bg/80 backdrop-blur-sm px-8 py-5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent font-sans text-2xl text-memory-primary font-bold tracking-tight placeholder:text-stone-400 border-none outline-none focus:ring-0 p-0 w-40"
          />
          <span className="text-stone-600 font-bold">/</span>
          <input
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="bg-transparent text-xs font-sans uppercase tracking-[0.15em] text-stone-800 font-bold placeholder:text-stone-400 border-none outline-none focus:ring-0 p-0 w-28"
          />
        </div>

        <div className="flex items-center gap-4">
          
          {/* COMPACT PDF Export Tool */}
          <div className="flex items-center gap-2 bg-white h-11 px-2 border border-stone-500 shadow-sm rounded-sm transition-all z-10">
            <FileDown size={14} className="text-stone-500 ml-1" />
            <div className="h-4 w-px bg-stone-300"></div>
            <input
              type="text"
              value={pdfFileName}
              onChange={(e) => setPdfFileName(e.target.value)}
              placeholder="Filename"
              className="w-24 bg-transparent border-none px-1 text-[13px] font-serif text-stone-800 placeholder-stone-400 outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={() => triggerExport(pdfFileName)}
              disabled={isExporting}
              className="bg-memory-primary text-white px-3 py-1.5 rounded-sm text-[10px] font-sans font-medium uppercase tracking-wider hover:bg-[#240d14] transition shadow-sm cursor-pointer disabled:opacity-50 flex-shrink-0"
            >
              {isExporting ? "..." : "PDF"}
            </button>
          </div>

          {/* Share Button */}
          <motion.button 
            type="button"
            onClick={handleCopyLink}
            whileHover={{ y: -1, boxShadow: "0 6px 16px rgba(0,0,0,0.06)" }}
            whileTap={{ y: 1 }}
            className="relative w-40 h-11 bg-white shadow-sm border border-stone-500 rounded-r-md rounded-l-sm flex items-center justify-between pl-5 pr-3 cursor-pointer overflow-hidden group"
          >
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#240d14]" />
            <span className="font-sans text-[12px] text-stone-800 font-bold tracking-wide">
              {isLinkCopied ? "Link Copied." : "Share Memoir"}
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isLinkCopied ? 'bg-memory-primary text-white' : 'bg-stone-200 text-stone-600 group-hover:bg-stone-300'}`}>
              {isLinkCopied ? <Check size={10} /> : <Copy size={10} />}
            </div>
          </motion.button>

          {/* Lock Button */}
          <motion.button 
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-11 h-11 bg-memory-primary rounded-full flex items-center justify-center shadow-md cursor-pointer border border-[#240d14]/40 hover:bg-[#240d14] transition-colors"
            title="Lock & Publish Memoir"
          >
            <Lock size={15} className="text-white" />
          </motion.button>
        </div>
      </header>

      <div className="w-full flex items-center justify-center py-2 px-12">
        <div className="w-full h-0.5 bg-stone-500 animate-smooth-pulse rounded-full"></div>
      </div>
    </>
  );
}