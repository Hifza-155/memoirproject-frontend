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
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const router = useRouter();

  const metricsData = [
    {
      label: "Total Entries",
      value: memories.length,
    },
    {
      label: "Media Vault",
      value: "0 MB",
    },
    {
      label: "Collaborators",
      value: 1,
    },
  ];

  const handleOptionSelect = (action: string, memoryId: string) => {
    if (action === "delete") {
      setMemories((prev) =>
        prev.filter((memory) => memory.id !== memoryId)
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("active_memoir");
    router.push("/");
  };

  return (
    <BookCoverExperience
      title="Personal Life Memoir"
      subtitle="A preserved record of personal stories, reflections, and voice notes."
    >
      <div className="flex min-h-screen overflow-hidden rounded-2xl border border-memory-border bg-memory-bg text-memory-primary shadow-lg">
        {/* =========================
            SIDEBAR
        ========================== */}
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* =========================
            MAIN AREA
        ========================== */}
        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <DashboardHeader
            subjectName="Ahmad Khan"
            dob="1942"
            dod="2024"
            onLogout={handleLogout}
          />

          {/* =========================
              CONTENT
          ========================== */}
          <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
            {/* Intro */}
            <div className="mb-7">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-memory-accent">
                Living Archive
              </p>

              <h1 className="font-serif text-2xl font-bold tracking-tight text-memory-maroon sm:text-3xl">
                Preserve the moments that matter.
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-memory-muted">
                Capture stories, voices, photographs, and memories to build a
                lasting personal archive.
              </p>
            </div>

            {/* Metrics */}
            <div className="mb-9">
              <MetricsGrid metrics={metricsData} />
            </div>

            {/* =========================
                STORY FEED
            ========================== */}
            {activeTab === "feed" && (
              <MemoryFeed
                memories={memories}
                onOptionSelect={handleOptionSelect}
              />
            )}

            {/* =========================
                MEDIA VAULT
            ========================== */}
            {activeTab === "media" && (
              <section className="rounded-3xl border border-memory-border bg-memory-card p-10 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-memory-accent bg-memory-light font-serif text-xl font-bold text-memory-maroon">
                  M
                </div>

                <h3 className="mt-5 font-serif text-xl font-bold text-memory-maroon">
                  Media Vault
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-memory-muted">
                  Your photographs and other preserved media will appear here.
                </p>

                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-memory-accent">
                  Coming soon
                </p>
              </section>
            )}

            {/* =========================
                COLLABORATORS
            ========================== */}
            {activeTab === "team" && (
              <section className="rounded-3xl border border-memory-border bg-memory-card p-10 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-memory-accent bg-memory-light font-serif text-xl font-bold text-memory-maroon">
                  M
                </div>

                <h3 className="mt-5 font-serif text-xl font-bold text-memory-maroon">
                  Collaborators
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-memory-muted">
                  Family members and invited contributors will be managed from
                  this space.
                </p>

                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-memory-accent">
                  Coming soon
                </p>
              </section>
            )}
          </div>
        </main>
      </div>
    </BookCoverExperience>
  );
}