import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { moduleById, termById } from '../content';
import { useProgressStore } from '../store/progress';
import { Prose } from '../components/Prose';

export function LessonReader() {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const markLessonRead = useProgressStore((s) => s.markLessonRead);
  const module = id ? moduleById[id] : undefined;
  const lessonIndex = module?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = module && lessonIndex >= 0 ? module.lessons[lessonIndex] : undefined;

  useEffect(() => {
    if (lesson) markLessonRead(lesson.id);
  }, [lesson, markLessonRead]);

  if (!module || !lesson) return <Navigate to="/pm" replace />;

  const keyTerms = lesson.keyTerms.map((tid) => termById[tid]).filter(Boolean);
  const prev = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : undefined;
  const next = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : undefined;

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-faint)' }}>
        <Link to={`/pm/module/${module.id}`} className="font-mono-term hover:underline">
          L{module.order}
        </Link>
        <span>·</span>
        <span>
          lesson {lessonIndex + 1} of {module.lessons.length}
        </span>
      </div>

      <h1 className="mt-2 text-xl font-semibold" style={{ color: 'var(--text)' }}>
        {lesson.title}
      </h1>

      <div className="mt-6">
        <Prose body={lesson.body} keyTerms={keyTerms} />
      </div>

      <div className="mt-10 flex items-center justify-between border-t pt-6" style={{ borderColor: 'var(--border)' }}>
        {prev ? (
          <Link to={`/pm/module/${module.id}/lesson/${prev.id}`} className="text-sm" style={{ color: 'var(--text-dim)' }}>
            ← {prev.title}
          </Link>
        ) : (
          <Link to={`/pm/module/${module.id}`} className="text-sm" style={{ color: 'var(--text-dim)' }}>
            ← Overview
          </Link>
        )}
        {next ? (
          <Link
            to={`/pm/module/${module.id}/lesson/${next.id}`}
            className="rounded px-3 py-1.5 text-sm font-medium"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {next.title} →
          </Link>
        ) : (
          <Link
            to={`/pm/quiz/${module.id}`}
            className="rounded px-3 py-1.5 text-sm font-medium"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Take the quiz →
          </Link>
        )}
      </div>
    </div>
  );
}
