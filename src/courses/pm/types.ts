export type Domain = 'pm' | 'fe' | 'be';
export type Tier = 1 | 2 | 3;

export type Term = {
  id: string; // kebab-case, globally unique across domains
  domain: Domain;
  term: string;
  aliases?: string[];
  moduleId: string; // 'pm-l6'
  tier: Tier; // 1 = must know, 2 = should, 3 = nice
  oneLiner: string; // <= 15 words, meeting-safe definition
  full: string; // 2-4 sentences
  devAnalogy: string; // "the PM version of ___"
  leverage?: string; // what a frontend dev owns/influences here
  sayThis?: string; // exact sentence to use in a meeting
  antiPattern?: string; // how it goes wrong on real teams
  related: string[]; // term ids
};

export type Lesson = {
  id: string;
  title: string;
  body: string; // markdown, 400-700 words
  keyTerms: string[]; // term ids surfaced inline as chips
};

export type QuizQuestion =
  | { kind: 'mcq'; id: string; prompt: string; options: string[]; answer: number; explain: string }
  | { kind: 'match'; id: string; prompt: string; pairs: [string, string][]; explain: string }
  | { kind: 'scenario'; id: string; prompt: string; options: string[]; answer: number; explain: string };

export type Exercise = {
  id: string;
  title: string;
  prompt: string; // markdown, applied to the learner's own work
  scaffold: string; // fill-in template
  rubric: string[]; // 3-5 self-check bullets
};

export type Module = {
  id: string; // 'pm-l1' .. 'pm-l10'
  domain: Domain;
  order: number;
  title: string;
  subtitle: string;
  why: string; // why a frontend dev should care, 2 sentences
  estMinutes: number;
  lessons: Lesson[];
  terms: Term[];
  quiz: QuizQuestion[];
  exercise: Exercise;
};

export type SrsCard = { ease: number; interval: number; due: string; reps: number };

export type Progress = {
  lessonsRead: string[];
  quizScores: Record<string, number>;
  exerciseDrafts: Record<string, string>;
  srs: Record<string, SrsCard>;
};

export type LeveragePlay = {
  id: string;
  title: string;
  situation: string;
  sayThis: string;
  whatItGetsYou: string;
  relatedTerms: string[];
};
