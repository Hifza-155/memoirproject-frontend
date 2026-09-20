import React from "react";
import { Document } from "@react-pdf/renderer";

import MemoirPDFCover from "./MemoirPDFCover";
import MemoirPDFTableOfContents from "./MemoirPDFTableOfContents";
import MemoirPDFWrittenMemory from "./MemoirPDFWrittenMemory";
import MemoirPDFVoiceMemory from "./MemoirPDFVoiceMemory";
import MemoirPDFMediaMemory from "./MemoirPDFMediaMemory";
import MemoirPDFEnding from "./MemoirPDFEnding";
import { memoirPDFData } from "./memoir-pdf-data";

export default function MemoirPDFDocument() {
  const { memoirTitle, personName, years, chapters } = memoirPDFData;

  const tocItems: { title: string; page: number }[] = [];

  let currentPage = 3;

  chapters.forEach((chapter) => {
    tocItems.push({
      title: chapter.title,
      page: currentPage,
    });

    currentPage += 1;
  });

  return (
    <Document>
      {/* Page 1 — Cover */}
      <MemoirPDFCover
        memoirTitle={memoirTitle}
        personName={personName}
        years={years}
      />

      {/* Page 2 — Table of Contents */}
      <MemoirPDFTableOfContents items={tocItems} />

      {/* Memoir Chapters */}
      {chapters.map((chapter) => {
        const writtenMemories = chapter.memories.filter(
          (memory) => memory.type === "written"
        );

        const voiceMemories = chapter.memories.filter(
          (memory) => memory.type === "voice"
        );

        const mediaMemories = chapter.memories.filter(
          (memory) => memory.type === "media"
        );

        return (
          <React.Fragment key={chapter.id}>
            {/* Written Memories */}
            {writtenMemories.length > 0 && (
              <MemoirPDFWrittenMemory
                title={chapter.title}
                memories={writtenMemories}
              />
            )}

            {/* Voice Memories */}
            {voiceMemories.length > 0 && (
              <MemoirPDFVoiceMemory
                title={chapter.title}
                memories={voiceMemories}
              />
            )}

            {/* Media Memories */}
            {mediaMemories.length > 0 && (
              <MemoirPDFMediaMemory
                title={chapter.title}
                memories={mediaMemories}
              />
            )}
          </React.Fragment>
        );
      })}

      {/* Final Ending Page */}
      <MemoirPDFEnding
        personName={personName}
        years={years}
      />
    </Document>
  );
}