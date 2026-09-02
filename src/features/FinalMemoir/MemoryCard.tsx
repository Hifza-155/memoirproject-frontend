"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

// --- TYPES ---
interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
  replies?: {
    id: string;
    author: string;
    text: string;
    time: string;
  }[];
}

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
}

interface MemoryProps {
  id: string;
  author: string;
  relation: string;
  text: string;
  memoryType?: "written" | "audio" | "media";
  audioUrl?: string;
  audioDuration?: string;
  imageUrl?: string;
  imageCaption?: string;
  reactionsCount: number;
}

// --- MAIN COMPONENT ---
export default function MemoryCard({
  id,
  author,
  relation,
  text,
  memoryType = "written",
  audioUrl,
  audioDuration,
  imageUrl,
  imageCaption,
  reactionsCount,
}: MemoryProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  // Audio states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(
    audioUrl || null
  );
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState(text || "");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Media states
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(
    imageUrl
      ? [
          {
            id: "initial-image",
            url: imageUrl,
            type: "image",
          },
        ]
      : []
  );

  const [caption, setCaption] = useState(imageCaption || "");
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  // Comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      author: "Imran (Son)",
      text: "I was in the backseat when this happened. The silence in the car was deafening!",
      time: "2 days ago",
      replies: [
        {
          id: "r1",
          author: "Aunt Sarah",
          text: "You kids were terrified to make a sound.",
          time: "1 day ago",
        },
      ],
    },
    {
      id: "c2",
      author: "Cousin Ali",
      text: "Classic Dad reaction. He never could hide his face when he was angry.",
      time: "5 hours ago",
      replies: [],
    },
  ]);

  const [newCommentText, setNewCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const totalCommentsCount = comments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );

  // ---------------- AUDIO RECORDING ----------------

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();

      setIsRecording(true);
      setRecordingTime(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Microphone permission error:", error);
      alert("Please allow microphone access to record audio.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ---------------- MEDIA ----------------

  const handleMediaUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) return;

    const newItems: MediaItem[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setMediaItems((prev) => [...prev, ...newItems]);

    event.target.value = "";
  };

  const removeMedia = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ---------------- COMMENTS ----------------

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: "You",
      text: newCommentText.trim(),
      time: "Just now",
      replies: [],
    };

    setComments([...comments, newComment]);
    setNewCommentText("");
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: Date.now().toString(),
                author: "You",
                text: replyText.trim(),
                time: "Just now",
              },
            ],
          };
        }

        return comment;
      })
    );

    setReplyText("");
    setReplyingTo(null);
  };

  // ---------------- CARD STYLES ----------------

  const isMedia = memoryType === "media";

  return (
    <article
      className={`relative group flex flex-col mb-16 max-w-4xl rounded-sm p-6 md:p-8 shadow-[0_8px_30px_rgb(90,24,39,0.04)] transition-all duration-300 ${
        isMedia ? "bg-memory-maroon text-white" : "bg-white"
      }`}
      style={
        isMedia
          ? {
              borderTop: "2px solid rgba(255,255,255,0.35)",
              borderLeft: "1px solid rgba(255,255,255,0.2)",
              borderRight: "1px solid rgba(255,255,255,0.2)",
              borderBottom: "3px solid rgba(255,255,255,0.4)",
            }
          : {
              borderTop: "2px solid rgba(90, 24, 39, 0.5)",
              borderLeft: "1px solid rgba(90, 24, 39, 0.3)",
              borderRight: "1px solid rgba(90, 24, 39, 0.2)",
              borderBottom: "3px solid rgba(90, 24, 39, 0.6)",
            }
      }
    >
      <div id={`memory-${id}`} className="absolute -top-24" />

      {/* HEADER */}
      <header className="flex items-baseline justify-between mb-3">
        <div>
          <h4
            className={`text-xl font-sans font-semibold tracking-tight ${
              isMedia ? "text-white" : "text-stone-900"
            }`}
          >
            {author}
          </h4>

          <p
            className={`text-xs font-sans uppercase tracking-widest mt-0.5 ${
              isMedia ? "text-white/60" : "text-stone-400"
            }`}
          >
            {relation}
          </p>
        </div>
      </header>

      {/* DIVIDER */}
      <div className="w-full flex flex-col gap-0.5 my-3">
        <div
          className={`w-full h-px ${
            isMedia ? "bg-white/30" : "bg-memory-maroon/30"
          }`}
        />
        <div
          className={`w-full h-[0.5px] ${
            isMedia ? "bg-white/15" : "bg-memory-maroon/10"
          }`}
        />
      </div>

      {/* ===================================================== */}
      {/* WRITTEN MEMORY */}
      {/* ===================================================== */}

      {memoryType === "written" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-4">
          <div className="lg:col-span-7 relative p-6 bg-stone-50/50 rounded-sm border border-stone-200/60 shadow-[inset_0_0_0_1px_rgba(90,24,39,0.04)]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-memory-maroon/30 pointer-events-none" />

            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-memory-maroon/30 pointer-events-none" />

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

          {imageUrl && (
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="hidden lg:block absolute -left-3 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-memory-maroon/20 to-transparent" />

              <figure className="w-56 sm:w-64 bg-memory-dark-end p-2.5 shadow-lg border border-memory-maroon/40 transform rotate-1 transition-transform hover:rotate-0 duration-300">
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
      )}

      {/* ===================================================== */}
      {/* AUDIO MEMORY */}
      {/* ===================================================== */}

      {memoryType === "audio" && (
        <div className="my-4">
          {/* RECORDING AREA */}
          <div className="relative p-6 bg-stone-50/50 rounded-sm border border-stone-200/60">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-memory-maroon/30" />

            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-memory-maroon/30" />

            <div className="flex flex-col items-center justify-center py-5">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="flex items-center gap-3 px-6 py-3 bg-memory-maroon text-white rounded-sm text-sm font-medium hover:bg-memory-maroon/90 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
                    />
                  </svg>
                  Record Audio
                </button>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

                    <span className="text-sm font-medium text-stone-700">
                      Recording... {formatTime(recordingTime)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={stopRecording}
                    className="flex items-center gap-3 px-6 py-3 bg-stone-900 text-white rounded-sm text-sm font-medium hover:bg-stone-800 transition-colors"
                  >
                    <span className="w-3 h-3 bg-white rounded-sm" />
                    Stop Recording
                  </button>
                </>
              )}

              {/* AUDIO PLAYER */}
              {recordedAudioUrl && !isRecording && (
                <div className="w-full mt-6 pt-5 border-t border-stone-200">
                  <audio
                    controls
                    src={recordedAudioUrl}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* TRANSCRIPTION */}
          <div className="relative mt-6 p-6 bg-stone-50/50 rounded-sm border border-stone-200/60">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-memory-maroon/30" />

            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-memory-maroon/30" />

            <h5 className="text-xs uppercase tracking-widest text-memory-maroon font-semibold mb-4">
              Transcription
            </h5>

            <div className="relative">
              <span className="absolute -top-3 left-0 text-5xl font-serif text-memory-maroon/25 leading-none">
                “
              </span>

              <textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Your audio transcription will appear here after recording..."
                className="w-full min-h-36 resize-y bg-transparent border-0 outline-none px-5 py-4 text-stone-700 font-serif text-base leading-relaxed placeholder:text-stone-400"
              />

              <span className="absolute -bottom-5 right-0 text-5xl font-serif text-memory-maroon/25 leading-none">
                ”
              </span>
            </div>

            <p className="text-[10px] text-stone-400 mt-4 uppercase tracking-wider">
              Review and edit the transcription if needed
            </p>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* MEDIA MEMORY */}
      {/* ===================================================== */}

      {memoryType === "media" && (
        <div className="my-4">
          {/* MEDIA UPLOAD */}
          <div className="relative">
            <input
              ref={mediaInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaUpload}
              className="hidden"
            />

            {mediaItems.length === 0 ? (
              <button
                type="button"
                onClick={() => mediaInputRef.current?.click()}
                className="w-full min-h-72 border border-white/30 border-dashed rounded-sm flex flex-col items-center justify-center hover:bg-white/5 transition-colors"
              >
                <svg
                  className="w-10 h-10 text-white/60 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>

                <span className="text-sm font-medium">
                  Add Photos or Videos
                </span>

                <span className="text-xs text-white/50 mt-2">
                  You can select one or multiple files
                </span>
              </button>
            ) : (
              <>
                <div
                  className={`grid gap-3 ${
                    mediaItems.length === 1
                      ? "grid-cols-1"
                      : mediaItems.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-2 md:grid-cols-3"
                  }`}
                >
                  {mediaItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-4/3 overflow-hidden rounded-sm border border-white/20 bg-black/20 group/media"
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.url}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={item.url}
                          alt="Family memory"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => removeMedia(item.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => mediaInputRef.current?.click()}
                  className="mt-4 px-4 py-2 border border-white/30 text-white text-xs uppercase tracking-wider rounded-sm hover:bg-white/10 transition-colors"
                >
                  + Add More Photos / Videos
                </button>
              </>
            )}
          </div>

          {/* CAPTION */}
          <div className="mt-6">
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Caption
            </label>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption for this memory..."
              rows={3}
              className="w-full resize-none bg-white/10 border border-white/20 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-colors"
            />
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* BOTTOM REACTIONS + FAMILY NOTES */}
      {/* ===================================================== */}

      <div
        className={`mt-4 pt-3 border-t flex items-center justify-between ${
          isMedia ? "border-white/15" : "border-stone-100"
        }`}
      >
        <button
          onClick={() => setHasReacted(!hasReacted)}
          className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors ${
            hasReacted
              ? isMedia
                ? "text-white font-semibold"
                : "text-memory-maroon font-semibold"
              : isMedia
              ? "text-white/50 hover:text-white"
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

          <span
            className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
              isMedia
                ? "bg-white/10 text-white/70"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {reactionsCount + (hasReacted ? 1 : 0)}
          </span>
        </button>

        <button
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className={`flex items-center gap-1.5 text-xs font-sans font-medium transition-colors py-1 px-2.5 rounded-sm ${
            isMedia
              ? "text-white/70 hover:text-white hover:bg-white/10"
              : "text-stone-500 hover:text-memory-maroon hover:bg-stone-50"
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 ${
              isMedia ? "text-white/50" : "text-stone-400"
            }`}
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
            className={`w-3 h-3 transition-transform duration-300 ml-0.5 ${
              isCommentsOpen ? "rotate-180" : ""
            }`}
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

      {/* ===================================================== */}
      {/* FAMILY COMMENTS */}
      {/* ===================================================== */}

      {isCommentsOpen && (
        <div
          className={`mt-6 pt-6 border-t space-y-6 animate-fadeIn ${
            isMedia ? "border-white/15" : "border-stone-200/60"
          }`}
        >
          <h5
            className={`text-xs font-serif uppercase tracking-widest font-semibold ${
              isMedia ? "text-white" : "text-memory-maroon"
            }`}
          >
            Family Comments
          </h5>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="text-sm space-y-2">
                <div
                  className={`flex items-start justify-between p-3 rounded-sm border ${
                    isMedia
                      ? "bg-white/5 border-white/10"
                      : "bg-stone-50/70 border-stone-100"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-sans font-semibold text-xs ${
                          isMedia ? "text-white" : "text-stone-900"
                        }`}
                      >
                        {comment.author}
                      </span>

                      <span
                        className={`text-[10px] ${
                          isMedia ? "text-white/40" : "text-stone-400"
                        }`}
                      >
                        {comment.time}
                      </span>
                    </div>

                    <p
                      className={`font-sans text-xs leading-relaxed ${
                        isMedia ? "text-white/70" : "text-stone-700"
                      }`}
                    >
                      {comment.text}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    }
                    className={`text-[11px] font-medium hover:underline shrink-0 ml-2 ${
                      isMedia ? "text-white" : "text-memory-maroon"
                    }`}
                  >
                    Reply
                  </button>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div
                    className={`pl-6 space-y-2 border-l-2 ml-2 ${
                      isMedia
                        ? "border-white/20"
                        : "border-memory-maroon/20"
                    }`}
                  >
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className={`p-2.5 rounded-sm border ${
                          isMedia
                            ? "bg-white/5 border-white/10"
                            : "bg-stone-50/40 border-stone-100/60"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-sans font-semibold text-xs ${
                              isMedia ? "text-white" : "text-stone-900"
                            }`}
                          >
                            {reply.author}
                          </span>

                          <span
                            className={`text-[10px] ${
                              isMedia ? "text-white/40" : "text-stone-400"
                            }`}
                          >
                            {reply.time}
                          </span>
                        </div>

                        <p
                          className={`font-sans text-xs leading-relaxed mt-0.5 ${
                            isMedia ? "text-white/70" : "text-stone-700"
                          }`}
                        >
                          {reply.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {replyingTo === comment.id && (
                  <div className="pl-6 flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${comment.author}...`}
                      className={`flex-1 rounded-sm px-3 py-1.5 text-xs outline-none transition-colors ${
                        isMedia
                          ? "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/50"
                          : "bg-stone-50 border border-stone-200 text-stone-900 focus:border-memory-maroon"
                      }`}
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

          <form
            onSubmit={handleAddComment}
            className="flex items-center gap-2 pt-2"
          >
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add a comment to this memory..."
              className={`flex-1 rounded-sm px-3.5 py-2 text-xs outline-none transition-colors ${
                isMedia
                  ? "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/50"
                  : "bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 focus:border-memory-maroon"
              }`}
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