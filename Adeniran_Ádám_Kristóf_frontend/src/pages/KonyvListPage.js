import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { konyvApi } from '../services/konyvApi';

export function KonyvListPage() {
  const [konyvek, setKonyvek] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadKonyvek = async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await konyvApi.getAll();
      setKonyvek(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || 'A konyvek betoltese nem sikerult.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadKonyvek();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan torolni szeretned ezt a konyvet?')) {
      return;
    }

    try {
      await konyvApi.remove(id);
      setKonyvek((prevKonyvek) => prevKonyvek.filter((konyv) => String(konyv.id) !== String(id)));
    } catch (err) {
      setError(err?.response?.data?.message || 'A torles nem sikerult.');
    }
  };

  if (isLoading) {
    return <p className="text-secondary">Betoltes...</p>;
  }

  return (
    <section className="konyv-page">
      <h1 className="konyv-page-title">Könyvek</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {konyvek.length === 0 ? (
        <div className="alert alert-warning">Nincs megjelenitheto konyv.</div>
      ) : (
        <div className="row g-3 g-md-4 justify-content-center">
          {konyvek.map((konyv) => (
            <div className="col-12 col-sm-6 col-lg-4 d-flex" key={konyv.id}>
              <article className="konyv-card w-100">
                <p className="konyv-card-name">
                  Könyv neve: <span>{konyv.nev}</span>
                </p>
                <p className="konyv-card-year">Kiadás éve: {konyv.kiadasEve}</p>
                <p className="konyv-card-rating">Könyv értékelése: {konyv.ertekeles}</p>

                <Link className="konyv-card-image-link" to={`/konyv/${konyv.id}`}>
                  <img
                    src={konyv.kepneve}
                    alt={konyv.nev}
                    className="konyv-card-image"
                    loading="lazy"
                  />
                </Link>

                <div className="konyv-card-actions" role="group" aria-label="Konyv muveletek">
                  <Link className="konyv-icon-button" to={`/modosit-konyv/${konyv.id}`} aria-label="Konyv modositasa">
                    <i className="bi bi-pencil" />
                  </Link>
                  <button
                    type="button"
                    className="konyv-icon-button"
                    onClick={() => handleDelete(konyv.id)}
                    aria-label="Konyv torlese"
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-center mt-4">
        <Link className="btn btn-primary" to="/uj-konyv">
          <i className="bi bi-plus-lg me-2" />
          Új könyv
        </Link>
      </div>
    </section>
  );
}
