import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ChapterView from './components/ChapterView';

export function beRoutes() {
  return (
    <Route path="be" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="c/:slug" element={<ChapterView />} />
    </Route>
  );
}
