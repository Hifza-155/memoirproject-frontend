/**
 * @file SmallPersonalContext.tsx
 * @description Component rendering the interactive auto-flipping album and detail inscription form,
 */

'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function SmallPersonalContext() {
  const router = useRouter();
  
  const options = [
    { id: 'mother', label: 'Mother', description: 'The gentle heart that raised me.' },
    { id: 'father', label: 'Father', description: 'The steady hand and guiding light.' },
    { id: 'sibling', label: 'A sibling', description: 'A lifelong bond of shared secrets and years.' },
    { id: 'friend', label: 'A dear friend', description: 'A chosen soul who walked beside me.' },
    { id: 'other', label: 'Someone special', description: 'Someone whose story means everything to me.' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScattered, setIsScattered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [step, setStep] = useState<'flipping' | 'details'>('flipping');
  const [isPaused, setIsPaused] = useState(false);

  // Inscription form state
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [dod, setDod] = useState('');
  const [isAlive, setIsAlive] = useState(true);

  const currentItem = options[currentIndex];

  // Automatic page-turning timer for the initial full cycle
  useEffect(() => {
    if (step !== 'flipping' || isPaused || isScattered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= options.length) {
          setIsScattered(true);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [step, isPaused, isScattered, options.length]);

  const handleCardSelect = (id: string) => {
    setSelectedOption(id);
    setStep('details');
  };

  const handleFinalSubmit = () => {
    router.push('/handwritten-note');
  };

  const rotations = [-1.5, 2, -1, 1.5, -2];

  return (
    <section className="min-h-screen bg-memory-bg text-memory-primary flex flex-col items-center justify-center px-6 py-16 relative z-10 font-sans selection:bg-memory-primary selection:text-white">
      
      {/* Main content wrapper */}
      <div className="w-full max-w-175 flex flex-col items-center">

        {/* Back Button */}
        <div className="mb-6 w-full flex justify-start">
          <button
            type="button"
            onClick={() => {
              if (step === 'details') {
                setStep('flipping');
                setIsScattered(true);
              } else if (isScattered) {
                setIsScattered(false);
                setCurrentIndex(0);
              } else {
                router.back();
              }
            }}
            className="text-memory-muted hover:text-memory-primary text-[15px] font-medium transition inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={1.7} />
            <span>Back</span>
          </button>
        </div>

        {step === 'flipping' ? (
          <>
            {/* Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <h1 className="font-serif text-3xl md:text-4xl text-memory-primary mb-2">
                Who is this memory for?
              </h1>
              <p className="text-memory-muted text-[15px] italic font-serif">
                {!isScattered ? "Turning album pages..." : "Choose the heart of your story below."}
              </p>
            </motion.div>

            {!isScattered ? (
              /* Auto-Flipping Album Page View (Narrower & Tighter Portrait Proportions) */
              <div 
                className="w-full max-w-100 relative min-h-95 flex flex-col items-center justify-center mb-6"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full bg-memory-card border border-memory-border rounded-xl px-8 py-14 text-center shadow-[0_15px_40px_rgba(56,28,36,0.06)] relative cursor-pointer group flex flex-col justify-center min-h-95"
                    onClick={() => handleCardSelect(currentItem.id)}
                  >
                    {/* Page number badge */}
                    <span className="absolute top-5 right-6 text-memory-muted font-caveat text-xl">
                      Page {currentIndex + 1} of {options.length}
                    </span>

                    <h2 className="text-4xl sm:text-5xl font-caveat font-bold text-memory-primary mb-4 tracking-wide group-hover:text-memory-accent transition-colors">
                      {currentItem.label}
                    </h2>

                    <p className="font-caveat text-2xl sm:text-3xl text-memory-muted leading-relaxed max-w-75 mx-auto">
                      &ldquo;{currentItem.description}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                <p className="text-xs text-memory-muted mt-4 tracking-wider uppercase font-serif">
                  Hover to pause • Click page to select
                </p>
              </div>
            ) : (
              /* Scattered Album Pages View Across Screen (Narrower & Taller Cards) */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-140 grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8"
              >
                {options.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: rotations[index % rotations.length] }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardSelect(option.id)}
                    className="bg-memory-card border border-memory-border rounded-xl p-7 text-left shadow-[0_12px_35px_rgba(56,28,36,0.05)] cursor-pointer transition-all hover:border-memory-accent relative group flex flex-col justify-between min-h-50"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-3xl font-caveat font-bold text-memory-primary group-hover:text-memory-accent transition-colors">
                          {option.label}
                        </h2>
                        <span className="text-lg text-memory-muted font-caveat">
                          Select →
                        </span>
                      </div>

                      <p className="font-caveat text-2xl text-memory-muted leading-snug">
                        &ldquo;{option.description}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          /* DETAIL INSCRIPTION PAGE */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-135"
          >
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl text-memory-primary mb-2">
                Inscribed for <span className="font-caveat text-4xl text-memory-accent">{options.find(o => o.id === selectedOption)?.label}</span>
              </h1>
              <p className="text-memory-muted text-[15px] italic font-serif">
                Jot down a few simple details to keep their memory close.
              </p>
            </div>

            <div className="space-y-5 mb-8">
              {/* Name Input */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-memory-primary/70 mb-1.5">
                  Their Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Fatima Khan"
                  className="w-full px-5 py-3.5 bg-white border border-memory-border rounded-xl text-xl font-caveat text-memory-primary placeholder:text-memory-muted/50 outline-none focus:border-memory-accent shadow-2xs transition"
                />
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-memory-primary/70 mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="e.g., 14 June 1952"
                    className="w-full px-4 py-3.5 bg-white border border-memory-border rounded-xl text-base font-serif text-memory-primary placeholder:text-memory-muted/50 outline-none focus:border-memory-accent shadow-2xs transition"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs uppercase tracking-widest font-bold text-memory-primary/70">
                      Date of Passing
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-memory-muted cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isAlive}
                        onChange={(e) => {
                          setIsAlive(e.target.checked);
                          if (e.target.checked) setDod('');
                        }}
                        className="rounded border-memory-border text-memory-primary focus:ring-0 cursor-pointer"
                      />
                      Still with us
                    </label>
                  </div>
                  <input
                    type="text"
                    value={dod}
                    onChange={(e) => setDod(e.target.value)}
                    disabled={isAlive}
                    placeholder={isAlive ? "Living in our hearts" : "e.g., 12 October 2023"}
                    className={`w-full px-4 py-3.5 border border-memory-border rounded-xl text-base font-serif text-memory-primary placeholder:text-memory-muted/50 outline-none shadow-2xs transition ${
                      isAlive ? 'bg-memory-card opacity-60 cursor-not-allowed' : 'bg-white focus:border-memory-accent'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Final Submit Button */}
            <motion.button
              type="button"
              onClick={handleFinalSubmit}
              disabled={!name.trim()}
              whileHover={name.trim() ? { scale: 1.01 } : {}}
              whileTap={name.trim() ? { scale: 0.99 } : {}}
              className={`w-full py-4 rounded-xl text-[16px] font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                name.trim()
                  ? 'bg-memory-primary text-white hover:bg-memory-maroon shadow-memory-primary/10'
                  : 'bg-memory-border text-memory-muted cursor-not-allowed shadow-none'
              }`}
            >
              Continue to Memory
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
