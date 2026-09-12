"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookCoverExperienceProps {
  children: React.ReactNode;
  userName?: string;
}

export function BookCoverExperience({
  children,
  userName = "Sara"
}: BookCoverExperienceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<{ 
    id: number; top: string; left: string; moveX: string; size: number; duration: number; delay: number; isPaper: boolean 
  }[]>([]);

  useEffect(() => {
    // Generate particles originating from both left and right sides
    const generated = Array.from({ length: 30 }).map((_, i) => {
      const fromLeft = Math.random() > 0.5;
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: fromLeft ? `${-10 - Math.random() * 20}%` : `${110 + Math.random() * 20}%`,
        moveX: fromLeft ? "120vw" : "-120vw", // Move across the entire screen to the opposite side
        size: Math.random() > 0.6 ? Math.random() * 15 + 10 : Math.random() * 3 + 1,
        duration: Math.random() * 8 + 12, 
        delay: Math.random() * 3,
        isPaper: Math.random() > 0.6, 
      };
    });
    setParticles(generated);

    // Increased sequence time from 7.5s to 9s
    const timer = setTimeout(() => setIsVisible(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-memory-bg overflow-x-hidden">
      
      <div className="w-full min-h-screen">
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }} 
            className="absolute inset-0 z-50 w-full h-full bg-memory-primary flex flex-col items-center justify-center select-none overflow-hidden perspective-[1000px]"
          >
            {/* Breathing Background Overlay */}
            <motion.div 
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/10 pointer-events-none"
            />

            {/* Cross-Directional Natural Wind & Paper Drift */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 0, rotateX: 0, rotateY: 0, rotateZ: 0 }}
                animate={{ 
                  x: p.moveX, 
                  y: "-20vh", 
                  opacity: [0, p.isPaper ? 0.4 : 0.2, 0], 
                  rotateX: p.isPaper ? [0, 360] : 0, 
                  rotateY: p.isPaper ? [0, 180, 360] : 0,
                  rotateZ: p.isPaper ? [0, p.moveX === "120vw" ? 90 : -90] : 0
                }}
                transition={{ 
                  duration: p.duration, 
                  delay: p.delay, 
                  ease: "linear" 
                }}
                className={`absolute pointer-events-none ${p.isPaper ? 'bg-memory-light/80 shadow-sm rounded-sm' : 'bg-memory-light rounded-full blur-[1px]'}`}
                style={{ 
                  top: p.top, 
                  left: p.left, 
                  width: p.isPaper ? p.size * 1.2 : p.size, 
                  height: p.size 
                }}
              />
            ))}

            {/* Text Content */}
            <div className="relative z-10 text-center max-w-lg px-6 space-y-8">
              
              {/* First Line: Standard gentle fade in */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
              >
                <p className="font-serif italic text-2xl sm:text-3xl text-memory-light tracking-wide font-light drop-shadow-md">
                  The story isn't lost, {userName}.
                </p>
              </motion.div>

              {/* Second Line: Gentle pulse/shimmer effect */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 3.5, ease: "easeOut" }} 
              >
                <motion.p
                  animate={{ 
                    opacity: [0.75, 1, 0.75],
                    textShadow: [
                      "0px 0px 0px rgba(255,255,255,0)", 
                      "0px 0px 12px rgba(255,255,255,0.25)", 
                      "0px 0px 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="font-serif text-lg sm:text-xl text-memory-light tracking-wide font-light leading-relaxed drop-shadow-md"
                >
                  It is just scattered across the people who loved them. Let's bring it all together.
                </motion.p>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}