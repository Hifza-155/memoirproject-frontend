/**
 * @file StoryPrompt.tsx
 * @description Component rendering the story prompt writing interface with animated typewriter hints,
 * refactored to move static prompt data outside the component to satisfy React hook dependency rules.
 */

'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Feather } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Defined outside the component to provide a stable reference across renders
const PROMPTS = [
  'A moment that still makes me smile',
  'Something they used to say',
  'A place I remember',
  'A little thing I miss',
  'A song we used to share',
  'The warmth of their laughter',
  'A lesson they left behind',
  'Quiet afternoons together',
  'Their favorite cup or sweater',
];

// Component that types out each prompt character-by-character in Caveat handwriting font
function HandwrittenPromptItem({ 
  promptText, 
  isStarted, 
  onSelect 
}: { 
  promptText: string; 
  isStarted: boolean; 
  onSelect: (text: string) => void;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isStarted) return;
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= promptText.length) {
        setDisplayedText(promptText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isStarted, promptText]);

  if (!isStarted) return null;

  return (
    <motion.button
      type="button"
      onClick={() => isComplete && onSelect(promptText)}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isComplete ? { scale: 1.02, x: 2 } : {}}
      whileTap={isComplete ? { scale: 0.98 } : {}}
      className={`text-xl font-caveat text-memory-primary/90 transition-all duration-200 hover:text-memory-accent flex items-center gap-1 py-1 px-1.5 ${
        isComplete ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <span>{displayedText}</span>
      {!isComplete && (
        <span className="inline-block w-1.5 h-4 bg-memory-accent animate-pulse" />
      )}
    </motion.button>
  );
}

export default function StoryPrompt() {
  const router = useRouter();
  const [story, setStory] = useState('');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    if (currentPromptIndex < PROMPTS.length - 1) {
      const currentTextLength = PROMPTS[currentPromptIndex].length;
      const typingDuration = currentTextLength * 40;
      const pauseDuration = 2000;

      const timer = setTimeout(() => {
        setCurrentPromptIndex((prev) => prev + 1);
      }, typingDuration + pauseDuration);

      return () => clearTimeout(timer);
    }
  }, [currentPromptIndex]);

  const handlePromptClick = (prompt: string) => {
    setStory((current) => {
      if (current.trim()) {
        return `${current}\n\n${prompt}: `;
      }
      return `${prompt}: `;
    });
  };

  return (
    <section className="min-h-screen bg-memory-bg text-memory-primary flex flex-col items-center justify-center px-6 py-16 relative z-10 font-sans selection:bg-memory-primary selection:text-white">
      
      {/* Main content wrapper */}
      <div className="w-full max-w-4xl flex flex-col">

        {/* Back */}
        <div className="w-full mb-8 flex justify-start">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-memory-muted hover:text-memory-primary text-[15px] font-medium transition inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={1.7} />
          </button>
        </div>

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center md:text-left mb-10 w-full"
        >
          <h1 className="font-serif text-3xl md:text-4xl text-memory-primary mb-3">
            Let&apos;s bring one memory to life.
          </h1>

          <p className="text-memory-muted text-[15px] md:text-base leading-relaxed font-serif italic">
            Start with a moment that still stays with you.
          </p>
        </motion.div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start w-full">

          {/* LEFT SIDE: Lined White Notepad Paper Effect */}
          <div className="flex flex-col w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="w-full mb-6"
            >
              <div 
                className="relative w-full rounded-[2px_12px_4px_16px] border border-memory-border bg-white shadow-[0_12px_35px_rgba(56,28,36,0.08)] transition-transform duration-300 hover:rotate-0"
                style={{
                  transform: 'rotate(-0.8deg)',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 35px, var(--memory-border) 35px, var(--memory-border) 36px)',
                  backgroundPositionY: '12px'
                }}
              >
                <textarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Write your one-line memory here..."
                  rows={6}
                  className="w-full resize-none bg-transparent px-7 py-7 text-[20px] leading-9 text-memory-primary placeholder:text-memory-muted/70 outline-none font-caveat relative z-10"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              <motion.button
                type="button"
                onClick={() => router.push('/memory-moment')}
                disabled={!story.trim()}
                whileHover={story.trim() ? { scale: 1.01 } : {}}
                whileTap={story.trim() ? { scale: 0.99 } : {}}
                className={`w-full py-4 rounded-2xl text-[16px] font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  story.trim()
                    ? 'bg-memory-primary text-white hover:bg-memory-maroon shadow-memory-primary/15'
                    : 'bg-memory-border/70 text-memory-muted cursor-not-allowed shadow-none'
                }`}
              >
                Continue
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Animated Handwritten Sentences */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="w-full flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="inline-flex items-center gap-1.5 mb-4 text-xs uppercase tracking-widest font-bold text-memory-primary/80">
              <Feather size={14} className="text-memory-accent" />
              <span>Need a little inspiration?</span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 min-h-55 items-center">
              {PROMPTS.map((prompt, index) => (
                <HandwrittenPromptItem
                  key={prompt}
                  promptText={prompt}
                  isStarted={index <= currentPromptIndex}
                  onSelect={handlePromptClick}
                />
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}