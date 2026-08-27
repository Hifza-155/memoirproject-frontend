'use client';

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api/client";
import CaptureForm from "@/features/dashboard/components/CaptureForm"; // Make sure your CaptureForm component is saved in src/components/CaptureForm.tsx

interface Memoir {
  id: string;
  subject_name: string;
  subject_born_on?: string;
  subject_died_on?: string;
}

interface Memory {
  id: string;
  title: string;
  body_text?: string;
  occurred_start?: string;
  status: string;
}

export default function OwnerDashboard() {
  const [activeMemoir, setActiveMemoir] = useState<Memoir | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("active_memoir");
    return saved ? JSON.parse(saved) : null;
  });

  const [memories, setMemories] = useState<Memory[]>([]);
  const [loadingFeed, setLoadingFeed] = useState<boolean>(false);

  const loadFeed = async (memoirId: string) => {
    setLoadingFeed(true);
    try {
      const data = await api.getMemoirFeed(memoirId);
      setMemories(data.memories || []);
    } finally {
      setLoadingFeed(false);
    }
  };

  useEffect(() => {
    if (activeMemoir?.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadFeed(activeMemoir.id);
    }
  }, [activeMemoir?.id]);
  
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("active_memoir");
    window.location.reload();
  };

  const handleDeleteMemory = async (memoryId: string) => {
    if (!confirm("Remove this memory entry?")) return;
    try {
      await api.deleteMemory(memoryId);
      if (activeMemoir?.id) {
        loadFeed(activeMemoir.id);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  if (!activeMemoir) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50/20 p-4 text-black font-sans">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full space-y-4 border border-amber-900/15 text-center">
          <h2 className="text-xl font-serif font-bold text-amber-900">No Active Memoir Container</h2>
          <p className="text-sm text-gray-500">Please initialize or select a memoir container to begin viewing your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/30 text-gray-800 p-6 font-sans">
      <header className="max-w-3xl mx-auto flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-amber-900">{activeMemoir.subject_name}</h1>
          <p className="text-xs text-gray-500">
            {activeMemoir.subject_born_on || "Unknown"} — {activeMemoir.subject_died_on || "Present"}
          </p>
        </div>
        <button 
          onClick={handleLogout} 
          className="text-sm text-red-600 hover:text-red-800 underline font-medium"
        >
          Logout
        </button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto space-y-8">
        
        {/* 1. Capture Form Section (Text, Voice Recording, Photograph inputs) */}
        <section>
          <CaptureForm 
            memoirId={activeMemoir.id} 
            onSuccess={() => loadFeed(activeMemoir.id)} 
          />
        </section>

        {/* 2. Memories Feed Section */}
        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-serif font-semibold text-amber-900 border-b pb-2">Memories Feed</h2>

          {loadingFeed ? (
            <p className="text-center text-gray-500 py-6">Loading feed...</p>
          ) : memories.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-amber-900/20 rounded-lg p-6 shadow-sm">
              <p className="text-amber-900/70 font-serif italic text-base">
                &ldquo;This memoir container has no memories yet. Use the form above to capture your first story, voice note, or photograph.&rdquo;
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {memories.map((m) => (
                <div key={m.id} className="bg-white p-5 rounded-lg shadow-sm border border-amber-900/10 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold font-serif text-lg text-amber-900">{m.title}</h3>
                    <button 
                      onClick={() => handleDeleteMemory(m.id)} 
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">{m.body_text}</p>
                  <div className="text-xs text-gray-400 pt-2 border-t flex justify-between">
                    <span>Occurred: {m.occurred_start || "N/A"}</span>
                    <span>Status: {m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}