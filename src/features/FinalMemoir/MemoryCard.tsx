/**
 * @file MemoryCard.tsx
 * @description Renders a family memory with archival styling, clean fluid 
 * comment threads (no separating lines), and nested replies.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useComments } from "@/features/comments/useComments";

export interface MemoryProps {
  id: string;
  memoirId: string;
  currentParticipantId?: string;
  author: string;
  relation: string;
  text: string;
  reactionsCount: number;
  imageUrl?: string;
  imageCaption?: string;
  audioDuration?: string;
}

export default function MemoryCard({
  id,
  memoirId,
  author,
  relation,
  text,
  imageUrl,
  imageCaption,
  reactionsCount,
}: MemoryProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});

  const { comments, loading, submitting, error, addComment } = useComments(
    id,
    memoirId,
  );

  const totalCommentsCount = comments.length;

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || submitting) return;

    try {
      await addComment(newCommentText);
      setNewCommentText(""); 
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleAddReply = async (commentId: string) => {
    if (!replyText.trim()) return;

    try {
      await addComment(replyText, commentId);
      setReplyText("");
      setReplyingTo(null);
      setExpandedReplies((prev) => ({ ...prev, [commentId]: true }));
    } catch (err) {
      console.error("Failed to post reply to database:", err);
    }
  };

  // Filter top-level comments and helper for child replies
  const topLevelComments = comments.filter((c) => !c.parent_comment_id);
  const getCommentReplies = (commentId: string) => {
    return comments.filter((c) => c.parent_comment_id === commentId);
  };

  return (
    <article
      className="relative group flex flex-col mb-16 max-w-4xl bg-white rounded-sm p-6 md:p-8 shadow-[0_8px_30px_rgb(90,24,39,0.04)] transition-all duration-300"
      style={{
        borderTop: "2px solid rgba(90, 24, 39, 0.5)",
        borderLeft: "1px solid rgba(90, 24, 39, 0.3)",
        borderRight: "1px solid rgba(90, 24, 39, 0.2)",
        borderBottom: "3px solid rgba(90, 24, 39, 0.6)",
      }}
    >
      {/* Invisible anchor */}
      <div id={`memory-${id}`} className="absolute -top-24" />

      {/* METADATA HEADER */}
      <header className="flex items-baseline justify-between mb-3">
        <div>
          <h4 className="text-xl font-sans font-semibold text-stone-900 tracking-tight">
            {author}
          </h4>
          <p className="text-xs font-sans uppercase tracking-widest text-stone-400 mt-0.5">
            {relation}
          </p>
        </div>
      </header>

      {/* ARCHIVAL DIVIDER */}
      <div className="w-full flex flex-col gap-0.5 my-3">
        <div className="w-full h-px bg-memory-maroon/30"></div>
        <div className="w-full h-[0.5px] bg-memory-maroon/10"></div>
      </div>

      {/* SIDE-BY-SIDE GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-4">
        {/* EDITORIAL TEXT FRAME */}
        <div className="lg:col-span-7 relative p-6 bg-stone-50/50 rounded-sm border border-stone-200/60 shadow-[inset_0_0_0_1px_rgba(90,24,39,0.04)]">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-memory-maroon/30 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-memory-maroon/30 pointer-events-none"></div>

          <span className="absolute -top-3 left-2 text-6xl font-serif text-memory-maroon/30 select-none pointer-events-none leading-none">
            “
          </span>

          <div className="relative z-10 prose prose-stone leading-relaxed text-stone-800 font-serif pt-1 px-1 text-base">
            <p>{text}</p>
          </div>

          <span className="absolute -bottom-8 right-2 text-6xl font-serif text-memory-maroon/30 select-none pointer-events-none leading-none">
            ”
          </span>
        </div>

        {/* CONTEXTUAL PHOTOGRAPHY */}
        {imageUrl && (
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="hidden lg:block absolute -left-3 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-memory-maroon/20 to-transparent"></div>

            <figure className="w-56 sm:w-64 bg-white p-2.5 shadow-sm border border-stone-200 transform rotate-1 transition-transform hover:rotate-0 duration-300">
              <div className="relative w-full aspect-4/3 overflow-hidden bg-stone-100">
                <Image
                  src={imageUrl}
                  alt={imageCaption || "Family memory"}
                  fill
                  className="object-cover"
                />
              </div>
              {imageCaption && (
                <figcaption className="pt-2.5 pb-0.5 text-sm font-caveat text-stone-600 text-center">
                  {imageCaption}
                </figcaption>
              )}
            </figure>
          </div>
        )}
      </div>

      {/* REACTIONS & COMMENTS TOGGLE BAR */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setHasReacted(!hasReacted)}
          className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
            hasReacted
              ? "text-memory-maroon font-semibold"
              : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill={hasReacted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
          I remember this too
          <span className="ml-1 px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded-full text-[10px]">
            {reactionsCount + (hasReacted ? 1 : 0)}
          </span>
        </button>

        {/* Dropdown Toggle Button for Comments */}
        <button
          type="button"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className="flex items-center gap-1.5 text-xs font-sans font-medium text-stone-500 hover:text-memory-maroon transition-colors py-1 px-2.5 rounded-sm hover:bg-stone-50 cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {isCommentsOpen
            ? "Hide family notes"
            : `View family notes (${totalCommentsCount})`}
          <svg
            className={`w-3 h-3 transition-transform duration-300 ml-0.5 ${isCommentsOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* COLLAPSIBLE COMMENTS STREAM */}
      {isCommentsOpen && (
        <div className="mt-6 pt-6 border-t border-stone-200/60 space-y-6 animate-fadeIn">
          <h5 className="text-xs font-serif uppercase tracking-widest text-memory-maroon font-semibold">
            Family Comments
          </h5>

          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-sm text-xs font-sans">
              {error}
            </div>
          )}

          {/* Comment List (Fluid spacing, no separating lines) */}
          <div className="space-y-6">
            {loading ? (
              <p className="text-xs text-stone-400 italic font-sans">
                Loading comments...
              </p>
            ) : topLevelComments.length === 0 ? (
              <p className="text-xs text-stone-400 italic font-sans">
                No family notes yet. Be the first to share a thought!
              </p>
            ) : (
              topLevelComments.map((comment) => {
                const replies = getCommentReplies(comment.id);
                const isExpanded = expandedReplies[comment.id];
                const isReplyingHere = replyingTo === comment.id;

                return (
                  <div key={comment.id} className="comment-thread space-y-2">
                    {/* --- Parent Comment Box (Archival Styled) --- */}
                    <div className="p-3 bg-stone-50/70 rounded-sm border border-stone-200/60 shadow-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-sans font-semibold text-xs uppercase tracking-wider text-stone-900">
                          {comment.author_name || "Family Member"}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {new Date(comment.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-stone-700 font-sans text-xs mt-1.5 leading-relaxed whitespace-pre-wrap">
                        {comment.body}
                      </p>
                      
                      {/* Reply Action Trigger Button */}
                      <button 
                        type="button"
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} 
                        className="text-xs text-memory-maroon font-semibold mt-2.5 hover:underline cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>

                    {/* --- Toggle Button for Replies (if any exist) --- */}
                    {replies.length > 0 && (
                      <button 
                        type="button"
                        onClick={() => toggleReplies(comment.id)}
                        className="text-xs text-stone-500 font-medium mt-1 ml-4 hover:text-memory-maroon flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <span className="w-2 h-px bg-stone-300 inline-block"></span>
                        {isExpanded ? `Hide replies` : `View replies (${replies.length})`}
                      </button>
                    )}

                    {/* --- Nested Replies Container (Shown when expanded) --- */}
                    {isExpanded && replies.length > 0 && (
                      <div className="ml-6 mt-2 space-y-2.5 border-l-2 border-memory-maroon/20 pl-4">
                        {replies.map((reply) => (
                          <div key={reply.id} className="p-2.5 bg-stone-50/40 rounded-sm border border-stone-200/40">
                            <div className="flex justify-between items-center">
                              <span className="font-sans font-semibold text-xs uppercase tracking-wider text-stone-900">
                                {reply.author_name || "Family Member"}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {new Date(reply.created_at).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-stone-700 font-sans text-xs mt-1 leading-relaxed whitespace-pre-wrap">
                              {reply.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* --- Inline Reply Input Box --- */}
                    {isReplyingHere && (
                      <div className="ml-6 mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Reply to ${comment.author_name || "Family Member"}...`}
                          className="flex-1 text-xs border border-stone-200 rounded-sm px-3 py-1.5 bg-stone-50 text-stone-900 outline-none focus:border-memory-maroon transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddReply(comment.id)}
                          className="bg-memory-maroon text-white text-xs px-3 py-1.5 rounded-sm hover:bg-memory-maroon/90 transition-colors cursor-pointer"
                        >
                          Post
                        </button>
                        <button
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="text-stone-500 text-xs px-2 py-1.5 hover:text-stone-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Main Comment Input Form */}
          <form
            onSubmit={handleAddComment}
            className="flex items-center gap-2 pt-2"
          >
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add a comment to this memory..."
              disabled={submitting}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-sm px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-memory-maroon transition-colors"
            />
            <button
              type="submit"
              disabled={submitting || !newCommentText.trim()}
              className="px-4 py-2 bg-memory-maroon text-white text-xs font-medium rounded-sm disabled:opacity-50 hover:bg-memory-maroon/90 transition-colors cursor-pointer"
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      )}
    </article>
  );
}