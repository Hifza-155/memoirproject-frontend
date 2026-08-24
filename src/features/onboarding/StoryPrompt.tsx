'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Feather } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
      className={`text-xl font-['Caveat'] text-[#4a3525] transition-all duration-200 hover:text-[#c9a063] flex items-center gap-1 py-1 px-1.5 ${
        isComplete ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <span>{displayedText}</span>
      {!isComplete && (
        <span className="inline-block w-1.5 h-4 bg-[#c9a063] animate-pulse" />
      )}
    </motion.button>
  );
}

export default function StoryPrompt() {
  const router = useRouter();
  const [story, setStory] = useState('');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const prompts = [
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

  useEffect(() => {
    if (currentPromptIndex < prompts.length - 1) {
      const currentTextLength = prompts[currentPromptIndex].length;
      const typingDuration = currentTextLength * 40;
      const pauseDuration = 2000;

      const timer = setTimeout(() => {
        setCurrentPromptIndex((prev) => prev + 1);
      }, typingDuration + pauseDuration);

      return () => clearTimeout(timer);
    }
  }, [currentPromptIndex, prompts]);

  const handlePromptClick = (prompt: string) => {
    setStory((current) => {
      if (current.trim()) {
        return `${current}\n\n${prompt}: `;
      }
      return `${prompt}: `;
    });
  };

  return (
    <section className="min-h-screen bg-[#FAF8F5] text-[#381c24] flex flex-col items-center justify-center px-6 py-16 relative z-10 font-sans selection:bg-[#381c24] selection:text-white">
      
      {/* Import Caveat font stylesheet */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" 
        rel="stylesheet" 
      />

      {/* Main content wrapper */}
      <div className="w-full max-w-4xl flex flex-col">

        {/* Back */}
        <div className="w-full mb-8 flex justify-start">
          <button
            onClick={() => router.back()}
            className="text-[#78716c] hover:text-[#381c24] text-[15px] font-medium transition inline-flex items-center gap-1 cursor-pointer"
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
          <h1 className="font-serif text-3xl md:text-4xl text-[#381c24] mb-3">
            Let&apos;s bring one memory to life.
          </h1>

          <p className="text-[#78716c] text-[15px] md:text-base leading-relaxed font-serif italic">
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
              {/* Container styled with white background and horizontal ruled lines */}
              <div 
                className="relative w-full rounded-[2px_12px_4px_16px] border border-[#d6c7ab] bg-white shadow-[0_12px_35px_rgba(56,28,36,0.08)] transition-transform duration-300 hover:rotate-0"
                style={{
                  transform: 'rotate(-0.8deg)',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 35px, #f2e9d8 35px, #f2e9d8 36px)',
                  backgroundPositionY: '12px'
                }}
              >
                <textarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Write your one-line memory here..."
                  rows={6}
                  className="w-full resize-none bg-transparent px-7 py-7 text-[20px] leading-[36px] text-[#381c24] placeholder:text-[#b5a38a]/70 outline-none font-['Caveat'] relative z-10"
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
                    ? 'bg-[#381c24] text-white hover:bg-[#4a222a] shadow-[#381c24]/15'
                    : 'bg-[#f0e4d3]/70 text-[#78716c] cursor-not-allowed shadow-none'
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
            <div className="inline-flex items-center gap-1.5 mb-4 text-xs uppercase tracking-widest font-bold text-[#381c24]/80">
              <Feather size={14} className="text-[#c9a063]" />
              <span>Need a little inspiration?</span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 min-h-[220px] items-center">
              {prompts.map((prompt, index) => (
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