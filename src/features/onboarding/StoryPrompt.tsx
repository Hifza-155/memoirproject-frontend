'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Feather } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Component that types out each prompt line-by-line like an old pen
function HandwrittenPromptLine({ 
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
    }, 40); // Typing speed

    return () => clearInterval(interval);
  }, [isStarted, promptText]);

  if (!isStarted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => isComplete && onSelect(promptText)}
      className={`group p-3 rounded-xl border border-[#e5d9c5]/60 bg-white/70 backdrop-blur-xs transition-all duration-200 ${
        isComplete ? 'cursor-pointer hover:border-[#c9a063] hover:bg-[#fdf8ed] hover:shadow-xs' : 'cursor-default'
      }`}
    >
      <p className="text-xl font-['Caveat'] text-[#4a3525] flex items-center justify-between">
        <span>{displayedText}</span>
        {!isComplete ? (
          <span className="inline-block w-1.5 h-4 bg-[#c9a063] animate-pulse ml-2" />
        ) : (
          <span className="text-xs font-sans opacity-0 group-hover:opacity-60 text-[#c9a063] transition-opacity">
            Use →
          </span>
        )}
      </p>
    </motion.div>
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
  ];

  // 2-second pause between each sentence appearing on the left side
  useEffect(() => {
    if (currentPromptIndex < prompts.length - 1) {
      const currentTextLength = prompts[currentPromptIndex].length;
      const typingDuration = currentTextLength * 40;
      const pauseDuration = 2000; // 2 seconds wait

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
    <section className="min-h-screen bg-[#FAF8F5] text-[#381c24] flex flex-col items-center justify-center px-6 py-12 relative z-10 font-sans selection:bg-[#381c24] selection:text-white">
      
      {/* Import Caveat font stylesheet */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" 
        rel="stylesheet" 
      />

      {/* Main container widened for side-by-side layout */}
      <div className="w-full max-w-5xl">

        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-[#78716c] hover:text-[#381c24] text-[15px] font-medium transition inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={1.7} />
            <span>Back</span>
          </button>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT SIDE: Live Inspiration Unfolding (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-12"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 mb-2 text-xs uppercase tracking-widest font-bold text-[#381c24]/80">
                <Feather size={14} className="text-[#c9a063]" />
                <span>Whispers of Memory</span>
              </div>
              <h2 className="font-serif text-2xl text-[#381c24]">
                Ideas appearing as you reflect...
              </h2>
              <p className="text-sm font-serif italic text-[#78716c] mt-1">
                Click any line below to weave it directly into your writing.
              </p>
            </div>

            {/* Vertical list of typing prompts */}
            <div className="flex flex-col space-y-3 max-h-[420px] overflow-y-auto pr-2">
              {prompts.map((prompt, index) => (
                <HandwrittenPromptLine
                  key={prompt}
                  promptText={prompt}
                  isStarted={index <= currentPromptIndex}
                  onSelect={handlePromptClick}
                />
              ))}
            </div>
          </motion.div>


          {/* RIGHT SIDE: The Actual Paper Sheet & Input (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Heading */}
            <div className="mb-6">
              <h1 className="font-serif text-3xl md:text-4xl text-[#381c24] mb-2">
                Let&apos;s bring one memory to life.
              </h1>
              <p className="text-[#78716c] text-[15px] font-serif italic">
                Start with a moment that still stays with you.
              </p>
            </div>

            {/* Writing Area - Organic paper shape with folded corner */}
            <div className="relative overflow-visible rounded-[28px_12px_32px_22px] border-2 border-[#dfd1bc] bg-[linear-gradient(135deg,_#FFFDF9_0%,_#F8F3E9_100%)] shadow-[0_16px_45px_rgba(56,28,36,0.09)] transition-all duration-300 mb-8">

              {/* Physical Folded Dog-Ear Corner Effect at Top Right */}
              <div 
                className="absolute -top-[2px] -right-[2px] w-9 h-9 bg-gradient-to-bl from-[#E6DCCF] via-[#F3ECE1] to-[#D9CCBA] shadow-[-3px_3px_6px_rgba(0,0,0,0.08)] pointer-events-none rounded-bl-lg z-20"
                style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
              />

              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Write your one-line memory here..."
                rows={6}
                className="w-full resize-none bg-transparent px-8 py-8 text-[20px] leading-9 text-[#381c24] placeholder:text-[#a89f95]/60 outline-none font-['Caveat'] relative z-10"
              />

            </div>

            {/* Continue Button */}
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

      </div>
    </section>
  );
}