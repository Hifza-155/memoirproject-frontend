import React, { useState, useEffect } from "react";

interface MemoirHeaderProps {
  isVisible: boolean;
}

export default function MemoirHeader({ isVisible }: MemoirHeaderProps) {
  const [typedQuote, setTypedQuote] = useState("");
  const fullQuote = "“What we have once enjoyed deeply we can never lose. All that we love deeply becomes a part of us.” — Helen Keller";

  useEffect(() => {
    let currentString = "";
    let currentIndex = 0;
    const initTyping = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex < fullQuote.length) {
          currentString += fullQuote[currentIndex];
          setTypedQuote(currentString);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 65); 
      return () => clearInterval(typeInterval);
    }, 1200);
    return () => clearTimeout(initTyping);
  }, []);

  return (
    <header 
      className={`fixed top-0 inset-x-0 h-24 bg-gradient-to-r from-memory-dark-end via-[#240d14] to-memory-dark-end text-white backdrop-blur-md border-b border-memory-maroon/60 z-50 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] flex flex-col justify-between shadow-xl group/header ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 h-full">
        <div className="w-full max-w-4xl flex justify-center items-center">
          <span className="text-white/90 italic text-lg md:text-[19px] font-serif leading-relaxed text-center">
            {typedQuote}
            <span className={typedQuote.length < fullQuote.length ? "cursor-blink font-sans" : "hidden"}></span>
          </span>
        </div>
      </div>
      <div className="relative w-full flex justify-center pointer-events-none">
        <div className="absolute -top-1 w-48 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        <div className="absolute top-0 flex items-center gap-1 transition-transform duration-300 group-hover/header:translate-y-1">
          <div className="w-3 h-3 bg-memory-maroon border border-white/20 [clip-path:polygon(0_0,100_0,50_100%)] shadow-sm"></div>
          <div className="w-2.5 h-4 bg-white/90 border border-memory-maroon/20 [clip-path:polygon(0_0,100_0,50_100%)] shadow-sm -mt-1"></div>
        </div>
      </div>
    </header>
  );
}