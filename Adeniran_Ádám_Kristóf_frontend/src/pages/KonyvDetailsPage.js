import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { konyvApi } from '../services/konyvApi';

export function KonyvDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [konyv, setKonyv] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadKonyv = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await konyvApi.getOne(id);
        setKonyv(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'A konyv adatai nem tolthetok be.');
      } finally {
        setIsLoading(false);
      }
    };

    loadKonyv();
  }, [id]);

  if (isLoading) {
    return <p className="text-secondary">Betoltes...</p>;
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex justify-content-between align-items-center">
        <span>{error}</span>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => navigate(-1)}>
          Vissza
        </button>
      </div>
    );
  }

  if (!konyv) {
    return <div className="alert alert-warning">A keresett konyv nem talalhato.</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Konyv reszletei</h1>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-secondary" to="/">
            Vissza
          </Link>
          <Link className="btn btn-primary" to={`/modosit-konyv/${id}`}>
            Modositas
          </Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <img
          src={konyv.kepneve}
          alt={konyv.nev}
          className="card-img-top"
          style={{ maxHeight: '420px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
        />
        <div className="card-body">
          <dl className="row mb-0">
            <dt className="col-sm-3">Nev</dt>
            <dd className="col-sm-9">{konyv.nev}</dd>

            <dt className="col-sm-3">Kiadas eve</dt>
            <dd className="col-sm-9">{konyv.kiadasEve}</dd>

            <dt className="col-sm-3">Ertekeles</dt>
            <dd className="col-sm-9">{konyv.ertekeles}/5</dd>

            <dt className="col-sm-3">Kep URL</dt>
            <dd className="col-sm-9 text-break">{konyv.kepneve}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
