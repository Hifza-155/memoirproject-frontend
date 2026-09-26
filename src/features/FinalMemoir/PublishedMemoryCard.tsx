"use client";

import React, { useState, useMemo } from "react";
import MemoryCard from "./MemoryCard";
import { useComments } from "@/features/comments/useComments"; 
import { MemoryItem } from "./types";
import { CommentEntity } from "@/lib/api/client";

interface RawMemoryNode {
  id: string;
  author?: string;
  author_name?: string;
  title?: string;
  text?: string;
  body_text?: string;
  ai_woven_text?: string;
  imageUrl?: string;
  mediaUrl?: string;
  image_url?: string;
  media_url?: string;
  imageCaption?: string;
  image_caption?: string;
  caption?: string;
  reactionsCount?: number;
  reactions_count?: number;
  chapter?: string;
  chapter_title?: string;
  chapter_id?: string;
  chapterSubtitle?: string;
  chapter_subtitle?: string;
  date?: string;
  occurred_start?: string;
}

interface PublishedMemoryCardProps {
  mem: RawMemoryNode;
  memoirId: string;
}

export default function PublishedMemoryCard({ mem, memoirId }: PublishedMemoryCardProps) {
  const memoryId = mem.id;
  const { comments, addComment } = useComments(memoryId, memoirId);
  
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [reaction, setReaction] = useState({ 
    count: mem.reactionsCount ?? mem.reactions_count ?? 0, 
    reacted: false 
  });

  // Map backend raw fields strictly to the MemoryItem interface expected by MemoryCard
  const formattedMemory: MemoryItem = useMemo(() => ({
    id: mem.id,
    author: mem.author || mem.author_name || "Family Member",
    title: mem.title || "",
    text: mem.text || mem.body_text || mem.ai_woven_text || "",
    imageUrl: mem.imageUrl || mem.mediaUrl || mem.image_url || mem.media_url || undefined,
    imageCaption: mem.imageCaption || mem.image_caption || mem.caption || undefined,
    reactionsCount: mem.reactionsCount ?? mem.reactions_count ?? 0,
    chapter: mem.chapter || mem.chapter_title || "Chapter",
    chapterSubtitle: mem.chapterSubtitle || mem.chapter_subtitle || "",
    date: mem.date || mem.occurred_start || "Archive Date",
  }), [mem]);

  // Strictly typed comment and reply nesting using CommentEntity
  const nestedComments = useMemo(() => {
    return comments
      .filter((c: CommentEntity) => !c.parent_comment_id)
      .map((parent: CommentEntity) => ({
        id: parent.id,
        author: parent.author_name || "Family Member",
        text: parent.body,
        time: new Date(parent.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        replies: comments
          .filter((child: CommentEntity) => child.parent_comment_id === parent.id)
          .map((child: CommentEntity) => ({
            id: child.id,
            author: child.author_name || "Family Member",
            text: child.body,
            time: new Date(child.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
          }))
      }));
  }, [comments]);

  const handleToggleReaction = () => {
    setReaction((prev) => ({
      count: prev.reacted ? prev.count - 1 : prev.count + 1,
      reacted: !prev.reacted
    }));
  };

  const handlePostComment = async () => {
    if (!commentInputValue.trim()) return;
    await addComment(commentInputValue);
    setCommentInputValue("");
  };

  const handlePostReply = async (commentId: string, text: string) => {
    if (!text.trim()) return;
    await addComment(text, commentId);
  };

  return (
    <MemoryCard 
      mem={formattedMemory}
      isHighlighted={false} 
      currentReaction={reaction}
      handleToggleReaction={handleToggleReaction}
      isCommentsOpen={isCommentsOpen}
      setOpenCommentsId={(id: string | null) => setIsCommentsOpen(id !== null)}
      commentsList={nestedComments}
      commentInputValue={commentInputValue}
      setCommentInputValue={setCommentInputValue}
      handlePostComment={handlePostComment}
      handlePostReply={handlePostReply}
    />
  );
}