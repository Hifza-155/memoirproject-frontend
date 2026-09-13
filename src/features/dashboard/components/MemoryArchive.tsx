"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";
import { MemoryItem } from "../types";
import { MemoryCard } from "./MemoryCard";

interface MemoryArchiveProps {
  expandedStacks: string[];
  toggleStack: (kind: string) => void;
  mockMemories: MemoryItem[];
}

export function MemoryArchive({ expandedStacks, toggleStack, mockMemories }: MemoryArchiveProps) {
  return (
    <>
      <div className="w-full flex items-center justify-center my-12 opacity-80">
        <div className="h-0.5 bg-stone-400 w-32"></div>
        <div className="mx-4 w-2 h-2 rounded-full bg-stone-500"></div>
        <div className="h-0.5 bg-stone-400 w-32"></div>
      </div>

      <section id="archive" className="relative z-10 pt-4">
        <div className="flex flex-col">
          
          <div className="text-center mb-16">
            <h3 className="font-sans font-bold text-3xl text-stone-900 mb-2">The Memory Archive</h3>
            <div className="w-16 h-1 bg-memory-primary rounded-full mx-auto mt-4"></div>
          </div>

          <div className="space-y-20">
            {[
              { id: 'text', title: "Written Reflections", items: mockMemories.filter(m => m.kind === 'text') },
              { id: 'photo', title: "Photographic Plates", items: mockMemories.filter(m => m.kind === 'photo' || m.kind === 'combined') },
              { id: 'audio', title: "Voice Notes", items: mockMemories.filter(m => m.kind === 'audio') }
            ].map(group => {
              if (group.items.length === 0) return null;
              
              const isExpanded = expandedStacks.includes(group.id);

              return (
                <div key={group.id} className="flex flex-col">
                  
                  <div className="flex items-center gap-4 mb-8 border-b border-stone-300 pb-3">
                    <h4 className="font-sans font-semibold text-2xl text-stone-800">{group.title}</h4>
                  </div>

                  <div className="relative w-full mx-auto flex flex-col">
                    <AnimatePresence>
                      {group.items.map((memory, index) => {
                        if (!isExpanded && index > 2) return null;
                        const isStacked = !isExpanded && index > 0;

                        return (
                          <motion.div 
                            key={memory.id} 
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: 1,
                              scale: isStacked ? 1 - (index * 0.03) : 1,
                              rotate: isExpanded ? 0 : (index === 1 ? -1 : index === 2 ? 1 : 0),
                              marginTop: isExpanded ? (index > 0 ? "32px" : "0px") : (index > 0 ? "-120px" : "0px")
                            }}
                            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                            className={`w-full ${isStacked ? 'pointer-events-none' : ''}`}
                            style={{ zIndex: 40 - index }}
                          >
                            <div className={isStacked ? "opacity-50 saturate-50 bg-memory-bg border-stone-300/50 rounded-xl transition-all" : ""}>
                              <MemoryCard 
                                memory={memory} 
                                onOptionSelect={(action, id) => console.log(action, id)}
                                onPlayAudio={(id) => console.log("Play audio", id)}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {group.items.length > 1 && (
                    <div className="mt-12 flex justify-center z-50">
                      <motion.button
                        type="button"
                        onClick={() => toggleStack(group.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="cursor-pointer bg-white border-2 border-stone-300 text-stone-800 px-8 py-4 rounded-xl text-[16px] font-semibold transition-all duration-300 shadow-md flex items-center gap-3 group hover:border-memory-primary hover:text-memory-primary"
                      >
                        <Layers size={18} className={`text-stone-400 group-hover:text-memory-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        {isExpanded ? `Close ${group.title} Stack` : `Unpack All ${group.items.length} Pieces`}
                      </motion.button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}