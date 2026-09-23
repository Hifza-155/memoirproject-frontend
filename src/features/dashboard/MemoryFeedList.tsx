/**
 * @file MemoryFeedList.tsx
 * @description Dynamic feed component that renders distinct visual cards for written, audio, and photo memories.
 */

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

interface MediaAsset {
  id: string;
  kind: "photo" | "audio" | "video" | "document";
  storage_key?: string;
  playback_url?: string;
  caption?: string;
  transcript?: {
    display_text?: string;
    raw_text?: string;
    confidence?: number;
    language?: string;
  } | null;
}

interface MemoryRecord {
  id: string;
  title?: string;
  body_text?: string;
  text?: string;
  occurred_start?: string;
  created_at: string;
  media_assets?: MediaAsset[];
  memory_media?: Array<{ media_asset?: MediaAsset }>;
}

/**
 * Safely resolves media URLs to prevent Next.js image parser crashes.
 */
function resolveMediaUrl(asset?: MediaAsset): string | null {
  if (!asset) return null;

  // 1. Prefer playback_url if valid absolute URL
  if (asset.playback_url && typeof asset.playback_url === "string") {
    if (
      asset.playback_url.startsWith("http://") ||
      asset.playback_url.startsWith("https://") ||
      asset.playback_url.startsWith("/")
    ) {
      return asset.playback_url;
    }
  }

  // 2. If storage_key is an absolute URL or local path
  if (asset.storage_key && typeof asset.storage_key === "string") {
    if (
      asset.storage_key.startsWith("http://") ||
      asset.storage_key.startsWith("https://") ||
      asset.storage_key.startsWith("/")
    ) {
      return asset.storage_key;
    }

    // 3. Fallback: Convert relative storage key to Supabase public storage URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      const cleanBase = supabaseUrl.replace(/\/+$/, "");
      const cleanKey = asset.storage_key.replace(/^\/+/, "");
      return `${cleanBase}/storage/v1/object/public/memoir-media/${cleanKey}`;
    }
  }

  return null;
}

