import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Card() {
  const { id } = useParams();
  const [hal, setHal] = useState(null);

  useEffect(() => {
    fetch('https://halak.onrender.com/api/Halak/' + id)
      .then((response) => response.json())
      .then((data) => setHal(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  if (!hal) return <div>Loading...</div>;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <img
          src={`data:image/jpeg;base64,${hal.kep}`}
          className="card-img-top"
          alt={hal.nev}
        />
        <h5 className="card-title">{hal.nev}</h5>
        <p className="card-text">{hal.faj}</p>
        <p className="card-text">{hal.meretCm} cm hosszú</p>
        <p className="card-text">{hal.leiras}</p>
      </div>
      <Link to="/" className="btn btn-primary">
        Vissza a halakhoz
      </Link>
    </div>
  );
}
