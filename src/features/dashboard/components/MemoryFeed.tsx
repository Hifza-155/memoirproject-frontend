"use client";

import React, { useState } from "react";
import { MemoryCard, MemoryItem } from "./MemoryCard";
import { useCaptureMemory } from "@/hooks/useCaptureMemory";

interface MemoryFeedProps {
  memories: MemoryItem[];
  memoirId?: string; 
  onOptionSelect?: (action: string, memoryId: string) => void;
  onSuccess?: () => void;
}

export function MemoryFeed({ memories, memoirId, onOptionSelect, onSuccess }: MemoryFeedProps) {
  const [activeCaptureMode, setActiveCaptureMode] = useState<"text" | "audio" | "combined" | null>(null);

  // Safe fallback string to satisfy the hook's required string parameter and prevent ts(2345)
  const safeMemoirId = memoirId ?? "00000000-0000-0000-0000-000000000000";

  // Hooking directly into your exact production backend capture logic
  const {
    draft,
    setDraft,
    photoFile,
    setPhotoFile,
    photoCaption,
    setPhotoCaption,
    recording,
    audioUrl,
    loading,
    error,
    successMsg,
    startRecording,
    stopRecording,
    clearRecording,
    handleSubmit
  } = useCaptureMemory(safeMemoirId, () => {
    setActiveCaptureMode(null);
    if (onSuccess) onSuccess();
  });

  const handleCardClick = (mode: "text" | "audio" | "combined") => {
    setActiveCaptureMode(activeCaptureMode === mode ? null : mode);
  };

  return (
    <div className="space-y-8">
      
      {/* --- THREE SQUARE INTERACTIVE INPUT CARDS --- */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xs text-memory-muted uppercase tracking-wider">
          Capture New Entry
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Card 1: Written Reflection */}
          <div 
            onClick={() => handleCardClick("text")}
            className={`relative bg-memory-card border p-6 rounded-3xl cursor-pointer transition-all shadow-xs hover:border-memory-accent aspect-square flex flex-col justify-between ${
              activeCaptureMode === "text" ? "border-memory-primary ring-2 ring-memory-primary/25 scale-[1.02]" : "border-memory-border"
            }`}
          >
            <div className="space-y-2 pr-4">
              <h4 className="font-serif font-bold text-memory-primary text-lg">Written Reflection</h4>
              <p className="text-xs text-memory-muted leading-relaxed">Add a text story, journal entry, or historical note.</p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform shadow-md ${
                  activeCaptureMode === "text" ? "bg-memory-maroon text-memory-light rotate-90" : "bg-memory-primary text-memory-light hover:scale-110"
                }`}
                aria-label="Open text capture form"
              >
                <span className="text-sm font-bold">↗</span>
              </button>
            </div>
          </div>

          {/* Card 2: Voice Recording */}
          <div 
            onClick={() => handleCardClick("audio")}
            className={`relative bg-memory-light border p-6 rounded-3xl cursor-pointer transition-all shadow-xs hover:border-memory-accent aspect-square flex flex-col justify-between ${
              activeCaptureMode === "audio" ? "border-memory-primary ring-2 ring-memory-primary/25 scale-[1.02]" : "border-memory-border"
            }`}
          >
            <div className="space-y-2 pr-4">
              <h4 className="font-serif font-bold text-memory-primary text-lg">Voice Recording</h4>
              <p className="text-xs text-memory-muted leading-relaxed">Record or upload an audio narrative with auto-transcription.</p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform shadow-md ${
                  activeCaptureMode === "audio" ? "bg-memory-maroon text-memory-light rotate-90" : "bg-memory-primary text-memory-light hover:scale-110"
                }`}
                aria-label="Open audio capture form"
              >
                <span className="text-sm font-bold">↗</span>
              </button>
            </div>
          </div>

          {/* Card 3: Media & Combined */}
          <div 
            onClick={() => handleCardClick("combined")}
            className={`relative bg-memory-maroon text-memory-light border p-6 rounded-3xl cursor-pointer transition-all shadow-xs hover:border-memory-accent aspect-square flex flex-col justify-between ${
              activeCaptureMode === "combined" ? "border-memory-accent ring-2 ring-memory-accent/40 scale-[1.02]" : "border-memory-accent/30"
            }`}
          >
            <div className="space-y-2 pr-4">
              <h4 className="font-serif font-bold text-memory-light text-lg">Media & Combined</h4>
              <p className="text-xs text-memory-border/80 leading-relaxed">Attach photos with descriptive text or audio notes.</p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform shadow-md ${
                  activeCaptureMode === "combined" ? "bg-memory-accent text-memory-primary rotate-90" : "bg-memory-light text-memory-primary hover:scale-110"
                }`}
                aria-label="Open media capture form"
              >
                <span className="text-sm font-bold">↗</span>
              </button>
            </div>
          </div>

        </div>

        {/* --- EXPANDED BACKEND-CONNECTED FORM DROPDOWN --- */}
        {activeCaptureMode && (
          <div className="bg-memory-card border border-memory-border rounded-2xl p-6 shadow-md transition-all animate-fadeIn">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-memory-border">
              <h4 className="font-serif font-bold text-memory-primary text-sm uppercase tracking-wider">
                {activeCaptureMode === "text" && "New Written Reflection"}
                {activeCaptureMode === "audio" && "New Voice Recording Entry"}
                {activeCaptureMode === "combined" && "New Media & Story Entry"}
              </h4>
              <button
                type="button"
                onClick={() => setActiveCaptureMode(null)}
                className="text-xs text-memory-muted hover:text-memory-primary cursor-pointer font-medium"
              >
                Close Form
              </button>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">{error}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded">{successMsg}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-memory-muted uppercase mb-1">Entry Title</label>
                  <input
                    type="text"
                    required
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    placeholder="e.g., Summer at the lake house"
                    className="w-full bg-memory-light border border-memory-border rounded-lg px-3 py-2 text-sm text-memory-primary focus:outline-none focus:border-memory-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-memory-muted uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={draft.occurred_start}
                    onChange={(e) => setDraft({ ...draft, occurred_start: e.target.value })}
                    className="w-full bg-memory-light border border-memory-border rounded-lg px-3 py-2 text-sm text-memory-primary focus:outline-none focus:border-memory-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-memory-muted uppercase mb-1">Story / Text</label>
                <textarea
                  rows={4}
                  value={draft.body_text}
                  onChange={(e) => setDraft({ ...draft, body_text: e.target.value })}
                  placeholder="Write your memory here..."
                  className="w-full bg-memory-light border border-memory-border rounded-lg px-3 py-2 text-sm text-memory-primary focus:outline-none focus:border-memory-accent resize-none"
                />
              </div>

              {activeCaptureMode === "audio" && (
                <div className="border-t border-memory-border pt-3">
                  <label className="block text-xs font-semibold text-memory-muted uppercase mb-2">Voice Recording</label>
                  {!recording && !audioUrl && (
                    <button type="button" onClick={startRecording} className="px-3 py-1.5 bg-memory-primary text-memory-light text-xs font-medium rounded hover:bg-memory-maroon cursor-pointer transition-colors">
                      Record Voice
                    </button>
                  )}
                  {recording && (
                    <button type="button" onClick={stopRecording} className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded animate-pulse cursor-pointer">
                      Stop Recording
                    </button>
                  )}
                  {audioUrl && (
                    <div className="flex items-center space-x-3 mt-2">
                      <audio controls src={audioUrl} className="h-8" />
                      <button type="button" onClick={clearRecording} className="text-xs text-red-600 underline cursor-pointer">Re-record</button>
                    </div>
                  )}
                </div>
              )}

              {activeCaptureMode === "combined" && (
                <div className="border-t border-memory-border pt-3 space-y-3">
                  <label className="block text-xs font-semibold text-memory-muted uppercase mb-2">Photograph</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    className="text-xs text-memory-primary"
                  />
                  {photoFile && (
                    <input
                      type="text"
                      placeholder="Optional photo caption..."
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      className="w-full bg-memory-light border border-memory-border rounded-lg px-3 py-2 text-sm text-memory-primary focus:outline-none focus:border-memory-accent mt-2"
                    />
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-memory-border">
                <button
                  type="button"
                  onClick={() => setActiveCaptureMode(null)}
                  className="px-4 py-2 rounded-lg border border-memory-border text-xs text-memory-muted hover:bg-memory-light cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-memory-primary hover:bg-memory-maroon text-memory-light text-xs font-medium rounded shadow-xs cursor-pointer transition-colors"
                >
                  {loading ? "Saving Memory..." : "Save Memory to Feed"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* --- CHRONICLE FEED LIST --- */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-memory-primary">Chronicle Entries</h3>
          <span className="text-xs text-memory-muted bg-memory-light border border-memory-border px-2.5 py-1 rounded-full font-medium">
            Live Feed ({memories.length})
          </span>
        </div>

        {memories.length === 0 ? (
          <div className="bg-memory-card border border-memory-border rounded-2xl p-12 text-center space-y-2">
            <p className="font-serif font-medium text-memory-primary">No entries recorded yet.</p>
            <p className="text-xs text-memory-muted">Click the action arrow on any capture card above to add your first story or voice note.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} onOptionSelect={onOptionSelect} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}