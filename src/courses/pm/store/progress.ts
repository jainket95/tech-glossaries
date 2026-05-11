import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Progress, SrsCard } from '../types';
import { gradeCard, newCard, type Grade } from '../lib/srs';

type ProgressState = Progress & {
  markLessonRead: (lessonId: string) => void;
  isLessonRead: (lessonId: string) => boolean;
  setQuizScore: (quizId: string, score: number) => void;
  setExerciseDraft: (exerciseId: string, draft: string) => void;
  addToDeck: (termId: string) => void;
  removeFromDeck: (termId: string) => void;
  gradeSrsCard: (termId: string, grade: Grade) => void;
  isInDeck: (termId: string) => boolean;
  exportJson: () => string;
  resetAll: () => void;
};

const initialProgress: Progress = {
  lessonsRead: [],
  quizScores: {},
  exerciseDrafts: {},
  srs: {},
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialProgress,

      markLessonRead: (lessonId) =>
        set((state) => ({
          lessonsRead: state.lessonsRead.includes(lessonId)
            ? state.lessonsRead
            : [...state.lessonsRead, lessonId],
        })),

      isLessonRead: (lessonId) => get().lessonsRead.includes(lessonId),

      setQuizScore: (quizId, score) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [quizId]: score },
        })),

      setExerciseDraft: (exerciseId, draft) =>
        set((state) => ({
          exerciseDrafts: { ...state.exerciseDrafts, [exerciseId]: draft },
        })),

      addToDeck: (termId) =>
        set((state) => {
          if (state.srs[termId]) return state;
          const card: SrsCard = newCard(new Date());
          return { srs: { ...state.srs, [termId]: card } };
        }),

      removeFromDeck: (termId) =>
        set((state) => {
          const next = { ...state.srs };
          delete next[termId];
          return { srs: next };
        }),

      isInDeck: (termId) => Boolean(get().srs[termId]),

      gradeSrsCard: (termId, grade) =>
        set((state) => {
          const existing = state.srs[termId] ?? newCard(new Date());
          return { srs: { ...state.srs, [termId]: gradeCard(existing, grade, new Date()) } };
        }),

      exportJson: () => {
        const { lessonsRead, quizScores, exerciseDrafts, srs } = get();
        return JSON.stringify({ lessonsRead, quizScores, exerciseDrafts, srs }, null, 2);
      },

      resetAll: () => set({ ...initialProgress }),
    }),
    { name: 'pm-for-engineers-progress' }
  )
);
