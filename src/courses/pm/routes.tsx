import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './routes/Dashboard';
import { ModuleOverview } from './routes/ModuleOverview';
import { LessonReader } from './routes/LessonReader';
import { Glossary } from './routes/Glossary';
import { TermPage } from './routes/TermPage';
import { Review } from './routes/Review';
import { Quiz } from './routes/Quiz';
import { Exercise } from './routes/Exercise';
import { Leverage } from './routes/Leverage';
import { MapPage } from './routes/MapPage';

export function pmRoutes() {
  return (
    <Route path="pm" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="module/:id" element={<ModuleOverview />} />
      <Route path="module/:id/lesson/:lessonId" element={<LessonReader />} />
      <Route path="glossary" element={<Glossary />} />
      <Route path="term/:id" element={<TermPage />} />
      <Route path="review" element={<Review />} />
      <Route path="quiz/:id" element={<Quiz />} />
      <Route path="exercise/:id" element={<Exercise />} />
      <Route path="leverage" element={<Leverage />} />
      <Route path="map" element={<MapPage />} />
    </Route>
  );
}
