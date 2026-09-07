"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function FinalMemoirCover() {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);

  const handleContinueReading = () => {
    if (isOpening) return;

    setIsOpening(true);

    setTimeout(() => {
      router.push("/final-memoir/book");
    }, 650);
  };

  return (
    <main className="min-h-screen bg-memory-bg px-2 py-2 text-memory-primary sm:px-3 sm:py-3 lg:px-4 lg:py-4">
      <div className="mx-auto max-w-[1580px]">
        <motion.section
          initial={{ x: 0, opacity: 1 }}
          animate={
            isOpening
              ? { x: "-100%", opacity: 0 }
              : { x: 0, opacity: 1 }
          }
          transition={{
            duration: 0.65,
            ease: [0.645, 0.045, 0.355, 1],
          }}
          className="relative overflow-hidden border-[1.5px] border-memory-primary bg-memory-card shadow-[0_25px_80px_rgba(45,23,31,0.20)]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 10%, rgba(185,149,85,0.045), transparent 28%),
              radial-gradient(circle at 85% 70%, rgba(113,60,72,0.035), transparent 30%),
              repeating-linear-gradient(
                0deg,
                rgba(53,26,35,0.012) 0px,
                rgba(53,26,35,0.012) 1px,
                transparent 1px,
                transparent 4px
              ),
              linear-gradient(135deg, rgba(255,255,255,0.20), transparent 45%)
            `,
          }}
        >
          <div className="pointer-events-none absolute inset-[7px] border border-memory-accent/35" />

          <div className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l border-t border-memory-accent" />
          <div className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-r border-t border-memory-accent" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 border-b border-l border-memory-accent" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 border-b border-r border-memory-accent" />

          <div className="pointer-events-none absolute left-[13%] top-[24%] rotate-[-8deg] font-serif text-xs text-memory-accent/25">
            ✦
          </div>
          <div className="pointer-events-none absolute right-[6%] top-[36%] rotate-[8deg] font-serif text-sm text-memory-accent/35">
            ✦
          </div>
          <div className="pointer-events-none absolute left-[46%] bottom-[18%] rotate-[-5deg] font-serif text-xs text-memory-accent/20">
            ✦
          </div>
          <div className="pointer-events-none absolute right-[8%] bottom-[25%] rotate-[10deg] font-serif text-xs text-memory-accent/25">
            ✦
          </div>
          <div className="pointer-events-none absolute left-[8%] top-[48%] rotate-[-12deg] font-serif text-xs text-memory-accent/25">
            ✦
          </div>
          <div className="pointer-events-none absolute right-[14%] top-[58%] rotate-[10deg] font-serif text-sm text-memory-accent/30">
            ✦
          </div>
          <div className="pointer-events-none absolute left-[28%] bottom-[12%] rotate-[7deg] font-serif text-xs text-memory-accent/25">
            ✦
          </div>
          <div className="pointer-events-none absolute right-[35%] bottom-[8%] rotate-[-8deg] font-serif text-xs text-memory-accent/20">
            ✦
          </div>

          {/* HEADER */}
          <header className="relative z-10">
            <div className="flex items-center justify-between border-b border-memory-accent/50 bg-memory-primary px-4 py-2 sm:px-8">
              <span className="text-[7px] font-medium uppercase tracking-[0.28em] text-memory-accent sm:text-[8px]">
                Special Memorial Edition
              </span>

              <span className="hidden text-[7px] uppercase tracking-[0.28em] text-memory-light/75 md:block">
                A Life • A Story • A Legacy
              </span>

              <span className="text-[7px] uppercase tracking-[0.28em] text-memory-light sm:text-[8px]">
                2026 Edition
              </span>
            </div>

            <div className="relative border-b-[3px] border-memory-primary px-4 py-5 sm:px-8 sm:py-6">
              <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 items-center gap-3 lg:flex">
                <span className="h-px w-20 bg-memory-primary/40" />
                <span className="font-serif text-xl text-memory-accent">❦</span>
              </div>

              <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-3 lg:flex">
                <span className="font-serif text-xl text-memory-accent">❦</span>
                <span className="h-px w-20 bg-memory-primary/40" />
              </div>

              <div className="text-center">
                <h1
                  className="whitespace-nowrap font-serif text-[clamp(2rem,5vw,5.2rem)] font-medium leading-none tracking-[-0.035em] text-memory-primary"
                  style={{
                    textShadow:
                      "0 2px 0 rgba(185,149,85,0.18), 0 7px 24px rgba(53,26,35,0.08)",
                  }}
                >
                  The Memorial Times
                </h1>

                <div className="mt-2 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-memory-accent" />
                  <span className="text-[7px] uppercase tracking-[0.48em] text-memory-accent sm:text-[8px]">
                    Memory • Love • Legacy
                  </span>
                  <span className="h-px w-10 bg-memory-accent" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-memory-primary/40 px-4 py-2 sm:px-8">
              <span className="text-[6px] uppercase tracking-[0.3em] text-memory-muted sm:text-[7px]">
                Vol. I • No. 01
              </span>

              <span className="flex items-center gap-2 text-[6px] font-semibold uppercase tracking-[0.3em] text-memory-maroon sm:text-[7px]">
                <span className="text-memory-accent">✦</span>
                In Loving Memory
                <span className="text-memory-accent">✦</span>
              </span>

              <span className="text-[6px] uppercase tracking-[0.3em] text-memory-muted sm:text-[7px]">
                1942 — 2024
              </span>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <div className="px-4 py-5 sm:px-7 sm:py-6 lg:px-9 lg:py-6">
            <div className="grid grid-cols-12 gap-0">

              {/* LEFT EDITORIAL COLUMN */}
              <article className="col-span-12 border-b border-memory-primary/30 pb-6 sm:col-span-7 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-7 lg:pr-9">

                <div className="flex items-center gap-2">
                  <span className="bg-memory-maroon px-3 py-1.5 text-[6px] font-bold uppercase tracking-[0.3em] text-memory-light shadow-[0_4px_12px_rgba(53,26,35,0.13)] sm:text-[7px]">
                    The Life & Legacy
                  </span>

                  <span className="h-px flex-1 bg-memory-primary/25" />
                  <span className="text-xs text-memory-accent">✦</span>
                </div>

                {/* UPDATED UNIQUE COVER HEADING */}
                <div className="mt-5">
                  <p
                    className="font-serif text-[clamp(1rem,2vw,1.45rem)] italic tracking-wide text-memory-accent"
                    style={{
                      textShadow: "0 3px 12px rgba(138,102,52,0.12)",
                    }}
                  >
                    Preserving
                  </p>

                  <h2
                    className="mt-1 font-serif text-[clamp(3rem,5vw,6.2rem)] font-medium leading-[0.86] tracking-[-0.045em] text-memory-primary"
                    style={{
                      textShadow: "0 4px 22px rgba(53,26,35,0.09)",
                    }}
                  >
                    The Moments
                    <br />

                    <span
                      className="font-normal text-memory-maroon"
                      style={{
                        textShadow:
                          "0 4px 22px rgba(53,26,35,0.09)",
                      }}
                    >
                      That Made A Life
                    </span>
                  </h2>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[7px] text-memory-accent">✦</span>
                    <span className="h-px w-10 bg-memory-accent/50" />
                    <span className="text-[6px] uppercase tracking-[0.28em] text-memory-accent">
                      A life worth remembering
                    </span>
                  </div>
                </div>

                <div className="my-4 flex items-center gap-2">
                  <span className="h-[2px] w-14 bg-memory-primary" />
                  <span className="text-[8px] text-memory-accent">◆</span>
                  <span className="h-px flex-1 bg-memory-accent/60" />
                </div>

                <p className="max-w-2xl font-[cursive] text-sm leading-relaxed text-memory-primary/80 sm:text-base lg:text-lg">
                  The stories, words, voices and little moments that made
                  Robert&apos;s life unforgettable.
                </p>

                <div className="mt-3 flex items-center justify-between border-y border-memory-primary/25 py-2">
                  <span className="text-[6px] uppercase tracking-[0.22em] text-memory-muted sm:text-[7px]">
                    By Those Who Loved Him
                  </span>

                  <span className="text-[6px] uppercase tracking-[0.22em] text-memory-muted sm:text-[7px]">
                    Memorial Edition
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-5">

                  <div>
                    <p className="font-serif text-[10px] leading-[1.55] text-memory-primary/75 sm:text-xs lg:text-sm">
                      <span className="float-left mr-1 font-serif text-6xl font-medium leading-[0.68] text-memory-maroon">
                        S
                      </span>
                      ome lives are remembered in milestones. Others live on in
                      the smallest things a familiar laugh, a well-known
                      story, a hand on your shoulder, a moment everyone still
                      talks about.
                    </p>

                    <p className="mt-4 font-serif text-[9px] leading-[1.6] text-memory-primary/60 sm:text-[10px] lg:text-xs">
                      Robert&apos;s story lives in those details: the
                      conversations that lasted a little longer, the traditions
                      that became family habits, and the ordinary days that
                      quietly became part of everyone&apos;s history.
                    </p>

                    {/* QUOTE */}
                    <div className="relative mt-5 border-y border-memory-accent px-3 py-4">
                      <p
                        className="font-[cursive] text-sm italic leading-[1.25] text-memory-maroon sm:text-base lg:text-lg"
                        style={{
                          textShadow:
                            "0 2px 10px rgba(113,60,72,0.08)",
                        }}
                      >
                        <span>“Where memory lives,</span>
                        <br />
                        <span className="relative inline-block">
                          love never fades.”
                          <span className="absolute -bottom-1 left-0 h-px w-full rotate-[-1deg] bg-memory-accent/45" />
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <span className="text-[8px] text-memory-accent">✦</span>
                      <span className="h-px flex-1 bg-memory-primary/20" />
                      <span className="font-serif text-[10px] text-memory-accent">
                        ❦
                      </span>
                      <span className="h-px flex-1 bg-memory-primary/20" />
                      <span className="text-[8px] text-memory-accent">✦</span>
                    </div>
                  </div>

                  <div className="border-l border-memory-primary/25 pl-5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-memory-accent">✦</span>
                      <p className="text-[6px] font-bold uppercase tracking-[0.3em] text-memory-accent sm:text-[7px]">
                        The Legacy
                      </p>
                    </div>

                    <h3 className="mt-2 font-serif text-xl font-medium leading-[0.95] text-memory-primary sm:text-2xl lg:text-3xl">
                      More than
                      <br />
                      <span className="font-normal italic text-memory-maroon">
                        a memory.
                      </span>
                    </h3>

                    <p className="mt-4 font-serif text-[9px] leading-[1.6] text-memory-primary/65 sm:text-[10px] lg:text-xs">
                      His legacy was never something written in dates. It was
                      left quietly in the people he loved, the lessons he
                      passed on, and the little parts of him that remain in
                      those who knew him.
                    </p>

                    <div className="mt-5 border-t border-memory-primary/20 pt-3">
                      <div className="flex items-center justify-between border-b border-memory-primary/15 py-2">
                        <span className="text-[6px] uppercase tracking-[0.2em] text-memory-muted">
                          Born
                        </span>
                        <span className="font-serif text-sm text-memory-primary">
                          1942
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-memory-primary/15 py-2">
                        <span className="text-[6px] uppercase tracking-[0.2em] text-memory-muted">
                          Remembered
                        </span>
                        <span className="font-serif text-sm text-memory-primary">
                          2024
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <span className="text-[6px] uppercase tracking-[0.2em] text-memory-muted">
                          Legacy
                        </span>
                        <span className="font-serif text-sm italic text-memory-maroon">
                          Always
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="h-px w-7 bg-memory-accent" />
                      <span className="text-[6px] uppercase tracking-[0.18em] text-memory-maroon">
                        Preserved for generations
                      </span>
                    </div>

                    <div className="mt-5 text-center font-serif text-xs tracking-[0.4em] text-memory-accent">
                      ✦ ❦ ✦
                    </div>
                  </div>
                </div>
              </article>

              {/* RIGHT COLUMN */}
              <aside className="col-span-12 pt-6 sm:col-span-5 sm:pt-0 sm:pl-7 lg:pl-9">

                <div className="flex items-center justify-between border-b border-memory-primary/50 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-memory-accent">✦</span>
                    <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-memory-maroon">
                      Remembering Robert
                    </p>
                  </div>

                  <span className="font-serif text-xs italic text-memory-accent">
                    01
                  </span>
                </div>

                <div className="group mt-4 flex justify-center">
                  <div className="relative w-full max-w-[235px] transition-all duration-500 ease-out group-hover:-translate-y-1">
                    <div className="absolute -inset-1 border border-memory-accent/35 transition-all duration-500 group-hover:-inset-1.5 group-hover:border-memory-accent/55" />

                    <div className="border-[1.5px] border-memory-primary bg-memory-primary p-2 shadow-[0_12px_35px_rgba(53,26,35,0.15)] transition-shadow duration-500 group-hover:shadow-[0_17px_38px_rgba(53,26,35,0.22)]">
                      <div className="border border-memory-accent bg-memory-primary p-2">
                        <div className="relative flex aspect-[4/4.7] items-center justify-center overflow-hidden border border-memory-accent/45 bg-memory-primary">
                          <div className="relative text-center">
                            <div
                              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[1.5px] border-memory-accent bg-memory-maroon font-serif text-5xl font-medium italic text-memory-accent shadow-[0_7px_20px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28 sm:text-6xl"
                              style={{
                                textShadow:
                                  "0 3px 12px rgba(216,182,109,0.18)",
                              }}
                            >
                              R
                            </div>

                            <p className="mt-4 font-serif text-base italic text-memory-light sm:text-lg">
                              Robert Harrison
                            </p>

                            <div className="mx-auto mt-2 flex items-center justify-center gap-2">
                              <span className="h-px w-6 bg-memory-accent" />
                              <span className="text-[7px] text-memory-accent">
                                ✦
                              </span>
                              <span className="h-px w-6 bg-memory-accent" />
                            </div>

                            <p className="mt-2 text-[6px] uppercase tracking-[0.3em] text-memory-accent">
                              Forever Remembered
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span className="absolute -left-1 -top-1 h-7 w-7 border-l-2 border-t-2 border-memory-accent" />
                    <span className="absolute -right-1 -top-1 h-7 w-7 border-r-2 border-t-2 border-memory-accent" />
                    <span className="absolute -bottom-1 -left-1 h-7 w-7 border-b-2 border-l-2 border-memory-accent" />
                    <span className="absolute -bottom-1 -right-1 h-7 w-7 border-b-2 border-r-2 border-memory-accent" />
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <h3
                    className="font-serif text-2xl font-normal italic text-memory-maroon"
                    style={{
                      textShadow:
                        "0 4px 16px rgba(113,60,72,0.12)",
                    }}
                  >
                    Robert Harrison
                  </h3>

                  <p className="mt-1 text-[7px] uppercase tracking-[0.4em] text-memory-muted">
                    1942 — 2024
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-3 border-y border-memory-primary/40">
                  <div className="group px-2 py-3 text-center transition-transform duration-300 hover:-translate-y-0.5">
                    <span className="font-serif text-base text-memory-accent">✎</span>
                    <p className="mt-1 text-[6px] uppercase tracking-[0.18em] text-memory-muted">
                      His Words
                    </p>
                    <p className="mt-1 font-serif text-xs font-medium text-memory-primary">
                      Stories
                    </p>
                  </div>

                  <div className="group border-x border-memory-primary/20 px-2 py-3 text-center transition-transform duration-300 hover:-translate-y-0.5">
                    <span className="font-serif text-base text-memory-accent">♫</span>
                    <p className="mt-1 text-[6px] uppercase tracking-[0.18em] text-memory-muted">
                      His Voice
                    </p>
                    <p className="mt-1 font-serif text-xs font-medium text-memory-primary">
                      Memories
                    </p>
                  </div>

                  <div className="group px-2 py-3 text-center transition-transform duration-300 hover:-translate-y-0.5">
                    <span className="font-serif text-base text-memory-accent">◇</span>
                    <p className="mt-1 text-[6px] uppercase tracking-[0.18em] text-memory-muted">
                      His Moments
                    </p>
                    <p className="mt-1 font-serif text-xs font-medium text-memory-primary">
                      Photographs
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-b border-memory-primary/35 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] text-memory-accent">◆</span>
                    <p className="text-[6px] font-bold uppercase tracking-[0.28em] text-memory-accent">
                      From the Family Archive
                    </p>
                  </div>

                  <h3 className="mt-2 font-serif text-xl font-medium leading-[0.95] text-memory-primary sm:text-2xl">
                    The little things
                    <br />
                    <span className="font-normal italic text-memory-maroon">
                      we never forget.
                    </span>
                  </h3>

                  <p className="mt-3 max-w-md font-[cursive] text-[9px] leading-relaxed text-memory-primary/60 sm:text-[10px]">
                    The most lasting memories are rarely the grand ones. They
                    are the photographs we return to, the stories we tell
                    again, the voice we can still hear in our minds. Piece by
                    piece, they become the way we keep someone close.
                  </p>

                  <div className="relative mt-4 border-l-2 border-memory-accent pl-3">
                    <span className="absolute -left-[7px] -top-2 text-[9px] text-memory-accent">
                      ✦
                    </span>

                    <p className="font-[cursive] text-[10px] italic leading-relaxed text-memory-maroon sm:text-xs">
                      Some memories are too precious to be left behind.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <div className="relative w-[245px] border border-memory-accent/70 bg-memory-card px-4 py-2.5 shadow-[0_6px_18px_rgba(113,60,72,0.08)]">
                    <span className="absolute -left-[4px] top-1/2 -translate-y-1/2 text-[8px] text-memory-accent">
                      ✦
                    </span>

                    <div className="flex items-center justify-center gap-2">
                      <span className="h-px w-5 bg-memory-accent/50" />
                      <span className="text-center text-[6px] font-semibold uppercase tracking-[0.25em] text-memory-accent">
                        A Little Reminder
                      </span>
                      <span className="h-px w-5 bg-memory-accent/50" />
                    </div>

                    <p className="mt-1.5 text-center font-[cursive] text-[11px] italic leading-snug text-memory-maroon sm:text-xs">
                      What we love deeply,
                      <br />
                      we carry with us.
                    </p>

                    <div className="mt-1 flex justify-end pr-1">
                      <span className="rotate-[-6deg] font-[cursive] text-[8px] italic text-memory-maroon/35">
                        — with love
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="relative z-20 border-t-[2px] border-memory-primary bg-memory-primary px-4 py-3 sm:px-7">
            <div className="flex items-center justify-between gap-4">
              <div className="hidden min-w-[170px] sm:block">
                <p className="text-[6px] uppercase tracking-[0.25em] text-memory-light/55">
                  The Memorial Times
                </p>

                <p className="mt-1 font-serif text-[9px] italic text-memory-accent">
                  Special Edition • Vol. I
                </p>
              </div>

              <div className="flex-1 text-center">
                <p className="font-serif text-sm font-normal italic text-memory-accent sm:text-base">
                  His story continues on the next page.
                </p>

                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-memory-accent/35" />
                  <span className="text-[6px] uppercase tracking-[0.28em] text-memory-light/50">
                    Open the complete memoir
                  </span>
                  <span className="h-px w-8 bg-memory-accent/35" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleContinueReading}
                disabled={isOpening}
                className="group flex shrink-0 items-center gap-3 border border-memory-accent bg-memory-maroon px-5 py-3 text-[8px] font-bold uppercase tracking-[0.2em] text-memory-light shadow-[0_7px_22px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-memory-maroon/90 hover:shadow-[0_10px_30px_rgba(0,0,0,0.28)] disabled:cursor-default sm:px-7 sm:py-3.5 sm:text-[9px]"
              >
                <span>Continue Reading</span>
                <span className="text-base text-memory-accent transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </footer>
        </motion.section>
      </div>
    </main>
  );
}