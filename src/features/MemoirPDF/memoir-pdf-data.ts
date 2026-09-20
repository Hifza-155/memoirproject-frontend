export interface Contributor {
  id: string;
  name: string;
  relationship: string;
  storyDate: string;
}

export interface WrittenMemory {
  id: string;
  type: "written";
  chapterTitle: string;
  contributor: Contributor;
  paragraphs: string[];
}

export interface VoiceMemory {
  id: string;
  type: "voice";
  chapterTitle: string;
  contributor: Contributor;
  duration: string;
  transcript: string;
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  caption?: string;
}

export interface MediaMemory {
  id: string;
  type: "media";
  chapterTitle: string;
  contributor: Contributor;
  media: MediaItem[];
  story?: string;
}

export interface MemoirChapter {
  id: string;
  title: string;
  memories: Array<WrittenMemory | VoiceMemory | MediaMemory>;
}

export interface MemoirPDFData {
  memoirTitle: string;
  personName: string;
  years?: string;
  chapters: MemoirChapter[];
}

export const memoirPDFData: MemoirPDFData = {
  memoirTitle: "A Life Remembered",
  personName: "Robert Harrison",
  years: "1942 - 2024",

  chapters: [
    {
      id: "chapter-1",
      title: "Childhood Memories",
      memories: [
        {
          id: "written-1",
          type: "written",
          chapterTitle: "Childhood Memories",
          contributor: {
            id: "contributor-1",
            name: "Sarah Harrison",
            relationship: "Daughter",
            storyDate: "August 28, 2026",
          },
          paragraphs: [
            "Robert had a way of making ordinary moments feel meaningful. His kindness, quiet humor and presence stayed with the people around him.",
            "Some of my favorite memories are from family gatherings where he would tell stories and make everyone feel at home.",
          ],
        },

        {
          id: "written-2",
          type: "written",
          chapterTitle: "Childhood Memories",
          contributor: {
            id: "contributor-2",
            name: "Michael Harrison",
            relationship: "Son",
            storyDate: "August 30, 2026",
          },
          paragraphs: [
            "I remember how Robert always made time for his family, even when life was busy.",
            "His quiet strength and gentle sense of humor are things I will always carry with me.",
          ],
        },
      ],
    },

    {
      id: "chapter-2",
      title: "Remembering His Laughter",
      memories: [
        {
          id: "voice-1",
          type: "voice",
          chapterTitle: "Remembering His Laughter",
          contributor: {
            id: "contributor-3",
            name: "Emily Carter",
            relationship: "Close Friend",
            storyDate: "September 1, 2026",
          },
          duration: "0:42",
          transcript:
            "I still remember how Robert could make everyone laugh, even during the simplest family gatherings. His stories, his gentle humor and the way he looked after everyone are memories I will always keep close to my heart.",
        },

        {
          id: "voice-2",
          type: "voice",
          chapterTitle: "Remembering His Laughter",
          contributor: {
            id: "contributor-5",
            name: "David Harrison",
            relationship: "Brother",
            storyDate: "September 3, 2026",
          },
          duration: "0:35",
          transcript:
            "Robert had a beautiful way of bringing people together. Whenever we were around him, there was always laughter, warmth and a story to remember.",
        },
      ],
    },

    {
      id: "chapter-3",
      title: "A Cherished Moment",
      memories: [
        {
          id: "media-1",
          type: "media",
          chapterTitle: "A Cherished Moment",
          contributor: {
            id: "contributor-4",
            name: "Sarah Harrison",
            relationship: "Daughter",
            storyDate: "September 2, 2026",
          },

          media: [
            {
              id: "media-item-1",
              type: "image",
              src: "/images/memory-1.jpg",
              caption:
                "A quiet family moment that I will always remember.",
            },

            {
              id: "media-item-2",
              type: "image",
              src: "/images/memory-2.jpg",
              caption:
                "One of those simple moments that meant so much to our family.",
            },

            {
              id: "media-item-3",
              type: "video",
              src: "",
              caption:
                "A special moment captured in motion and preserved as part of Robert's story.",
            },
          ],

          story:
            "This collection brings together a few moments that remind me of Robert's warmth, kindness and the happiness he brought to our family.",
        },

        {
          id: "media-2",
          type: "media",
          chapterTitle: "A Cherished Moment",
          contributor: {
            id: "contributor-6",
            name: "Michael Harrison",
            relationship: "Son",
            storyDate: "September 4, 2026",
          },

          media: [
            {
              id: "media-item-4",
              type: "image",
              src: "/images/memory-3.jpg",
              caption:
                "A memory from a day we spent together as a family.",
            },

            {
              id: "media-item-5",
              type: "image",
              src: "/images/memory-4.jpg",
              caption:
                "A photograph that brings back so many beautiful memories.",
            },
          ],

          story:
            "Every photograph holds a different part of his story. Looking back at these moments reminds us of the love and memories we shared with him.",
        },
      ],
    },
  ],
};