"use client";

import React, { useState } from "react";
import { api, ChapterProposalPayload } from "@/lib/api/client";

export function ChapterOrganizer({ memoirId }: { memoirId: string }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [proposal, setProposal] = useState<ChapterProposalPayload | null>(null);
  
  // New chat states
  const [chatInput, setChatInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  const runPipeline = async () => {
    if (!memoirId) return;
    setLoading(true);
    try {
      const data = await api.proposeChapters(memoirId);
      setProposal(data);
    } catch (err: unknown) {
      console.error("Chapter proposal error:", err);
      const msg = err instanceof Error ? err.message : "Failed to organize chapters. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!memoirId || !proposal || !chatInput.trim()) return;
    setIsRefining(true);
    try {
      const data = await api.refineChapters(memoirId, proposal, chatInput.trim());
      setProposal(data);
      setChatInput("");
    } catch (err: unknown) {
      console.error("Chapter refine error:", err);
      const msg = err instanceof Error ? err.message : "Failed to refine chapters.";
      alert(msg);
    } finally {
      setIsRefining(false);
    }
  };

  const handleApply = async () => {
    if (!memoirId || !proposal) return;
    savingState(true);
    try {
      await api.applyChapters(memoirId, proposal);
      alert("Chapter layout and narrative successfully applied!");
      setProposal(null);
    } catch (err: unknown) {
      console.error("Chapter apply error:", err);
      const msg = err instanceof Error ? err.message : "Failed to save chapters.";
      alert(msg);
    } finally {
      savingState(false);
    }
  };

  const savingState = (val: boolean) => setSaving(val);

  const handleRename = (idx: number, newTitle: string) => {
    if (!proposal) return;
    const updated = { ...proposal };
    updated.chapters[idx].title = newTitle;
    setProposal(updated);
  };
  
  const handleEditSummary = (idx: number, newSummary: string) => {
    if (!proposal) return;
    const updated = { ...proposal };
    updated.chapters[idx].summary = newSummary;
    setProposal(updated);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-memory-maroon/20 p-12 text-center shadow-xs">
        <div className="animate-spin w-8 h-8 border-2 border-memory-maroon border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 className="font-serif text-xl text-memory-primary mb-2">Agents are running...</h3>
        <p className="text-sm text-memory-muted">
          Reading scattered memories...<br/>
          Synthesizing biographical narrative...<br/>
          Organizing timeline...
        </p>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="bg-white rounded-2xl border border-memory-maroon/20 p-12 text-center shadow-xs">
        <div className="w-12 h-12 bg-memory-light text-memory-accent border border-memory-accent rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl">
          ✨
        </div>
        <h3 className="font-serif text-xl text-memory-primary mb-3">Self-Organizing Memoir</h3>
        <p className="text-sm text-memory-muted max-w-md mx-auto mb-6">
          Let the AI pipeline review your transcripts, dates, and scattered entries to synthesize a cohesive, biographical chapter layout. You retain full control to edit or chat with the AI before anything is published.
        </p>
        <button
          onClick={runPipeline}
          className="bg-memory-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-memory-maroon transition shadow-sm cursor-pointer"
        >
          Generate Narrative Proposal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-memory-card p-4 rounded-xl border border-memory-border shadow-2xs">
        <div>
          <h3 className="font-serif text-lg font-bold text-memory-primary">Proposed Narrative Layout</h3>
          <p className="text-xs text-memory-muted">Review, chat with the AI to tweak, or edit manually.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setProposal(null)}
            className="px-4 py-2 text-sm text-memory-muted hover:text-memory-primary font-medium cursor-pointer"
          >
            Discard
          </button>
          <button 
            onClick={handleApply}
            disabled={saving || isRefining}
            className="bg-memory-maroon text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-memory-primary shadow-sm transition cursor-pointer"
          >
            {saving ? "Applying..." : "Accept & Apply"}
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {proposal.chapters.map((chapter, cIdx) => (
          <div key={cIdx} className="bg-white border border-memory-border rounded-xl overflow-hidden shadow-xs">
            {/* Title Header */}
            <div className="bg-memory-light border-b border-memory-border px-5 py-3 flex items-center gap-3">
              <span className="text-xs font-bold text-memory-accent uppercase tracking-widest">
                Chapter {cIdx + 1}
              </span>
              <input 
                type="text" 
                value={chapter.title}
                onChange={(e) => handleRename(cIdx, e.target.value)}
                className="font-serif text-lg font-bold text-memory-primary bg-transparent outline-none flex-1 border-b border-dashed border-transparent hover:border-memory-border focus:border-memory-accent"
              />
            </div>
            
            {/* Synthesized Biography Narrative */}
            <div className="p-5 border-b border-memory-border bg-white">
              <h4 className="text-[10px] font-sans font-bold text-memory-muted uppercase tracking-wider mb-2">
                Chapter Biography Narrative
              </h4>
              <textarea
                value={chapter.summary || ""}
                onChange={(e) => handleEditSummary(cIdx, e.target.value)}
                rows={5}
                className="w-full bg-transparent font-serif text-memory-primary leading-relaxed outline-none resize-none border border-transparent hover:border-memory-border/50 focus:border-memory-accent/50 p-2 rounded-md transition-colors"
                placeholder="Synthesized story will appear here..."
              />
            </div>
            
            {/* Source Memories */}
            <div className="p-5 bg-memory-bg space-y-2">
              <h4 className="text-[10px] font-sans font-bold text-memory-muted uppercase tracking-wider mb-2">
                {chapter.memories.length} Included Memories
              </h4>
              {chapter.memories.length === 0 ? (
                <p className="text-sm text-memory-muted italic">No memories placed here.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-80">
                  {chapter.memories.map((mem) => (
                    <div key={mem.id} className="flex justify-between items-center bg-white border border-memory-border/50 px-3 py-2 rounded-lg">
                      <p className="font-serif text-xs text-memory-primary truncate flex-1">
                        {mem.title}
                      </p>
                      <span className="text-[9px] text-memory-muted font-mono uppercase ml-2">
                        {mem.date || "Undated"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI Chat Interface */}
      <div className="bg-memory-card border border-memory-border p-5 rounded-xl shadow-xs sticky bottom-4">
        <h4 className="font-serif text-sm font-bold text-memory-primary mb-2">Iterate with AI</h4>
        <p className="text-xs text-memory-muted mb-3">
          Want a different tone? Prefer everything grouped into 2 chapters? Tell the editor AI.
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isRefining || saving}
            placeholder="e.g. Make chapter 2 sound more formal, and merge chapter 3 & 4..."
            className="flex-1 bg-white border border-memory-border rounded-lg px-4 py-2 text-sm text-memory-primary outline-none focus:border-memory-accent"
          />
          <button
            onClick={handleRefine}
            disabled={isRefining || saving || !chatInput.trim()}
            className="bg-memory-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-memory-maroon disabled:opacity-50 transition cursor-pointer whitespace-nowrap"
          >
            {isRefining ? "Refining..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}