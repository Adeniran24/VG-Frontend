import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Horgaszok() {
  const [horgaszok, setHorgaszok] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://halak.onrender.com/api/Horgaszok')
      .then((response) => response.json())
      .then((data) => setHorgaszok(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  }, []);

  const deleteHorgasz = async (id) => {
    const confirmed = window.confirm('Biztosan szeretnéd törölni?');
    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://halak.onrender.com/api/Horgaszok/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        const message = await response.text();
        console.error(message || 'Törlés sikertelen');
        return;
      }

      alert('Sikeres törlés!');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <div>Hiba történt: {error}</div>;
  }

  return (
    <div>
      <h1>Horgászok</h1>
      <ul className="list-group">
        {horgaszok.map((horgasz) => (
          <li
            key={horgasz.id ?? horgasz.nev}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{horgasz.nev ?? 'Ismeretlen'}</span>
            <button
              type="button"
              className="btn btn-link text-danger p-0"
              aria-label="Horgász törlése"
              onClick={() => deleteHorgasz(horgasz.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
        {horgaszok.length === 0 && (
          <li className="list-group-item">Nincsenek megjeleníthető horgászok.</li>
        )}
      </ul>
    </div>
  )
}
