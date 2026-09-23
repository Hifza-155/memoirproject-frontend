"use client";

import { useState } from "react";
import { api } from "@/lib/api/client";

export function useExportMemoir(memoirId: string) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const triggerExport = async (customFileName?: string) => {
    setIsExporting(true);
    setError(null);
    setExportMessage("Preparing your printable memoir PDF...");

    try {
      let currentMemoirId = memoirId;

      if (!currentMemoirId) {
        const memoirResponse = await api.getMyMemoir();

        currentMemoirId =
          memoirResponse?.data?.id ||
          memoirResponse?.id ||
          "";
      }

      if (!currentMemoirId) {
        throw new Error("No active memoir found.");
      }

      await api.requestMemoirExport(currentMemoirId);

      setExportMessage("Formatting book layout in the background...");

      let attempts = 0;
      const maxAttempts = 15;

      const pollInterval = setInterval(async () => {
        attempts++;

        try {
          const data = await api.getLatestExportStatus(currentMemoirId);

          if (data.status === "ready" && data.download_url) {
            clearInterval(pollInterval);

            setIsExporting(false);
            setExportMessage(
              "PDF downloaded successfully! Check your downloads folder."
            );

            const fileResponse = await fetch(data.download_url);
            const blob = await fileResponse.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;

            const fileName = customFileName?.trim()
              ? `${customFileName.trim()}.pdf`
              : "my-memoir-archive.pdf";

            link.download = fileName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);
          } else if (data.status === "failed") {
            clearInterval(pollInterval);

            setIsExporting(false);
            setError(
              `Export failed: ${
                data.error_message || "Unknown error"
              }`
            );
            setExportMessage(null);
          } else if (attempts >= maxAttempts) {
            clearInterval(pollInterval);

            setIsExporting(false);
            setError("Export timed out. Please try again.");
            setExportMessage(null);
          }
        } catch (pollErr) {
          console.error("Polling error:", pollErr);
        }
      }, 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during export.";

      setError(errorMessage);
      setExportMessage(null);
      setIsExporting(false);
    }
  };

  return {
    triggerExport,
    isExporting,
    exportMessage,
    error,
  };
}