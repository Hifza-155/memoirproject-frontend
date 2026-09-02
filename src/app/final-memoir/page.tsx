"use client";

import React, { useState } from "react";
import MemoirLayout from "../../features/FinalMemoir/MemoirLayout";
import MemoryCard from "../../features/FinalMemoir/MemoryCard";

const saraMemory = {
  id: "mem-sara-1",
  author: "Sara",
  relation: "Daughter",
  text: "Dad always woke up before the sun. He claimed it was to get a head start on the day, but I think he just liked the quiet before the house woke up.",
  imageUrl: "/api/placeholder/800/600",
  imageCaption: "In the garden, summer of '94",
  reactionsCount: 5,
  memoryType: "written" as const,
};

const audioMemory = {
  id: "mem-audio-1",
  author: "Michael",
  relation: "Son",
  text: "I still remember those early mornings. Dad would wake up before everyone else and sit quietly with his coffee. Those were simple moments, but they are some of the memories I miss the most.",
  reactionsCount: 5,
  memoryType: "audio" as const,
  audioUrl: "",
  audioDuration: "0:42",
};

const mediaMemory = {
  id: "mem-media-1",
  author: "Emma",
  relation: "Granddaughter",
  text: "A beautiful family moment that we will always remember.",
  imageUrl: "/api/placeholder/800/600",
  imageCaption: "A special family moment",
  reactionsCount: 3,
  memoryType: "media" as const,
};

const pages = [
  {
    title: "Written Memory",
    memory: saraMemory,
  },
  {
    title: "Audio Memory",
    memory: audioMemory,
  },
  {
    title: "Media Memory",
    memory: mediaMemory,
  },
];

export default function FinalMemoirPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentMemory = pages[currentPage].memory;

  return (
    <MemoirLayout>
      <div className="w-full py-8">
        {/* PAGE TITLE */}
        <div className="mb-6 text-center">
          <p className="mb-1 text-xs uppercase tracking-[0.25em] text-memory-muted">
            {pages[currentPage].title}
          </p>

          <div className="mx-auto h-px w-16 bg-memory-maroon/30" />
        </div>

        {/* SINGLE MEMORY PAGE */}
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative w-full">
            {/* subtle paper stack */}
            <div className="absolute inset-x-2 top-2 bottom-[-4px] rounded-sm border border-memory-maroon/10 bg-[#faf8f3]" />

            <div className="relative z-10">
              <MemoryCard {...currentMemory} />
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="mt-8 flex items-center justify-between">
            {/* PREVIOUS */}
            <button
              type="button"
              onClick={previousPage}
              disabled={currentPage === 0}
              className={`flex items-center gap-2 text-sm transition ${
                currentPage === 0
                  ? "cursor-not-allowed opacity-30"
                  : "text-memory-maroon hover:-translate-x-1"
              }`}
            >
              <span className="text-lg">←</span>
              <span>Previous</span>
            </button>

            {/* PAGE INDICATORS */}
            <div className="flex items-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                  className={`rounded-full transition-all ${
                    index === currentPage
                      ? "h-2 w-7 bg-memory-maroon"
                      : "h-2 w-2 bg-memory-maroon/20 hover:bg-memory-maroon/40"
                  }`}
                />
              ))}
            </div>

            {/* NEXT */}
            <button
              type="button"
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className={`flex items-center gap-2 text-sm transition ${
                currentPage === pages.length - 1
                  ? "cursor-not-allowed opacity-30"
                  : "text-memory-maroon hover:translate-x-1"
              }`}
            >
              <span>Next</span>
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* PAGE NUMBER */}
          <div className="mt-3 text-center">
            <span className="text-xs tracking-[0.2em] text-memory-muted">
              {currentPage + 1} / {pages.length}
            </span>
          </div>
        </div>
      </div>
    </MemoirLayout>
  );
}