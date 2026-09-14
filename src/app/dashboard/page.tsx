"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Modular Imports
import { contributorNames } from "@/features/dashboard/data/mockData"; // mockMemories removed
import { BookCoverExperience } from "@/features/dashboard/components/BookCoverExperience";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { MemoryInputSection } from "@/features/dashboard/components/MemoryInputSection";
import { MemoryArchive } from "@/features/dashboard/components/MemoryArchive";
import { ContributorsOverlay } from "@/features/dashboard/components/ContributorsOverlay";

// Custom Hooks
import { useCaptureMemory } from "@/hooks/useCaptureMemory";
import { useMemoirFeed } from "@/hooks/useMemoirFeed"; // New hook imported

export default function OwnerDashboard() {
  const [memoirId, setMemoirId] = useState<string>("");
  const [name, setName] = useState("Nadia");
  const [dates, setDates] = useState("1947 — 2024");

  const [activeInput, setActiveInput] = useState<"none" | "text" | "audio" | "media" | "combined">("none");
  const [isTextExpanded, setIsTextExpanded] = useState(false); 

  const [searchQuery, setSearchQuery] = useState("");
  const [showContributors, setShowContributors] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [expandedStacks, setExpandedStacks] = useState<string[]>([]);

  // 1. Resolve active memoir UUID from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("active_memoir");
        if (stored) {
          const parsed = JSON.parse(stored);
          setMemoirId(parsed.id || parsed.data?.id || "");
        }
      } catch (e) {
        console.error("Could not resolve active_memoir from localStorage", e);
      }
    }, 0);

    return () => clearTimeout(timer); 
  }, []);

  // 2. Fetch real data using the new hook
  const { 
    memories, 
    loading: feedLoading, 
    error: feedError, 
    refreshFeed 
  } = useMemoirFeed(memoirId);

  // 3. Initialize real capture pipeline
  const {
    draft,
    setDraft,
    photoFile,
    setPhotoFile,
    recording,
    audioUrl,
    loading: isAssembling,
    error,
    successMsg,
    startRecording,
    stopRecording,
    clearRecording,
    handleSubmit
  } = useCaptureMemory(memoirId, () => {
    // Reset view state when memory successfully persists to DB/storage
    setActiveInput("none");
    setIsTextExpanded(false);
    
    // Instantly refresh the visual archive with the newly saved memory
    refreshFeed();
  });

  const toggleStack = (kind: string) => {
    setExpandedStacks(prev => prev.includes(kind) ? prev.filter(k => k !== kind) : [...prev, kind]);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/contribute/${memoirId || "preview"}`);
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

            {/* Error and Success Notifications for the Capture Form */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                {successMsg}
              </div>
            )}

            <MemoryInputSection 
              activeInput={activeInput} 
              setActiveInput={setActiveInput}
              isTextExpanded={isTextExpanded} 
              setIsTextExpanded={setIsTextExpanded}
              isAssembling={isAssembling}
              
              // Bound to useCaptureMemory draft state
              inputTitle={draft.title} 
              setInputTitle={(val) => setDraft({ ...draft, title: val })}
              inputDate={draft.occurred_start || ""} 
              setInputDate={(val) => setDraft({ ...draft, occurred_start: val })}
              inputContent={draft.body_text || ""} 
              setInputContent={(val) => setDraft({ ...draft, body_text: val })}
              
              // Media handlers
              photoFile={photoFile}
              setPhotoFile={setPhotoFile}
              recording={recording}
              audioUrl={audioUrl}
              startRecording={startRecording}
              stopRecording={stopRecording}
              clearRecording={clearRecording}

              // Real database submit
              handleLocalSubmit={handleSubmit}
            />

            {/* Dynamic Archive Rendering */}
            {feedLoading && !memories.length ? (
              <div className="py-24 text-center text-memory-muted text-sm tracking-widest uppercase animate-pulse">
                Unpacking Archive...
              </div>
            ) : feedError ? (
              <div className="py-24 text-center text-red-600 text-sm font-medium">
                Failed to load archive: {feedError}
              </div>
            ) : (
              <MemoryArchive 
                expandedStacks={expandedStacks} 
                toggleStack={toggleStack} 
                mockMemories={memories} // Passing the real normalized database objects here
              />
            )}
            
          </div>
        </main>
      </div>
    </BookCoverExperience>
  );
}