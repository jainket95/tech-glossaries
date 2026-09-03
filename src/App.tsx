import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './routes/Home';
import { pmRoutes } from './courses/pm/routes';
import { beRoutes } from './courses/be/routes';
import { feRoutes } from './courses/fe/routes';
import { designRoutes } from './courses/design/routes';
import { fdeRoutes } from './courses/fde/routes';
import { sysdesignRoutes } from './courses/sysdesign/routes';
import { besdRoutes } from './courses/besd/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {pmRoutes()}
        {beRoutes()}
        {feRoutes()}
        {designRoutes()}
        {fdeRoutes()}
        {sysdesignRoutes()}
        {besdRoutes()}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
