/**
 * @file hooks/useExportMemoir.ts
 * @description React hook for handling memoir PDF export requests, status polling, and direct browser attachment downloads.
 */

import { useState } from 'react';
import { api } from '@/lib/api/client';

export function useExportMemoir(memoirId: string) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const triggerExport = async (customFileName?: string) => {
    if (!memoirId) {
      setError("No active memoir found.");
      return;
    }

    setIsExporting(true);
    setError(null);
    setExportMessage('Preparing your printable memoir PDF...');

    try {
      // 1. Trigger the export job via the centralized api client object
      await api.requestMemoirExport(memoirId);
      setExportMessage('Formatting book layout in the background...');

      // 2. Poll for job completion
      let attempts = 0;
      const maxAttempts = 15;

      const pollInterval = setInterval(async () => {
        attempts++;
        try {
          // Use centralized api method for status polling (handles auth headers automatically)
          const data = await api.getLatestExportStatus(memoirId);

          if (data.status === 'ready' && data.download_url) {
            clearInterval(pollInterval);
            setIsExporting(false);
            setExportMessage('PDF downloaded successfully! Check your downloads folder.');

            const fileName = customFileName?.trim() ? `${customFileName.trim()}.pdf` : 'my-memoir-archive.pdf';
            const hasQueryParams = data.download_url.includes('?');
            const finalUrl = `${data.download_url}${hasQueryParams ? '&' : '?'}download=${encodeURIComponent(fileName)}`;

            // BULLETPROOF DOWNLOAD TRIGGER: Hidden Iframe
            // This safely bypasses Next.js router rules, CORS, and popup blockers.
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = finalUrl;
            document.body.appendChild(iframe);

            // Clean up the iframe after the download has safely started
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 10000);

          } else if (data.status === 'failed') {
            clearInterval(pollInterval);
            setIsExporting(false);
            setError(`Export failed: ${data.error_message || 'Unknown error'}`);
            setExportMessage(null);
          } else if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
            setIsExporting(false);
            setError('Export timed out. Please try again.');
            setExportMessage(null);
          }
        } catch (pollErr) {
          console.error("Polling error:", pollErr);
        }
      }, 2000);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during export.';
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