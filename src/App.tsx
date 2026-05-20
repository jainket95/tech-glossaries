import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './routes/Home';
import { pmRoutes } from './courses/pm/routes';
import { beRoutes } from './courses/be/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {pmRoutes()}
        {beRoutes()}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
