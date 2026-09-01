import React, { useState } from 'react';
import Image from 'next/image';

// --- TYPES ---
interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
  replies?: { id: string; author: string; text: string; time: string }[];
}

interface MemoryProps {
  id: string;
  author: string;
  relation: string;
  text: string;
  audioDuration?: string;
  imageUrl?: string;
  imageCaption?: string;
  reactionsCount: number;
}


// --- MAIN COMPONENT ---
export default function MemoryCard({ 
  id, author, relation, text, imageUrl, imageCaption, reactionsCount 
}: MemoryProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'Imran (Son)',
      text: 'I was in the backseat when this happened. The silence in the car was deafening!',
      time: '2 days ago',
      replies: [
        {
          id: 'r1',
          author: 'Aunt Sarah',
          text: 'You kids were terrified to make a sound.',
          time: '1 day ago'
        }
      ]
    },
    {
      id: 'c2',
      author: 'Cousin Ali',
      text: 'Classic Dad reaction. He never could hide his face when he was angry.',
      time: '5 hours ago',
      replies: []
    }
  ]);
  
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const totalCommentsCount = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      text: newCommentText.trim(),
      time: 'Just now',
      replies: []
    };

    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [
            ...(c.replies || []),
            {
              id: Date.now().toString(),
              author: 'You',
              text: replyText.trim(),
              time: 'Just now'
            }
          ]
        };
      }
      return c;
    }));

    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <article 
      className="relative group flex flex-col mb-16 max-w-4xl bg-white rounded-sm p-6 md:p-8 shadow-[0_8px_30px_rgb(90,24,39,0.04)] transition-all duration-300"
      style={{
        borderTop: '2px solid rgba(90, 24, 39, 0.5)',
        borderLeft: '1px solid rgba(90, 24, 39, 0.3)',
        borderRight: '1px solid rgba(90, 24, 39, 0.2)',
        borderBottom: '3px solid rgba(90, 24, 39, 0.6)',
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
          onClick={() => setHasReacted(!hasReacted)}
          className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors ${
            hasReacted ? 'text-memory-maroon font-semibold' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill={hasReacted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
          I remember this too 
          <span className="ml-1 px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded-full text-[10px]">
            {reactionsCount + (hasReacted ? 1 : 0)}
          </span>
        </button>

        {/* Dropdown Toggle Button for Comments */}
        <button 
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className="flex items-center gap-1.5 text-xs font-sans font-medium text-stone-500 hover:text-memory-maroon transition-colors py-1 px-2.5 rounded-sm hover:bg-stone-50"
        >
          <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {isCommentsOpen ? 'Hide family notes' : `View family notes (${totalCommentsCount})`}
          <svg className={`w-3 h-3 transition-transform duration-300 ml-0.5 ${isCommentsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* COLLAPSIBLE COMMENTS STREAM (Instagram / Facebook Style Dropdown) */}
      {isCommentsOpen && (
        <div className="mt-6 pt-6 border-t border-stone-200/60 space-y-6 animate-fadeIn">
          <h5 className="text-xs font-serif uppercase tracking-widest text-memory-maroon font-semibold">
            Family Comments
          </h5>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="text-sm space-y-2">
                <div className="flex items-start justify-between bg-stone-50/70 p-3 rounded-sm border border-stone-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-semibold text-stone-900 text-xs">{comment.author}</span>
                      <span className="text-[10px] text-stone-400">{comment.time}</span>
                    </div>
                    <p className="text-stone-700 font-sans text-xs leading-relaxed">{comment.text}</p>
                  </div>
                  <button 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-[11px] font-medium text-memory-maroon hover:underline shrink-0 ml-2"
                  >
                    Reply
                  </button>
                </div>

                {/* Threaded Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="pl-6 space-y-2 border-l-2 border-memory-maroon/20 ml-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-stone-50/40 p-2.5 rounded-sm border border-stone-100/60">
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-semibold text-stone-900 text-xs">{reply.author}</span>
                          <span className="text-[10px] text-stone-400">{reply.time}</span>
                        </div>
                        <p className="text-stone-700 font-sans text-xs leading-relaxed mt-0.5">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input Box */}
                {replyingTo === comment.id && (
                  <div className="pl-6 flex items-center gap-2 mt-2">
                    <input 
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${comment.author}...`}
                      className="flex-1 bg-stone-50 border border-stone-200 rounded-sm px-3 py-1.5 text-xs text-stone-900 outline-none focus:border-memory-maroon transition-colors"
                    />
                    <button 
                      onClick={() => handleAddReply(comment.id)}
                      className="px-3 py-1.5 bg-memory-maroon text-white text-xs font-medium rounded-sm hover:bg-memory-maroon/90 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Main Comment Input Form */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-2">
            <input 
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add a comment to this memory..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-sm px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 outline-none focus:border-memory-maroon transition-colors"
            />
            <button 
              type="submit"
              disabled={!newCommentText.trim()}
              className="px-4 py-2 bg-memory-maroon text-white text-xs font-medium rounded-sm disabled:opacity-50 hover:bg-memory-maroon/90 transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      )}

    </article>
  );
}