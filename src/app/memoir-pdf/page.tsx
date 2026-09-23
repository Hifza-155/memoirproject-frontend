"use client";

import dynamic from "next/dynamic";

const MemoirPDFViewer = dynamic(
  () => import("../../features/MemoirPDF/MemoirPDFViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-[#FBF8F1]">
        <p className="text-sm tracking-wide text-[#80612F]">
          Preparing your memoir...
        </p>
      </div>
    ),
  }
);

export default function MemoirPDFPage() {
  return (
    <main className="min-h-screen bg-[#EDE6DE] p-4 sm:p-6">
      <div className="mx-auto h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-xl bg-white shadow-lg sm:h-[calc(100vh-3rem)]">
        <MemoirPDFViewer />
      </div>
    </main>
  );
}