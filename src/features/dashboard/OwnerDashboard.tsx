"use client";

import { useState } from "react";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { MetricsGrid } from "./components/MetricsGrid";
import { MemoryFeed } from "./components/MemoryFeed";
import { MemoryItem } from "./components/MemoryCard";
import { BookCoverExperience } from "./BookCoverExperience";
import { useRouter } from "next/navigation";

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const [memories, setMemories] = useState<MemoryItem[]>([]); // Starts empty, ready for real backend data
  const router = useRouter();
  const metricsData = [
    { label: "Total Entries", value: memories.length },
    { label: "Media Vault", value: "0 MB" },
    { label: "Collaborators", value: 1 },
  ];

  const handleOptionSelect = (action: string, memoryId: string) => {
    if (action === "delete") {
      setMemories((prev) => prev.filter((m) => m.id !== memoryId));
    }
  };

  return (
    <BookCoverExperience
      title="Personal Life Memoir"
      subtitle="A preserved record of personal stories, reflections, and voice notes."
    >
      <div className="min-h-screen bg-memory-bg text-memory-primary flex rounded-2xl border border-memory-border shadow-lg overflow-hidden">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <DashboardHeader
            subjectName="Ahmad Khan"
            dob="1942"
            dod="2024"
            onLogout={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("active_memoir");
              router.push("/"); // Clean Next.js client-side navigation
            }}
          />

          <div className="p-8 max-w-5xl w-full mx-auto space-y-8">
            <MetricsGrid metrics={metricsData} />

            {activeTab === "feed" && (
              <MemoryFeed
                memories={memories}
                onOptionSelect={handleOptionSelect}
              />
            )}
            {activeTab === "media" && (
              <div className="bg-memory-card border border-memory-border rounded-xl p-8 text-center text-memory-muted font-serif">
                Media Vault storage view under construction.
              </div>
            )}
            {activeTab === "team" && (
              <div className="bg-memory-card border border-memory-border rounded-xl p-8 text-center text-memory-muted font-serif">
                Collaborator management panel under construction.
              </div>
            )}
          </div>
        </main>
      </div>
    </BookCoverExperience>
  );
}
