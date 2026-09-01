import React, { useState, useEffect } from 'react';

export default function MemoirLayout({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeView, setActiveView] = useState<'timeline' | 'chapters'>('timeline');

  // Handle the "Invisible Filtering" Top Bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-memory-maroon/20">
      
      {/* 1. DISAPPEARING TOP APP BAR */}
      <header 
        className={`fixed top-0 inset-x-0 h-24 bg-linear-to-r from-memory-dark-end via-[#240d14] to-memory-dark-end text-white backdrop-blur-md border-b border-memory-maroon/60 z-50 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] flex flex-col justify-between shadow-xl group/header ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex-1 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-3.5">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-memory-maroon/40 border border-white/20 text-white transition-all duration-500 group-hover/header:scale-110 group-hover/header:bg-memory-maroon/70">
              <svg className="w-4 h-4 transition-transform duration-700 group-hover/header:-translate-y-0.5 group-hover/header:scale-105" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 4.03-8 7.5-8 11a8 8 0 0016 0c0-3.5-3.03-6.97-8-11z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m-3-3l3 3 3-3" />
              </svg>
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl font-serif tracking-wide text-white font-medium flex items-center gap-2">
                Robert&apos;s Memoir
              </h1>
              <span className="text-[11px] font-serif tracking-widest text-white/60 uppercase mt-0.5">
                1942 — 2024
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/80">
            <button className="hover:text-white transition-colors">Search</button>
            <button className="hover:text-white transition-colors">Filter by Contributor</button>
            <button className="hover:text-white transition-colors">Media Type</button>
          </nav>
        </div>

        <div className="relative w-full flex justify-center pointer-events-none">
          <div className="absolute -top-1 w-48 h-0.5 bg-linear-to-r from-transparent via-white/40 to-transparent"></div>
          <div className="absolute top-0 flex items-center gap-1 transition-transform duration-300 group-hover/header:translate-y-1">
            <div className="w-3 h-3 bg-memory-maroon border border-white/20 [clip-path:polygon(0_0,100_0,50_100%)] shadow-sm"></div>
            <div className="w-2.5 h-4 bg-white/90 border border-memory-maroon/20 [clip-path:polygon(0_0,100_0,50_100%)] shadow-sm -mt-1"></div>
          </div>
        </div>
      </header>

      <div className="max-w-360 mx-auto flex pt-24">
        
        {/* 2. THE DUAL-SPINE NAVIGATION (Enhanced Interactive Sidebar) */}
        <aside className="hidden lg:block w-72 shrink-0 px-8 py-12 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto border-r border-memory-maroon/15 bg-linear-to-b from-white via-[#FAF7F5]/40 to-white">
          
          {/* View Toggles (Styled like fine book tabs) */}
          <div className="flex items-center p-1 bg-memory-maroon/5 border border-memory-maroon/15 rounded-sm mb-8">
            <button 
              onClick={() => setActiveView('timeline')}
              className={`flex-1 py-2 text-xs font-serif uppercase tracking-wider transition-all duration-300 rounded-sm ${
                activeView === 'timeline' 
                  ? 'bg-memory-maroon text-white shadow-sm font-medium' 
                  : 'text-memory-muted hover:text-memory-maroon'
              }`}
            >
              Timeline
            </button>
            <button 
              onClick={() => setActiveView('chapters')}
              className={`flex-1 py-2 text-xs font-serif uppercase tracking-wider transition-all duration-300 rounded-sm ${
                activeView === 'chapters' 
                  ? 'bg-memory-maroon text-white shadow-sm font-medium' 
                  : 'text-memory-muted hover:text-memory-maroon'
              }`}
            >
              Chapters
            </button>
          </div>

          {/* Dynamic Navigation Content with Interactive Stems */}
          <nav className="space-y-6">
            {activeView === 'timeline' ? (
              <div className="relative">
                {/* Vertical Spine Track Rule */}
                <div className="absolute left-1.75 top-2 bottom-2 w-px bg-linear-to-b from-memory-maroon/30 via-memory-maroon/10 to-transparent"></div>
                
                <ul className="space-y-6 relative z-10">
                  {['1950s', '1960s', '1970s', '1980s', '1990s', '2000s'].map((decade) => (
                    <li key={decade} className="group/item relative pl-7 flex items-center">
                      {/* Interactive Node Point */}
                      <span className="absolute left-0.75 w-2.5 h-2.5 rounded-full bg-white border border-memory-maroon/40 transition-all duration-300 group-hover/item:scale-125 group-hover/item:bg-memory-maroon group-hover/item:border-memory-maroon shadow-xs"></span>
                      
                      <a href={`#${decade}`} className="text-sm font-serif text-memory-muted group-hover/item:text-memory-maroon group-hover/item:translate-x-1 transition-all duration-300 tracking-wide">
                        {decade}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul className="space-y-3">
                {['Early Years', 'The Bakery', 'Moving to London', 'Grandchildren'].map((chapter, index) => (
                  <li key={chapter} className="group/chapter">
                    <a href={`#${chapter}`} className="flex items-center justify-between p-2.5 rounded-sm border border-transparent hover:border-memory-maroon/20 hover:bg-memory-maroon/5 transition-all duration-300">
                      <span className="text-sm font-serif text-memory-muted group-hover/chapter:text-memory-maroon transition-colors">
                        {chapter}
                      </span>
                      <span className="text-[10px] font-serif tracking-widest text-memory-muted/50">
                        0{index + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </aside>

        {/* 3. MAIN STORY CANVAS */}
        <main className="flex-1 max-w-3xl px-6 py-12 lg:px-12 pb-48">
          {children}
        </main>

        {/* 4. MARGIN NOTES RESERVOIR */}
        <aside className="hidden xl:block w-80 shrink-0 pointer-events-none"></aside>

      </div>
    </div>
  );
}