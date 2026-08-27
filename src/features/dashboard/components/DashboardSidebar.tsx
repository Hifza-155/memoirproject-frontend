import React from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: "feed", label: "Story Feed" },
    { id: "media", label: "Media Vault" },
    { id: "team", label: "Collaborators" },
  ];

  return (
    <aside className="w-64 bg-memory-card border-r border-memory-border hidden md:flex flex-col justify-between p-6 shadow-2xs">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-lg bg-memory-primary text-memory-light flex items-center justify-center font-serif font-bold text-lg shadow-2xs">
            M
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-memory-primary tracking-tight">Memoir</h1>
            <span className="text-xs text-memory-accent font-medium uppercase tracking-wider">Owner Dashboard</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-memory-light text-memory-primary font-semibold border border-memory-border shadow-2xs"
                    : "text-memory-muted hover:bg-memory-light hover:text-memory-primary"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-memory-border pt-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-memory-border flex items-center justify-center font-semibold text-memory-primary text-sm">
          DK
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-memory-primary truncate">Daniyah Khan</p>
          <p className="text-xs text-memory-muted truncate">Owner</p>
        </div>
      </div>
    </aside>
  );
}