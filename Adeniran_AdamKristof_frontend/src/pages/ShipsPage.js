import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllShips } from '../api';

function ShipsPage() {
  const navigate = useNavigate();
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadShips = async () => {
      try {
        const data = await fetchAllShips();
        setShips(data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadShips();
  }, []);

  return (
    <section>
      <h1 className="display-6 fw-bold mb-4">Csatahajók</h1>

      {loading && <p>Betöltés...</p>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {ships.map((ship) => {
          const shipName = ship.nev ?? ship.Nev;
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={shipName}>
              <article
                role="button"
                tabIndex={0}
                className="card h-100 shadow-sm ship-card"
                onClick={() => navigate(`/hajo/${encodeURIComponent(shipName)}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    navigate(`/hajo/${encodeURIComponent(shipName)}`);
                  }
                }}
              >
                <div className="card-body d-flex align-items-center justify-content-center text-center">
                  <h2 className="h5 mb-0">{shipName}</h2>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ShipsPage;
