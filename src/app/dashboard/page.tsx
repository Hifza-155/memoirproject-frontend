"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Modualr Imports (Adjust paths based on your absolute/relative config)
import { mockMemories, contributorNames } from "@/features/dashboard/data/mockData";
import { BookCoverExperience } from "@/features/dashboard/components/BookCoverExperience";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { MemoryInputSection } from "@/features/dashboard/components/MemoryInputSection";
import { MemoryArchive } from "@/features/dashboard/components/MemoryArchive";
import { ContributorsOverlay } from "@/features/dashboard/components/ContributorsOverlay";

export default function OwnerDashboard() {
  const [name, setName] = useState("Nadia");
  const [dates, setDates] = useState("1947 — 2024");
  
  const [activeInput, setActiveInput] = useState<"none" | "text" | "audio" | "media" | "combined">("none");
  const [isTextExpanded, setIsTextExpanded] = useState(false); 
  const [isAssembling, setIsAssembling] = useState(false); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputContent, setInputContent] = useState("");

  const [showContributors, setShowContributors] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [expandedStacks, setExpandedStacks] = useState<string[]>([]);

  const toggleStack = (kind: string) => {
    setExpandedStacks(prev => prev.includes(kind) ? prev.filter(k => k !== kind) : [...prev, kind]);
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
    setTimeout(() => setIsLinkCopied(false), 3500);
  };

  return (
    <BookCoverExperience userName="Daniyah">
      <div className="min-h-screen bg-memory-bg text-stone-900 font-sans selection:bg-memory-primary/20 flex overflow-x-hidden relative">
        
        <style dangerouslySetInnerHTML={{ __html: `
          .book-text { hyphens: auto; -webkit-hyphens: auto; -ms-hyphens: auto; }
          @keyframes smoothPulse {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.85; }
          }
          .animate-smooth-pulse { animation: smoothPulse 4s ease-in-out infinite; }
        `}} />

        {/* FOCUS MODE BACKDROP */}
        <AnimatePresence>
          {activeInput !== "none" && (
            <motion.div 
              key="focus-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-memory-bg/92 backdrop-blur-md z-40 pointer-events-auto"
            />
          )}
        </AnimatePresence>

        <ContributorsOverlay 
          showContributors={showContributors} 
          setShowContributors={setShowContributors} 
          contributorNames={contributorNames} 
        />

        <DashboardSidebar setShowContributors={setShowContributors} />

        <main className="flex-1 flex flex-col min-h-screen pb-32">
          
          <DashboardHeader 
            name={name} setName={setName}
            dates={dates} setDates={setDates}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            handleCopyLink={handleCopyLink} isLinkCopied={isLinkCopied}
          />

          <div className="max-w-3xl mx-auto w-full px-6 pt-10">
            <MemoryInputSection 
              activeInput={activeInput} setActiveInput={setActiveInput}
              isTextExpanded={isTextExpanded} setIsTextExpanded={setIsTextExpanded}
              isAssembling={isAssembling}
              inputTitle={inputTitle} setInputTitle={setInputTitle}
              inputDate={inputDate} setInputDate={setInputDate}
              inputContent={inputContent} setInputContent={setInputContent}
              handleLocalSubmit={handleLocalSubmit}
            />

            <MemoryArchive 
              expandedStacks={expandedStacks} 
              toggleStack={toggleStack} 
              mockMemories={mockMemories} 
            />
          </div>

        </main>
      </div>
    </BookCoverExperience>
  );
}