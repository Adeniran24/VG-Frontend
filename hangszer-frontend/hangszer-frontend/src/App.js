import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import InstrumentsPage from './pages/InstrumentsPage';
import InstrumentDetailsPage from './pages/InstrumentDetailsPage';
import NewInstrumentPage from './pages/NewInstrumentPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <span className="navbar-brand mb-0 h1">Hangszerbolt</span>
            <div className="navbar-nav">
              <NavLink end to="/" className="nav-link">
                Hangszerek
              </NavLink>
              <NavLink to="/uj-hangszer" className="nav-link">
                Új hangszer
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <Routes>
            <Route path="/" element={<InstrumentsPage />} />
            <Route path="/instruments/:id" element={<InstrumentDetailsPage />} />
            <Route path="/uj-hangszer" element={<NewInstrumentPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
