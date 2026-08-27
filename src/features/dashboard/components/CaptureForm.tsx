'use client';

import { useCaptureMemory } from "@/hooks/useCaptureMemory";

interface CaptureFormProps {
  memoirId: string;
  onSuccess?: () => void;
}

export default function CaptureForm({ memoirId, onSuccess }: CaptureFormProps) {
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
  } = useCaptureMemory(memoirId, onSuccess);

  return (
    <div className="bg-white rounded-lg max-w-2xl mx-auto p-6 space-y-6 shadow-sm border border-amber-900/10 text-black">
      <div className="border-b pb-3">
        <h2 className="text-xl font-serif font-bold text-amber-900">Capture a New Memory</h2>
        <p className="text-xs text-gray-500">Record a story, attach media, and add it directly to this memoir.</p>
      </div>

      {error && <div className="p-3 bg-red-100 text-red-700 text-sm rounded">{error}</div>}
      {successMsg && <div className="p-3 bg-green-100 text-green-700 text-sm rounded">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase">Title</label>
          <input
            type="text"
            required
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full border rounded p-2 mt-1 text-black"
            placeholder="e.g., Summer at the lake house"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase">Story / Text</label>
          <textarea
            rows={4}
            value={draft.body_text}
            onChange={(e) => setDraft({ ...draft, body_text: e.target.value })}
            className="w-full border rounded p-2 mt-1 text-black"
            placeholder="Write your memory here..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase">Date</label>
          <input
            type="date"
            value={draft.occurred_start}
            onChange={(e) => setDraft({ ...draft, occurred_start: e.target.value })}
            className="w-full border rounded p-2 mt-1 text-black"
          />
        </div>

        <div className="border-t pt-3">
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Voice Recording</label>
          {!recording && !audioUrl && (
            <button type="button" onClick={startRecording} className="px-3 py-1.5 bg-amber-800 text-white text-sm rounded hover:bg-amber-900">
              Record Voice
            </button>
          )}
          {recording && (
            <button type="button" onClick={stopRecording} className="px-3 py-1.5 bg-red-600 text-white text-sm rounded animate-pulse">
              Stop Recording
            </button>
          )}
          {audioUrl && (
            <div className="flex items-center space-x-3 mt-2">
              <audio controls src={audioUrl} className="h-8" />
              <button type="button" onClick={clearRecording} className="text-xs text-red-600 underline">Re-record</button>
            </div>
          )}
        </div>

        <div className="border-t pt-3">
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Photograph</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
            className="text-sm text-black"
          />
          {photoFile && (
            <input
              type="text"
              placeholder="Optional photo caption..."
              value={photoCaption}
              onChange={(e) => setPhotoCaption(e.target.value)}
              className="w-full border rounded p-2 text-sm mt-2 text-black"
            />
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button 
            type="submit" 
            disabled={loading} 
            className="px-6 py-2 bg-amber-800 text-white rounded hover:bg-amber-900 font-medium"
          >
            {loading ? "Saving Memory..." : "Save Memory to Feed"}
          </button>
        </div>
      </form>
    </div>
  );
}