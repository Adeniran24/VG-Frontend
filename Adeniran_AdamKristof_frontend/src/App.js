import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import DenmarkStraitPage from './pages/DenmarkStraitPage';
import ShipDetailsPage from './pages/ShipDetailsPage';
import ShipsPage from './pages/ShipsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <NavigationBar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<ShipsPage />} />
            <Route path="/hajo/:name" element={<ShipDetailsPage />} />
            <Route path="/denmark-strait" element={<DenmarkStraitPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
