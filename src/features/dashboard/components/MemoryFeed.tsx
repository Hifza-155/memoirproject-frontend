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

export function MemoryFeed({
  memories,
  memoirId,
  onOptionSelect,
  onSuccess,
}: MemoryFeedProps) {
  const [activeCaptureMode, setActiveCaptureMode] = useState<
    "text" | "audio" | "combined" | null
  >(null);

  const safeMemoirId =
    memoirId ?? "00000000-0000-0000-0000-000000000000";

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
    handleSubmit,
  } = useCaptureMemory(safeMemoirId, () => {
    setActiveCaptureMode(null);
    if (onSuccess) onSuccess();
  });

  const handleCardClick = (
    mode: "text" | "audio" | "combined"
  ) => {
    setActiveCaptureMode(
      activeCaptureMode === mode ? null : mode
    );
  };

  return (
    <div className="space-y-10">
      {/* =========================
          CAPTURE NEW ENTRY
      ========================== */}
      <section className="space-y-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-memory-accent">
            Preserve a moment
          </p>

          <h3 className="mt-1 font-serif text-2xl font-semibold text-memory-primary">
            Capture New Entry
          </h3>

          <p className="mt-1 max-w-xl text-sm leading-relaxed text-memory-muted">
            Add a story, voice recording, or photograph to
            this living memoir.
          </p>
        </div>

        {/* Capture Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* ================= WRITTEN ================= */}
          <button
            type="button"
            onClick={() => handleCardClick("text")}
            className={`group relative min-h-[220px] overflow-hidden rounded-3xl border p-7 text-left transition-all duration-300 ${
              activeCaptureMode === "text"
                ? "border-memory-primary bg-memory-card shadow-lg ring-2 ring-memory-primary/10"
                : "border-memory-border bg-memory-card shadow-sm hover:-translate-y-1 hover:border-memory-accent hover:shadow-md"
            }`}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-memory-light text-memory-primary">
                  <span className="font-serif text-lg">Aa</span>
                </div>

                <h4 className="font-serif text-xl font-semibold text-memory-primary">
                  Written Reflection
                </h4>

                <p className="mt-2 max-w-[230px] text-xs leading-relaxed text-memory-muted">
                  Add a personal story, journal entry, or
                  historical note.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-memory-muted">
                  Write a memory
                </span>

                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                    activeCaptureMode === "text"
                      ? "bg-memory-primary text-memory-light rotate-45"
                      : "bg-memory-light text-memory-primary group-hover:bg-memory-primary group-hover:text-memory-light"
                  }`}
                >
                  +
                </span>
              </div>
            </div>
          </button>

          {/* ================= VOICE ================= */}
          <button
            type="button"
            onClick={() => handleCardClick("audio")}
            className={`group relative min-h-[220px] overflow-hidden rounded-3xl border p-7 text-left transition-all duration-300 ${
              activeCaptureMode === "audio"
                ? "border-memory-primary bg-memory-light shadow-lg ring-2 ring-memory-primary/10"
                : "border-memory-border bg-memory-light shadow-sm hover:-translate-y-1 hover:border-memory-accent hover:shadow-md"
            }`}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-memory-card text-memory-primary">
                  <span className="text-lg">◉</span>
                </div>

                <h4 className="font-serif text-xl font-semibold text-memory-primary">
                  Voice Recording
                </h4>

                <p className="mt-2 max-w-[230px] text-xs leading-relaxed text-memory-muted">
                  Record a voice narrative and preserve the
                  emotion behind the story.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-memory-muted">
                  Tell it aloud
                </span>

                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                    activeCaptureMode === "audio"
                      ? "bg-memory-primary text-memory-light rotate-45"
                      : "bg-memory-card text-memory-primary group-hover:bg-memory-primary group-hover:text-memory-light"
                  }`}
                >
                  +
                </span>
              </div>
            </div>
          </button>

          {/* ================= MEDIA ================= */}
          <button
            type="button"
            onClick={() => handleCardClick("combined")}
            className={`group relative min-h-[220px] overflow-hidden rounded-3xl border p-7 text-left transition-all duration-300 ${
              activeCaptureMode === "combined"
                ? "border-memory-accent bg-memory-maroon shadow-lg ring-2 ring-memory-accent/20"
                : "border-memory-maroon/30 bg-memory-maroon shadow-sm hover:-translate-y-1 hover:shadow-md"
            }`}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-memory-light/10 text-memory-light">
                  <span className="text-lg">✦</span>
                </div>

                <h4 className="font-serif text-xl font-semibold text-memory-light">
                  Media & Combined
                </h4>

                <p className="mt-2 max-w-[230px] text-xs leading-relaxed text-memory-border/80">
                  Combine photographs with stories,
                  captions, or audio notes.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-memory-border/80">
                  Add visual memories
                </span>

                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                    activeCaptureMode === "combined"
                      ? "bg-memory-accent text-memory-primary rotate-45"
                      : "bg-memory-light text-memory-primary group-hover:bg-memory-accent"
                  }`}
                >
                  +
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* =========================
            EXPANDED CAPTURE FORM
        ========================== */}
        {activeCaptureMode && (
          <div className="animate-fadeIn overflow-hidden rounded-3xl border border-memory-border bg-memory-card shadow-md">
            {/* Form Header */}
            <div className="flex items-center justify-between border-b border-memory-border px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-memory-accent">
                  New entry
                </p>

                <h4 className="mt-1 font-serif text-lg font-semibold text-memory-primary">
                  {activeCaptureMode === "text" &&
                    "New Written Reflection"}

                  {activeCaptureMode === "audio" &&
                    "New Voice Recording Entry"}

                  {activeCaptureMode === "combined" &&
                    "New Media & Story Entry"}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setActiveCaptureMode(null)}
                className="rounded-full border border-memory-border px-4 py-2 text-xs font-medium text-memory-muted transition-colors hover:bg-memory-light hover:text-memory-primary"
              >
                Close
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="mb-5 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                  {successMsg}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Title + Date */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-memory-muted">
                      Entry Title
                    </label>

                    <input
                      type="text"
                      required
                      value={draft.title}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. Summer at the lake house"
                      className="w-full rounded-xl border border-memory-border bg-memory-light px-4 py-3 text-sm text-memory-primary outline-none transition-colors placeholder:text-memory-muted/60 focus:border-memory-accent"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-memory-muted">
                      Date
                    </label>

                    <input
                      type="date"
                      value={draft.occurred_start}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          occurred_start: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-memory-border bg-memory-light px-4 py-3 text-sm text-memory-primary outline-none transition-colors focus:border-memory-accent"
                    />
                  </div>
                </div>

                {/* Story */}
                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-memory-muted">
                    Story / Text
                  </label>

                  <textarea
                    rows={5}
                    value={draft.body_text}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        body_text: e.target.value,
                      })
                    }
                    placeholder="Write your memory here..."
                    className="w-full resize-none rounded-xl border border-memory-border bg-memory-light px-4 py-3 text-sm leading-relaxed text-memory-primary outline-none transition-colors placeholder:text-memory-muted/60 focus:border-memory-accent"
                  />
                </div>

                {/* Voice Recording */}
                {activeCaptureMode === "audio" && (
                  <div className="border-t border-memory-border pt-5">
                    <label className="mb-3 block text-[10px] font-semibold uppercase tracking-wider text-memory-muted">
                      Voice Recording
                    </label>

                    {!recording && !audioUrl && (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="rounded-xl bg-memory-primary px-5 py-2.5 text-xs font-medium text-memory-light transition-colors hover:bg-memory-maroon"
                      >
                        Record Voice
                      </button>
                    )}

                    {recording && (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="animate-pulse rounded-xl bg-red-600 px-5 py-2.5 text-xs font-medium text-white"
                      >
                        Stop Recording
                      </button>
                    )}

                    {audioUrl && (
                      <div className="flex flex-wrap items-center gap-4">
                        <audio
                          controls
                          src={audioUrl}
                          className="h-9"
                        />

                        <button
                          type="button"
                          onClick={clearRecording}
                          className="text-xs font-medium text-red-600 underline"
                        >
                          Re-record
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Photo */}
                {activeCaptureMode === "combined" && (
                  <div className="space-y-4 border-t border-memory-border pt-5">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-memory-muted">
                      Photograph
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setPhotoFile(
                          e.target.files?.[0] || null
                        )
                      }
                      className="block w-full text-xs text-memory-primary"
                    />

                    {photoFile && (
                      <input
                        type="text"
                        placeholder="Optional photo caption..."
                        value={photoCaption}
                        onChange={(e) =>
                          setPhotoCaption(e.target.value)
                        }
                        className="w-full rounded-xl border border-memory-border bg-memory-light px-4 py-3 text-sm text-memory-primary outline-none focus:border-memory-accent"
                      />
                    )}
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-end gap-3 border-t border-memory-border pt-5">
                  <button
                    type="button"
                    onClick={() => setActiveCaptureMode(null)}
                    className="rounded-xl border border-memory-border px-5 py-2.5 text-xs font-medium text-memory-muted transition-colors hover:bg-memory-light hover:text-memory-primary"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-memory-primary px-6 py-2.5 text-xs font-medium text-memory-light shadow-sm transition-colors hover:bg-memory-maroon disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Saving Memory..."
                      : "Save Memory to Feed"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* =========================
          CHRONICLE FEED
      ========================== */}
      <section className="space-y-5 border-t border-memory-border pt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-memory-accent">
              Living archive
            </p>

            <h3 className="mt-1 font-serif text-2xl font-semibold text-memory-primary">
              Chronicle Entries
            </h3>
          </div>

          <span className="w-fit rounded-full border border-memory-border bg-memory-light px-3 py-1.5 text-xs font-medium text-memory-muted">
            Live Feed ({memories.length})
          </span>
        </div>

        {memories.length === 0 ? (
          <div className="rounded-3xl border border-memory-border bg-memory-card p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-memory-border bg-memory-light font-serif text-lg font-bold text-memory-primary shadow-sm">
              M
            </div>

            <p className="font-serif text-lg font-medium text-memory-primary">
              No entries recorded yet.
            </p>

            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-memory-muted">
              Begin preserving a story by choosing one of
              the capture options above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {memories.map((memory) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onOptionSelect={onOptionSelect}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}