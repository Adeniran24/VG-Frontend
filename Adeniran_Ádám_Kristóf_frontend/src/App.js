import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { KonyvListPage } from './pages/KonyvListPage';
import { KonyvDetailsPage } from './pages/KonyvDetailsPage';
import { KonyvCreatePage } from './pages/KonyvCreatePage';
import { KonyvUpdatePage } from './pages/KonyvUpdatePage';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <div className="navbar-nav">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Könyvek</NavLink>
            <NavLink to="/uj-konyv" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Új könyv</NavLink>
          </div>
        </div>
      </nav>
      <main className="container pb-4">
        <Routes>
          <Route path="/" element={<KonyvListPage />} />
          <Route path="/konyv/:id" element={<KonyvDetailsPage />} />
          <Route path="/uj-konyv" element={<KonyvCreatePage />} />
          <Route path="/modosit-konyv/:id" element={<KonyvUpdatePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;