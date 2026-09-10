/**
 * @file useComments.ts
 * @description Custom React hook for managing comment state and submissions.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { api, CommentEntity } from "@/lib/api/client";

export function useComments(memoryId: string, memoirId: string) {
  const [comments, setComments] = useState<CommentEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    if (!memoryId) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const data = await api.getComments(memoryId);
      setComments(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error loading comments";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [memoryId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadComments();
  }, [loadComments]);

  const addComment = async (body: string,parentCommentId?: string) => {
    if (!body.trim()) return;

    if (!memoirId) {
      setError("Memoir ID is missing.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Payload only requires memoir details and body text. 
      const payload = {
        memoir_id: memoirId,
        memory_id: memoryId,
        media_asset_id: null,
        parent_comment_id: parentCommentId || null, // Passes parent ID if replying
        body: body.trim(),
      };

      //This calling function in client.ts
      const newComment = await api.createComment(payload);

      setComments((prev) => [...prev, newComment]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit comment";
      setError(errorMessage);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    comments,
    loading,
    submitting,
    error,
    addComment,
    refreshComments: loadComments,
  };
}