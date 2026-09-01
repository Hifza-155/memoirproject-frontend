"use client";

import React from 'react';
import MemoirLayout from "../../features/FinalMemoir/MemoirLayout";
import MemoryCard from "../../features/FinalMemoir/MemoryCard";

// --- FOCUSED MOCK DATA ---
const saraMemory = {
  id: "mem-sara-1",
  author: "Sara",
  relation: "Daughter",
  text: "Dad always woke up before the sun. He claimed it was to get a head start on the day, but I think he just liked the quiet before the house woke up.",
  imageUrl: "/api/placeholder/800/600",
  imageCaption: "In the garden, summer of '94",
  reactionsCount: 5,
};

export default function FinalMemoirPage() {
  return (
    <MemoirLayout>
      <div className="py-8">
        <MemoryCard 
          id={saraMemory.id}
          author={saraMemory.author}
          relation={saraMemory.relation}
          text={saraMemory.text}
          imageUrl={saraMemory.imageUrl}
          imageCaption={saraMemory.imageCaption}
          reactionsCount={saraMemory.reactionsCount}
        />
      </div>
    </MemoirLayout>
  );
}