export default function MemoryFeedList({ memoirId }: { memoirId: string }) {
  const [memories, setMemories] = useState<MemoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  useEffect(() => {
    if (!memoirId) return;

    async function loadFeed() {
      try {
        setLoading(true);
        const data = await api.getMemoirFeed(memoirId);
        setMemories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load feed.");
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, [memoirId]);

  if (loading) {
    return (
      <div className="text-center py-12 text-memory-muted text-sm">
        Loading precious memories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-xl text-xs text-center">
        {error}
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-memory-maroon/20 p-8">
        <p className="font-serif text-memory-primary text-lg mb-2">
          No memories shared yet
        </p>
        <p className="text-xs text-memory-muted">
          Be the first to add a story, voice note, or photo to this memoir.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      {memories.map((memory) => {
        const mediaItems =
          memory.media_assets ||
          memory.memory_media
            ?.map((j) => j.media_asset)
            .filter((m): m is MediaAsset => Boolean(m)) ||
          [];
        const audioAsset = mediaItems.find((m) => m.kind === "audio");
        const photoAsset = mediaItems.find((m) => m.kind === "photo");

        const isAudioMemory = Boolean(audioAsset);
        const isPhotoMemory = Boolean(photoAsset);

        const photoUrl = resolveMediaUrl(photoAsset);
        const audioUrl = resolveMediaUrl(audioAsset);

        const dateFormatted = memory.occurred_start
          ? new Date(memory.occurred_start).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : new Date(memory.created_at).toLocaleDateString();

        const resolvedText = memory.body_text || memory.text || "";

        return (
          <div key={memory.id} className="relative w-full">
            <div className="absolute inset-x-2 top-2 bottom-1 rounded-sm border border-memory-maroon/20 bg-memory-maroon/5" />

            <div className="relative z-10 bg-white p-6 md:p-8 rounded-2xl border border-memory-maroon/20 shadow-xs space-y-4">
              {/* Meta Header */}
              <div className="flex items-center justify-between border-b border-memory-maroon/10 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-memory-muted font-mono">
                  {dateFormatted}
                </span>

                {isAudioMemory && (
                  <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                    🎙️ Voice Recording
                  </span>
                )}
                {isPhotoMemory && !isAudioMemory && (
                  <span className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                    📷 Photo Memory
                  </span>
                )}
                {!isAudioMemory && !isPhotoMemory && (
                  <span className="text-[10px] bg-memory-maroon/10 text-memory-maroon px-2 py-0.5 rounded-full font-medium">
                    ✍️ Written Story
                  </span>
                )}
              </div>

              {/* Title & Body Text */}
              <div>
                {memory.title && (
                  <h3 className="font-serif font-bold text-lg text-memory-primary mb-2">
                    {memory.title}
                  </h3>
                )}
                {resolvedText && (
                  <p className="font-serif text-sm text-memory-primary/90 leading-relaxed whitespace-pre-line">
                    {resolvedText}
                  </p>
                )}
              </div>

              {/* PHOTO MEMORY VISUAL */}
              {photoAsset && photoUrl && (
                <div className="mt-4 pt-4 border-t border-memory-maroon/10 text-center">
                  <div className="rounded-xl overflow-hidden relative w-full h-72 max-w-md mx-auto border border-memory-maroon/15 bg-memory-bg">
                    {/* Plain img tag: next/image's optimizer silently fails on
                        Supabase Storage URLs that aren't whitelisted in next.config.js,
                        which is why photos weren't appearing in the feed. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoUrl}
                      alt={photoAsset.caption || memory.title || "Memory photo"}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  {photoAsset.caption && (
                    <p className="text-xs italic text-memory-muted mt-2">
                      {photoAsset.caption}
                    </p>
                  )}
                </div>
              )}

              {/* AUDIO MEMORY VISUAL & TRANSCRIPT */}
              {audioAsset && audioUrl && (
                <div className="mt-4 pt-4 border-t border-memory-maroon/10 bg-memory-light p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-4">
                    <audio
                      id={`audio-player-${memory.id}`}
                      src={audioUrl}
                      onEnded={() => setPlayingAudioId(null)}
                      preload="metadata"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const audioEl = document.getElementById(
                          `audio-player-${memory.id}`
                        ) as HTMLAudioElement;
                        if (!audioEl) return;

                        if (playingAudioId === memory.id) {
                          audioEl.pause();
                          setPlayingAudioId(null);
                        } else {
                          document
                            .querySelectorAll("audio")
                            .forEach((el) => el.pause());
                          audioEl.play();
                          setPlayingAudioId(memory.id);
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-memory-primary text-memory-light flex items-center justify-center hover:bg-memory-maroon transition shadow-sm cursor-pointer shrink-0"
                      aria-label="Play audio note"
                    >
                      <span className="text-xs font-bold">
                        {playingAudioId === memory.id ? "❚❚" : "▶"}
                      </span>
                    </button>

                    <div className="flex-1 w-full space-y-1">
                      <div className="flex justify-between text-[11px] text-memory-muted font-mono">
                        <span>
                          {playingAudioId === memory.id
                            ? "Playing voice recording..."
                            : "Voice Note Recording"}
                        </span>
                        <span>AssemblyAI Audio</span>
                      </div>
                      <audio
                        controls
                        src={audioUrl}
                        className="w-full h-8 mt-1 opacity-90"
                      />
                    </div>
                  </div>

                  {/* AI TRANSCRIPTION DISPLAY BOX */}
                  <div className="bg-white/80 border border-memory-maroon/10 rounded-lg p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-memory-accent">
                        ✨ AI Transcript (AssemblyAI)
                      </span>
                      {audioAsset.transcript?.confidence && (
                        <span className="text-[10px] text-memory-muted font-mono">
                          Confidence:{" "}
                          {Math.round(
                            audioAsset.transcript.confidence * 100
                          )}
                          %
                        </span>
                      )}
                    </div>

                    <p className="font-serif text-xs text-memory-primary/90 italic leading-relaxed">
                      {audioAsset.transcript?.display_text ||
                        "Transcript not available yet."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}