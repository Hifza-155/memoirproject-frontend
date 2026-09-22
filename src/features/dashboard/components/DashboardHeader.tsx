"use client";

import { HeaderTitleSection } from "./HeaderTitleSection";
import { HeaderActionsSection } from "./HeaderActionsSection";

interface DashboardHeaderProps {
  name: string;
  setName: (name: string) => void;
  dates: string;
  setDates: (dates: string) => void;
  handleCopyLink: () => void;
  isLinkCopied: boolean;
  pdfFileName: string;
  setPdfFileName: (val: string) => void;
  triggerExport: (name: string) => void;
  isExporting: boolean;
}

export function DashboardHeader({
  name, 
  setName, 
  dates, 
  setDates, 
  handleCopyLink, 
  isLinkCopied,
  pdfFileName,
  setPdfFileName,
  triggerExport,
  isExporting
}: DashboardHeaderProps) {
  return (
    <>
      <header className="w-full border-b border-stone-400/80 bg-memory-bg/80 backdrop-blur-sm px-8 py-5 flex items-center justify-between sticky top-0 z-30">
        <HeaderTitleSection 
          name={name} 
          setName={setName} 
          dates={dates} 
          setDates={setDates} 
        />
        <HeaderActionsSection 
          handleCopyLink={handleCopyLink}
          isLinkCopied={isLinkCopied}
          pdfFileName={pdfFileName}
          setPdfFileName={setPdfFileName}
          triggerExport={triggerExport}
          isExporting={isExporting}
        />
      </header>

      <div className="w-full flex items-center justify-center py-2 px-12">
        <div className="w-full h-0.5 bg-stone-500 animate-smooth-pulse rounded-full"></div>
      </div>
    </>
  );
}