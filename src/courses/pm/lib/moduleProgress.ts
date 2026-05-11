import type { Module, Progress } from '../types';

export type ModuleProgressStatus = {
  lessonsRead: number;
  lessonsTotal: number;
  quizPassed: boolean;
  quizScore: number | null;
  exerciseDone: boolean;
  complete: boolean;
  fractionDone: number;
};

export function computeModuleProgress(module: Module, progress: Progress): ModuleProgressStatus {
  const lessonsTotal = module.lessons.length;
  const lessonsRead = module.lessons.filter((l) => progress.lessonsRead.includes(l.id)).length;
  const quizScore = progress.quizScores[module.id] ?? null;
  const quizPassed = (quizScore ?? 0) >= 70;
  const exerciseDraft = progress.exerciseDrafts[module.exercise.id] ?? '';
  const exerciseDone = exerciseDraft.trim().length > 0;

  const complete = lessonsRead === lessonsTotal && lessonsTotal > 0 && quizPassed && exerciseDone;

  const steps = lessonsTotal + 2; // lessons + quiz + exercise
  const done = lessonsRead + (quizPassed ? 1 : 0) + (exerciseDone ? 1 : 0);
  const fractionDone = steps > 0 ? done / steps : 0;

  return { lessonsRead, lessonsTotal, quizPassed, quizScore, exerciseDone, complete, fractionDone };
}
