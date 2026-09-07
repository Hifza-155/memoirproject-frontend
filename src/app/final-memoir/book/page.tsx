"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MemoirLayout from "../../../features/FinalMemoir/MemoirLayout";

/* -------------------------------------------------------------------------- */
/* Voice Memory                                                               */
/* -------------------------------------------------------------------------- */

function VoiceMemory() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioUrl((previousUrl) => {
          if (previousUrl) {
            URL.revokeObjectURL(previousUrl);
          }

          return url;
        });

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();

      setRecordingTime(0);
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((time) => time + 1);
      }, 1000);
    } catch (error) {
      console.error("Microphone access failed:", error);
      alert("Please allow microphone access to record your memory.");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();

    setIsRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid items-stretch gap-5 md:grid-cols-2">
        {/* Transcription Box */}
        <div className="rounded-xl border border-[#713C48]/10 bg-[#FBF8F1]/70 p-5 md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#80612F]">
              Transcription
            </span>

            <span className="text-[10px] text-[#713C48]/40">✦</span>
          </div>

          <p className="font-serif text-base leading-relaxed text-[#351A23]/85">
            “I still remember those early mornings. Dad would wake up before
            everyone else and sit quietly with his coffee. Those were simple
            moments, but they are some of the memories I miss the most.”
          </p>

          <p className="mt-4 font-[cursive] text-sm text-[#713C48]/70">
            — Michael, Son
          </p>
        </div>

        {/* Recording Box */}
        <div className="group flex flex-col justify-center rounded-xl bg-[#351A23] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(53,26,35,0.20)] md:p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Microphone */}
            <motion.div
              animate={
                isRecording
                  ? {
                      scale: [1, 1.07, 1],
                    }
                  : {
                      scale: 1,
                    }
              }
              transition={
                isRecording
                  ? {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : {
                      duration: 0.2,
                    }
              }
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                isRecording
                  ? "border-[#FBF8F1]/40 bg-[#FBF8F1]/20 shadow-[0_0_0_7px_rgba(251,248,241,0.04)]"
                  : "border-[#FBF8F1]/20 bg-[#FBF8F1]/10"
              }`}
            >
              <span className="text-lg text-[#FBF8F1]">
                {isRecording ? "●" : "🎙"}
              </span>
            </motion.div>

            {/* Text */}
            <div>
              <p className="font-serif text-base text-[#FBF8F1]">
                {isRecording
                  ? "Recording your memory..."
                  : "Record a voice memory"}
              </p>

              <p className="mt-1 font-[cursive] text-xs text-[#FBF8F1]/60">
                {isRecording
                  ? formatTime(recordingTime)
                  : "Your voice stays on this page"}
              </p>
            </div>

            {/* Recording Wave */}
            {isRecording && (
              <div className="flex h-5 items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <motion.span
                    key={bar}
                    animate={{
                      height: [4, 13, 6, 16, 5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: bar * 0.08,
                      ease: "easeInOut",
                    }}
                    className="w-px bg-[#FBF8F1]/60"
                  />
                ))}
              </div>
            )}

            {/* Button */}
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className="rounded-full bg-[#FBF8F1] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#351A23] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_7px_20px_rgba(53,26,35,0.16)]"
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>

            {/* Audio Preview */}
            {audioUrl && !isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full rounded-lg border border-[#FBF8F1]/10 bg-[#FBF8F1]/10 p-2.5"
              >
                <p className="mb-2 font-[cursive] text-[10px] text-[#FBF8F1]/50">
                  Your recorded memory
                </p>

                <audio controls src={audioUrl} className="w-full" />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-5 text-center font-[cursive] text-sm text-[#80612F]">
        Record the memory in your own voice.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Media Memories                                                             */
/* -------------------------------------------------------------------------- */

function MediaMemories() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    setImageUrl(URL.createObjectURL(file));
  };

  const handleVideoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [imageUrl, videoUrl]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Photo */}
        <label className="group cursor-pointer rounded-xl bg-[#351A23] p-3 shadow-sm transition hover:-translate-y-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-[#FBF8F1]/15 bg-[#FBF8F1]/10">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Selected memory"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center text-[#FBF8F1]">
                <div className="mb-3 text-3xl">▧</div>

                <p className="font-serif text-lg">Add a photograph</p>

                <p className="mt-1 font-[cursive] text-sm text-[#FBF8F1]/60">
                  Click to choose a photo
                </p>
              </div>
            )}
          </div>
        </label>

        {/* Video */}
        <label className="group cursor-pointer rounded-xl bg-[#351A23] p-3 shadow-sm transition hover:-translate-y-1">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="hidden"
          />

          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-[#FBF8F1]/15 bg-[#FBF8F1]/10">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center text-[#FBF8F1]">
                <div className="mb-3 text-3xl">▷</div>

                <p className="font-serif text-lg">Add a video memory</p>

                <p className="mt-1 font-[cursive] text-sm text-[#FBF8F1]/60">
                  Click to choose a video
                </p>
              </div>
            )}
          </div>
        </label>
      </div>

      <p className="mt-6 text-center font-[cursive] text-sm text-[#80612F]">
        Keep the moments that are easier to remember when you can see them.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Family Notes & Reactions                                                   */
/* -------------------------------------------------------------------------- */

function FamilyNotes() {
  const [notes, setNotes] = useState([
    {
      name: "Sarah",
      relation: "Daughter",
      message:
        "This brought back so many memories. I remember those mornings too. ❤️",
      reaction: null as string | null,
      reply: "",
    },
    {
      name: "Michael",
      relation: "Son",
      message:
        "Dad used to tell this story all the time. I am so glad we kept it.",
      reaction: null as string | null,
      reply: "",
    },
  ]);

  const [newNote, setNewNote] = useState("");
  const [replyOpen, setReplyOpen] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const addNote = () => {
    const trimmedNote = newNote.trim();

    if (!trimmedNote) return;

    setNotes((currentNotes) => [
      ...currentNotes,
      {
        name: "You",
        relation: "Family",
        message: trimmedNote,
        reaction: null,
        reply: "",
      },
    ]);

    setNewNote("");
  };

  const toggleReaction = (index: number) => {
    setNotes((currentNotes) =>
      currentNotes.map((note, noteIndex) =>
        noteIndex === index
          ? {
              ...note,
              reaction: note.reaction === "heart" ? null : "heart",
            }
          : note,
      ),
    );
  };

  const toggleReply = (index: number) => {
    setReplyOpen((current) => (current === index ? null : index));
    setReplyText("");
  };

  const addReply = (index: number) => {
    const trimmedReply = replyText.trim();

    if (!trimmedReply) return;

    setNotes((currentNotes) =>
      currentNotes.map((note, noteIndex) =>
        noteIndex === index
          ? {
              ...note,
              reply: trimmedReply,
            }
          : note,
      ),
    );

    setReplyText("");
    setReplyOpen(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      {/* Heading */}
      <div className="mb-5 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#80612F]">
          Family Notes
        </p>

        <h2 className="mt-2 font-serif text-3xl text-[#351A23] md:text-4xl">
          Memories Shared
        </h2>

        <div className="mx-auto mt-4 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#B99555]/60" />
          <span className="text-xs text-[#B99555]">❦</span>
          <span className="h-px w-8 bg-[#B99555]/60" />
        </div>
      </div>

      {/* Intro */}
      <p className="mx-auto max-w-lg text-center font-[cursive] text-sm leading-relaxed text-[#80612F]">
        A memoir becomes even more meaningful when the people who shared the
        moments can leave a little piece of themselves behind.
      </p>

      {/* Notes */}
      <div className="mt-5 space-y-3">
        {notes.map((note, index) => (
          <div
            key={`${note.name}-${index}`}
            className="rounded-lg border border-[#713C48]/10 bg-[#FBF8F1]/70 px-4 py-3"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-serif text-sm font-medium text-[#351A23]">
                {note.name}
              </p>

              <span className="text-[10px] text-[#80612F]">
                {note.relation}
              </span>
            </div>

            <p className="mt-1 font-[cursive] text-sm leading-relaxed text-[#351A23]/75">
              “{note.message}”
            </p>

            {/* Reaction + Reply */}
            <div className="mt-3 flex items-center gap-4 border-t border-[#713C48]/10 pt-2">
              <button
                type="button"
                onClick={() => toggleReaction(index)}
                className={`font-[cursive] text-xs transition ${
                  note.reaction === "heart"
                    ? "text-[#713C48]"
                    : "text-[#80612F] hover:text-[#713C48]"
                }`}
              >
                {note.reaction === "heart"
                  ? "♥ Remembered"
                  : "♡ Reaction"}
              </button>

              <button
                type="button"
                onClick={() => toggleReply(index)}
                className="font-[cursive] text-xs text-[#80612F] transition hover:text-[#713C48]"
              >
                Reply
              </button>
            </div>

            {/* Inline Reply */}
            {replyOpen === index && (
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      addReply(index);
                    }
                  }}
                  autoFocus
                  placeholder="Write a reply..."
                  className="min-w-0 flex-1 rounded-md border border-[#713C48]/15 bg-[#FBF8F1]/80 px-3 py-2 font-[cursive] text-xs text-[#351A23] outline-none placeholder:text-[#80612F]/60 focus:border-[#B99555]/60"
                />

                <button
                  type="button"
                  onClick={() => addReply(index)}
                  disabled={!replyText.trim()}
                  className="shrink-0 rounded-full bg-[#351A23] px-3 py-2 text-[10px] font-semibold text-[#FBF8F1] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Reply
                </button>
              </div>
            )}

            {/* Submitted Reply */}
            {note.reply && (
              <div className="mt-3 ml-4 border-l border-[#713C48]/15 pl-3">
                <p className="text-[10px] text-[#80612F]">You replied</p>

                <p className="mt-1 font-[cursive] text-xs leading-relaxed text-[#351A23]/70">
                  “{note.reply}”
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Note */}
      <div className="mt-5">
        <textarea
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="Leave a note or a memory..."
          rows={2}
          className="w-full resize-none rounded-lg border border-[#713C48]/15 bg-[#FBF8F1]/80 px-4 py-3 font-[cursive] text-sm text-[#351A23] outline-none placeholder:text-[#80612F]/60 focus:border-[#B99555]/60"
        />

        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={addNote}
            disabled={!newNote.trim()}
            className="rounded-full bg-[#351A23] px-4 py-2 text-xs font-semibold text-[#FBF8F1] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Add Note
          </button>
        </div>
      </div>

      <p className="mt-4 text-center font-[cursive] text-xs italic text-[#80612F]">
        Keep their words close to the memories.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Memoir Pages                                                               */
/* -------------------------------------------------------------------------- */

const pages = [
  {
    type: "cover",
    content: (
      <div className="flex min-h-[650px] h-full flex-col items-center justify-center px-8 text-center">
        <span className="mb-5 text-xl text-[#713C48]/50">✦</span>

        <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#80612F]">
          A Memoir
        </p>

        <h1 className="font-serif text-5xl leading-tight text-[#351A23] md:text-6xl">
          A Life
          <br />
          Remembered
        </h1>

        <div className="my-7 flex items-center gap-3">
          <span className="h-px w-12 bg-[#713C48]/30" />
          <span className="text-sm text-[#713C48]/50">♥</span>
          <span className="h-px w-12 bg-[#713C48]/30" />
        </div>

        <p className="font-serif text-2xl italic text-[#351A23]/80">
          Robert
        </p>

        <p className="mt-2 text-[10px] tracking-[0.3em] text-[#80612F]">
          1942 — 2024
        </p>

        <p className="mt-10 max-w-sm font-[cursive] text-base leading-relaxed text-[#80612F]">
          A collection of stories, voices, and moments that keep a life close.
        </p>
      </div>
    ),
  },

  {
    type: "chapter",
    content: (
      <div className="flex min-h-[650px] h-full flex-col items-center justify-center px-10 text-center md:px-16">
        <span className="mb-5 text-lg text-[#713C48]/40">✦</span>

        <p className="text-[10px] uppercase tracking-[0.35em] text-[#80612F]">
          Chapter I
        </p>

        <h2 className="mt-5 font-serif text-4xl leading-tight text-[#351A23] md:text-5xl">
          The Early Years
        </h2>

        <div className="my-7 h-px w-14 bg-[#713C48]/30" />

        <p className="max-w-xl font-serif text-lg leading-loose text-[#351A23]/80">
          Every life is made of small moments. Some are loud and unforgettable.
          Others are quiet, almost ordinary, until we realize how much they
          meant.
        </p>

        <p className="mt-7 max-w-lg font-[cursive] text-base leading-relaxed text-[#80612F]">
          These are the moments we chose to keep.
        </p>
      </div>
    ),
  },

  {
    type: "written",
    content: (
      <div className="flex min-h-[650px] h-full flex-col justify-center px-8 py-10 md:px-12">
        <div className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#80612F]">
            Written Memory
          </p>

          <h2 className="mt-3 font-serif text-3xl text-[#351A23] md:text-4xl">
            The Quiet Mornings
          </h2>

          <div className="mx-auto mt-5 h-px w-12 bg-[#713C48]/30" />
        </div>

        <div className="grid items-stretch gap-10 md:grid-cols-2 md:px-6">
          {/* Memory Text Box */}
          <div className="flex h-full flex-col">
            <div className="flex h-full flex-col justify-center rounded-xl border border-[#713C48]/15 bg-[#FBF8F1]/50 px-5 py-5">
              <p className="font-serif text-lg leading-loose text-[#351A23]/85">
                “Dad always woke up before the sun. He claimed it was to get a
                head start on the day, but I think he just liked the quiet
                before the house woke up.”
              </p>

              <p className="mt-6 font-[cursive] text-base text-[#713C48]/70">
                — Sara, Daughter
              </p>
            </div>
          </div>

          {/* Photograph */}
          <div className="flex h-full items-stretch justify-center">
            <div className="group flex h-full w-full max-w-sm flex-col overflow-hidden rounded-xl bg-[#351A23] p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_14px_30px_rgba(53,26,35,0.16)]">
              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-[#FBF8F1]/10 transition-all duration-300 group-hover:bg-[#FBF8F1]/15">
                <span className="font-[cursive] text-base text-[#FBF8F1]/70 transition-transform duration-300 group-hover:scale-105">
                  A cherished photograph
                </span>

                <div className="pointer-events-none absolute inset-3 rounded-md border border-[#FBF8F1]/0 transition-all duration-300 group-hover:border-[#FBF8F1]/25" />
              </div>

              <p className="px-3 py-3 text-center font-[cursive] text-xs text-[#FBF8F1]/70">
                In the garden, summer of '94
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  {
    type: "audio",
    content: (
      <div className="flex min-h-[650px] h-full flex-col justify-center px-7 py-8 md:px-10">
        <div className="mb-6 shrink-0 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#80612F]">
            Voice Memory
          </p>

          <h2 className="mt-3 font-serif text-3xl text-[#351A23] md:text-4xl">
            A Voice I Still Remember
          </h2>

          <div className="mx-auto mt-4 h-px w-12 bg-[#713C48]/30" />
        </div>

        <VoiceMemory />
      </div>
    ),
  },

  {
    type: "media",
    content: (
      <div className="flex min-h-[650px] h-full flex-col justify-center px-8 py-10 md:px-12">
        <div className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#80612F]">
            Media Memories
          </p>

          <h2 className="mt-3 font-serif text-3xl text-[#351A23] md:text-4xl">
            Moments We Kept
          </h2>

          <div className="mx-auto mt-5 h-px w-12 bg-[#713C48]/30" />
        </div>

        <MediaMemories />
      </div>
    ),
  },

  {
    type: "closing",
    content: (
      <div className="flex min-h-[650px] h-full flex-col items-center justify-center px-8 text-center">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-12 bg-[#713C48]/30" />
          <span className="text-sm text-[#713C48]/50">♥</span>
          <span className="h-px w-12 bg-[#713C48]/30" />
        </div>

        <p className="max-w-lg font-serif text-3xl leading-relaxed text-[#351A23] md:text-4xl">
          Some memories never really leave us.
        </p>

        <p className="mt-8 max-w-md font-[cursive] text-base leading-relaxed text-[#80612F]">
          They live in the stories we tell, the voices we remember, and the
          moments we choose to keep.
        </p>

        <div className="mt-10">
          <span className="text-lg text-[#713C48]/40">✦</span>

          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[#80612F]">
            The End
          </p>
        </div>
      </div>
    ),
  },

  /* ---------------------------------------------------------------------- */
  /* Family Notes Page                                                      */
  /* ---------------------------------------------------------------------- */

  {
    type: "family-notes",
    content: (
      <div className="flex min-h-[650px] h-full flex-col justify-center px-8 py-8 md:px-12">
        <FamilyNotes />
      </div>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/* Final Memoir                                                               */
/* -------------------------------------------------------------------------- */

export default function FinalMemoirPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [turningPage, setTurningPage] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [isReturning, setIsReturning] = useState(false);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pages.length - 1;
  const isFlipping = turningPage !== null;

  const goNext = () => {
    if (isFlipping || isLastPage || isReturning) return;

    setDirection("next");
    setTurningPage(currentPage);
  };

  const goPrevious = () => {
    if (isFlipping || isFirstPage || isReturning) return;

    setDirection("previous");
    setTurningPage(currentPage);
  };

  const finishFlip = () => {
    if (turningPage === null) return;

    if (direction === "next") {
      setCurrentPage(turningPage + 1);
    } else {
      setCurrentPage(turningPage - 1);
    }

    setTurningPage(null);
  };

  const handleBackToCover = () => {
    if (isReturning || isFlipping || !isFirstPage) return;

    setIsReturning(true);

    setTimeout(() => {
      router.push("/final-memoir");
    }, 650);
  };

  const underlyingPage =
    turningPage === null
      ? currentPage
      : direction === "next"
        ? turningPage + 1
        : turningPage - 1;

  return (
    <MemoirLayout>
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={
          isReturning
            ? {
                x: "100%",
                opacity: 0,
              }
            : {
                x: 0,
                opacity: 1,
              }
        }
        transition={{
          duration: 0.65,
          ease: [0.645, 0.045, 0.355, 1],
        }}
        className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center px-4 py-8"
      >
        <div
          className="relative w-full max-w-4xl"
          style={{
            perspective: "2000px",
          }}
        >
          {/* Layered paper */}
          <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-sm border border-[#713C48]/10 bg-[#FBF8F1]/70" />

          <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-sm border border-[#713C48]/10 bg-[#FBF8F1]/90" />

          {/* Static page underneath */}
          <div className="relative min-h-[650px] overflow-hidden rounded-sm border border-[#713C48]/20 bg-[#FBF8F1] shadow-sm">
            <div className="pointer-events-none absolute inset-4 border border-[#713C48]/10 md:inset-6" />

            {/* Back to Cover */}
            {isFirstPage && (
              <button
                type="button"
                onClick={handleBackToCover}
                disabled={isReturning || isFlipping}
                className="group absolute left-6 top-6 z-30 flex items-center gap-2 font-[cursive] text-sm text-[#351A23]/70 transition-all duration-300 hover:-translate-x-0.5 hover:text-[#713C48] disabled:cursor-default disabled:opacity-50 md:left-8 md:top-8"
              >
                <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>

                <span>Back to Cover</span>
              </button>
            )}

            <div className="relative min-h-[650px]">
              {pages[underlyingPage].content}
            </div>

            <div className="absolute bottom-5 left-0 right-0 text-center">
              <span className="font-[cursive] text-xs text-[#80612F]">
                {underlyingPage + 1} / {pages.length}
              </span>
            </div>
          </div>

          {/* Physical turning page */}
          {turningPage !== null && (
            <motion.div
              key={`${turningPage}-${direction}`}
              initial={{
                rotateY: 0,
              }}
              animate={{
                rotateY: direction === "next" ? -180 : 180,
              }}
              transition={{
                duration: 0.95,
                ease: [0.645, 0.045, 0.355, 1],
              }}
              onAnimationComplete={finishFlip}
              style={{
                transformOrigin:
                  direction === "next" ? "left center" : "right center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              className="absolute inset-0 z-20 min-h-[650px] overflow-hidden rounded-sm border border-[#713C48]/20 bg-[#FBF8F1] shadow-[12px_0_30px_rgba(53,26,35,0.12)]"
            >
              {/* Front */}
              <div
                className="absolute inset-0 min-h-[650px] bg-[#FBF8F1]"
                style={{
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="pointer-events-none absolute inset-4 border border-[#713C48]/10 md:inset-6" />

                <div className="relative min-h-[650px]">
                  {pages[turningPage].content}
                </div>

                <div className="absolute bottom-5 left-0 right-0 text-center">
                  <span className="font-[cursive] text-xs text-[#80612F]">
                    {turningPage + 1} / {pages.length}
                  </span>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 min-h-[650px] bg-[#FBF8F1]"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="pointer-events-none absolute inset-4 border border-[#713C48]/10 md:inset-6" />

                <div className="relative min-h-[650px]">
                  {pages[underlyingPage].content}
                </div>

                <div className="absolute bottom-5 left-0 right-0 text-center">
                  <span className="font-[cursive] text-xs text-[#80612F]">
                    {underlyingPage + 1} / {pages.length}
                  </span>
                </div>
              </div>

              {/* Page edge shadow */}
              <div
                className="pointer-events-none absolute bottom-0 top-0 w-10"
                style={{
                  [direction === "next" ? "left" : "right"]: 0,
                  background:
                    direction === "next"
                      ? "linear-gradient(to right, rgba(53,26,35,0.16), transparent)"
                      : "linear-gradient(to left, rgba(53,26,35,0.16), transparent)",
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex w-full max-w-4xl items-center justify-between px-2">
          <button
            type="button"
            onClick={goPrevious}
            disabled={isFirstPage || isFlipping || isReturning}
            className="font-[cursive] text-base text-[#351A23] transition hover:text-[#713C48] disabled:cursor-not-allowed disabled:opacity-25"
          >
            ← Previous
          </button>

          <p className="font-[cursive] text-sm text-[#80612F]">
            turn the page
          </p>

          <button
            type="button"
            onClick={goNext}
            disabled={isLastPage || isFlipping || isReturning}
            className="font-[cursive] text-base text-[#351A23] transition hover:text-[#713C48] disabled:cursor-not-allowed disabled:opacity-25"
          >
            Next →
          </button>
        </div>
      </motion.div>
    </MemoirLayout>
  );
}