import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Halak from './components/Halak';
import Card from './components/Card';
import Horgaszok from './components/Horgaszok';
import Balaton from './components/Balaton';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Halak />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/horgaszok" element={<Horgaszok />} />
        <Route path="/balaton" element={<Balaton />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
