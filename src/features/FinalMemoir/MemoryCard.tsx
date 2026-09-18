import React, { useState } from "react";
import { MemoryItem } from "./types";

interface ReplyItem {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface CommentItem {
  id: string;
  author: string;
  text: string;
  time: string;
  replies?: ReplyItem[];
}

interface MemoryCardProps {
  mem: MemoryItem;
  isHighlighted: boolean;
  currentReaction: { count: number; reacted: boolean };
  handleToggleReaction: (id: string) => void;
  isCommentsOpen: boolean;
  setOpenCommentsId: (id: string | null) => void;
  commentsList: CommentItem[];
  commentInputValue: string;
  setCommentInputValue: (val: string) => void;
  handlePostComment: (id: string) => void;
  handlePostReply?: (commentId: string, replyText: string) => void;
}

export default function MemoryCard({
  mem, isHighlighted, currentReaction, handleToggleReaction,
  isCommentsOpen, setOpenCommentsId, commentsList,
  commentInputValue, setCommentInputValue, handlePostComment,
  handlePostReply
}: MemoryCardProps) {
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);
  const [replyTextMap, setReplyTextMap] = useState<{ [commentId: string]: string }>({});

  const onReplySubmit = (commentId: string) => {
    const text = replyTextMap[commentId];
    if (!text || !text.trim()) return;
    if (handlePostReply) {
      handlePostReply(commentId, text.trim());
    }
    setReplyTextMap({ ...replyTextMap, [commentId]: "" });
    setActiveReplyCommentId(null);
  };

  return (
    <article className="relative group flex flex-col pt-1 pb-4 mb-2">
      <div className="relative book-text font-serif leading-[1.7] text-[15px] text-stone-800 w-full">
        
        {mem.text && mem.text.trim() !== "" ? (
          mem.text.split('\n\n').map((para, pIdx) => {
            const paragraphs = mem.text.split('\n\n');
            if (pIdx === 0) {
              let firstSentence = "";
              let restOfPara = para;

              if (isHighlighted) {
                const firstDot = para.indexOf('.');
                firstSentence = para.substring(0, firstDot + 1);
                restOfPara = para.substring(firstDot + 1);
              }

              return (
                <p key={pIdx} className="mb-2.5">
                  {mem.title && (
                    <span className="font-bold text-stone-900 uppercase tracking-widest text-[11px] mr-3">
                      {mem.title}
                    </span>
                  )}
                  {isHighlighted ? (
                    <>
                      <span className="font-bold text-memory-maroon">{firstSentence}</span>
                      {restOfPara}
                    </>
                  ) : (
                    para
                  )}
                </p>
              );
            } else {
              return (
                <p key={pIdx} className="indent-6 mb-2.5">
                  {para}
                  {pIdx === paragraphs.length - 1 && (
                    <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-stone-400 font-semibold ml-3 whitespace-nowrap">
                      — Remembered by {mem.author} &middot; {mem.date}
                    </span>
                  )}
                </p>
              );
            }
          })
        ) : (
          mem.title && (
             <p className="mb-2.5 text-stone-600 italic">
               <span className="font-bold text-stone-900 uppercase tracking-widest text-[11px] mr-3 not-italic">
                 {mem.title}
               </span>
               A memory shared by {mem.author} &middot; {mem.date}
             </p>
          )
        )}
      </div>

      {/* 🔴 REMOVED: per-memory image gallery block.
          Images for the whole chapter are now rendered ONCE, 
          in the horizontal gallery at the top of the chapter (page.tsx). */}

      {/* ACTION BUTTONS */}
      <div className="flex justify-start items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 mb-4">
        <button 
          type="button"
          onClick={() => handleToggleReaction(mem.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-sans font-medium transition-colors cursor-pointer border ${
            currentReaction.reacted 
            ? "bg-memory-maroon/10 border-memory-maroon/20 text-memory-maroon" 
            : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
          }`}
        >
          <span className="text-sm">{currentReaction.reacted ? '♥' : '♡'}</span> {currentReaction.count}
        </button>

        <button 
          type="button"
          onClick={() => setOpenCommentsId(isCommentsOpen ? null : mem.id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-sans font-medium transition-colors cursor-pointer border bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
        >
          <span className="text-stone-500">✎</span> {commentsList.length} Notes
        </button>
      </div>

      {isCommentsOpen && (
        <div className="mb-4 pt-3 border-t border-stone-200/50 space-y-3 text-xs font-sans animate-fadeIn px-4">
          <h5 className="font-serif uppercase tracking-widest text-memory-maroon font-semibold text-[9px] text-center">
            Marginalia
          </h5>
          <div className="space-y-3">
            {commentsList.length === 0 ? (
              <p className="text-[11px] text-stone-400 italic font-serif text-center">
                No margin notes yet.
              </p>
            ) : (
              commentsList.map((c) => (
                <div key={c.id} className="bg-stone-50/50 p-2.5 border-l-2 border-memory-maroon/30 space-y-2">
                  <div className="flex justify-between font-semibold text-stone-800 text-[10px]">
                    <span>{c.author}</span>
                    <span className="text-[9px] text-stone-400 font-normal">{c.time}</span>
                  </div>
                  <p className="text-stone-600 text-[11px] font-serif italic">{c.text}</p>
                  
                  {c.replies && c.replies.length > 0 && (
                    <div className="pl-3 mt-2 border-l border-stone-200 space-y-2">
                      {c.replies.map((r) => (
                        <div key={r.id} className="text-[10px] space-y-0.5">
                          <div className="flex justify-between font-semibold text-stone-700">
                            <span>{r.author}</span>
                            <span className="text-[8px] text-stone-400 font-normal">{r.time}</span>
                          </div>
                          <p className="text-stone-600 font-serif italic">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveReplyCommentId(activeReplyCommentId === c.id ? null : c.id)}
                      className="text-[10px] text-stone-500 hover:text-memory-maroon font-serif italic cursor-pointer"
                    >
                      {activeReplyCommentId === c.id ? "Cancel" : "Reply"}
                    </button>
                  </div>

                  {activeReplyCommentId === c.id && (
                    <div className="flex gap-2 pt-1 pl-2 items-center">
                      <input 
                        type="text"
                        placeholder="Write a reply..."
                        value={replyTextMap[c.id] || ""}
                        onChange={(e) => setReplyTextMap({ ...replyTextMap, [c.id]: e.target.value })}
                        className="w-full bg-transparent border-b border-stone-300 border-dashed px-2 py-1 text-[11px] font-serif italic outline-none focus:border-memory-maroon"
                      />
                      <button 
                        type="button"
                        onClick={() => onReplySubmit(c.id)}
                        className="px-2 py-1 text-memory-maroon font-serif text-[11px] hover:underline cursor-pointer whitespace-nowrap"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2 pt-2 justify-center">
            <input 
              type="text"
              placeholder="Scribble a note..."
              value={commentInputValue}
              onChange={(e) => setCommentInputValue(e.target.value)}
              className="w-2/3 bg-transparent border-b border-stone-300 border-dashed px-2 py-1 text-[11px] font-serif italic outline-none focus:border-memory-maroon"
            />
            <button 
              type="button"
              onClick={() => handlePostComment(mem.id)}
              className="px-2 py-1 text-memory-maroon font-serif text-[11px] hover:underline cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </article>
  );
}