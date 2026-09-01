"use client";

import React from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const navItems = [
    { id: "feed", label: "Story Feed" },
    { id: "media", label: "Media Vault" },
    { id: "team", label: "Collaborators" },
  ];

  return (
    <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-memory-border bg-memory-card p-6 shadow-sm md:flex">
      {/* =========================
          BRAND + NAVIGATION
      ========================== */}
      <div>
        {/* Brand */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-memory-primary font-serif text-lg font-bold text-memory-light shadow-sm">
            M
          </div>

          <div>
            <h1 className="font-serif text-lg font-bold tracking-tight text-memory-primary">
              Memoir
            </h1>

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-memory-accent">
              Owner Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-3 px-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-memory-muted">
            Your memoir
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border border-memory-border bg-memory-light font-semibold text-memory-primary shadow-sm"
                      : "border border-transparent text-memory-muted hover:bg-memory-light hover:text-memory-primary"
                  }`}
                >
                  <span>{item.label}</span>

                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      isActive
                        ? "bg-memory-accent"
                        : "bg-transparent group-hover:bg-memory-border"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* =========================
          OWNER PROFILE
      ========================== */}
      <div className="border-t border-memory-border pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-memory-light font-serif text-sm font-bold text-memory-primary">
            DK
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-memory-primary">
              Daniyah Khan
            </p>

            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-memory-muted">
              Owner
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}