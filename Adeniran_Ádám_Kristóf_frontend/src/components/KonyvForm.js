import React from 'react';
import { Link } from 'react-router-dom';

export const initialKonyvFormState = {
  nev: '',
  kiadasEve: '',
  ertekeles: '',
  kepneve: '',
};

export const mapFormToPayload = (form, id = 0) => ({
  id: Number(id) || 0,
  nev: form.nev.trim(),
  kiadasEve: Number(form.kiadasEve),
  ertekeles: Number(form.ertekeles),
  kepneve: form.kepneve.trim(),
});

export const mapKonyvToForm = (konyv) => ({
  nev: konyv?.nev ?? '',
  kiadasEve: konyv?.kiadasEve != null ? String(konyv.kiadasEve) : '',
  ertekeles: konyv?.ertekeles != null ? String(konyv.ertekeles) : '',
  kepneve: konyv?.kepneve ?? '',
});

export function KonyvForm({
  title,
  submitText,
  form,
  onChange,
  onSubmit,
  isSubmitting,
  error,
}) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">{title}</h1>
        <Link className="btn btn-outline-secondary" to="/">
          Vissza
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="card shadow-sm" onSubmit={onSubmit}>
        <div className="card-body row g-3">
          <div className="col-md-8">
            <label htmlFor="nev" className="form-label">Konyv neve</label>
            <input
              id="nev"
              name="nev"
              className="form-control"
              value={form.nev}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="kiadasEve" className="form-label">Kiadas eve</label>
            <input
              id="kiadasEve"
              name="kiadasEve"
              type="number"
              className="form-control"
              value={form.kiadasEve}
              onChange={onChange}
              min="0"
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="ertekeles" className="form-label">Ertekeles (1-5)</label>
            <input
              id="ertekeles"
              name="ertekeles"
              type="number"
              className="form-control"
              value={form.ertekeles}
              onChange={onChange}
              min="1"
              max="5"
              required
            />
          </div>

          <div className="col-md-8">
            <label htmlFor="kepneve" className="form-label">Borito kep URL</label>
            <input
              id="kepneve"
              name="kepneve"
              className="form-control"
              value={form.kepneve}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Mentes...' : submitText}
          </button>
        </div>
      </form>
    </section>
  );
}
