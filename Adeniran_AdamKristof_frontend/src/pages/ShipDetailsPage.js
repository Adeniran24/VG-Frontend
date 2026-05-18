import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchShipByName } from '../api';

function ShipDetailsPage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || '');

  const [ship, setShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadShip = async () => {
      try {
        const data = await fetchShipByName(decodedName);
        setShip(data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadShip();
  }, [decodedName]);

  return (
    <section>
      <h1 className="display-6 fw-bold mb-4">Részletes hajóadatok</h1>

      {loading && <p>Betöltés...</p>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && ship && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title h4 mb-3">{ship.nev ?? ship.Nev}</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Osztály:</strong> {ship.osztaly ?? ship.Osztaly ?? '-'}
              </li>
              <li className="list-group-item">
                <strong>Felavatva:</strong> {ship.felavatva ?? ship.Felavatva ?? '-'}
              </li>
              <li className="list-group-item">
                <strong>Agyúk száma:</strong> {ship.agyukSzama ?? ship.AgyukSzama ?? '-'}
              </li>
              <li className="list-group-item">
                <strong>Kaliber:</strong> {ship.kaliber ?? ship.Kaliber ?? '-'}
              </li>
              <li className="list-group-item">
                <strong>Vízkiszorítás:</strong> {ship.vizkiszoritas ?? ship.Vizkiszoritas ?? '-'}
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Link to="/" className="btn btn-outline-primary">
          Vissza a csatahajókhoz
        </Link>
      </div>
    </section>
  );
}

export default ShipDetailsPage;
