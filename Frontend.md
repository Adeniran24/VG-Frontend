# Frontend sablonok (kezdőknek)

Ez a fájl másolható sablonokat ad a leggyakoribb frontend feladatokra.
Mindenhol keresd a kommenteket: `// ÁTÍRANDÓ`.

---

## 1) API service sablon (Axios) – GET, GET by ID, POST, PUT, DELETE

```js
import axios from 'axios';

// ÁTÍRANDÓ: backend alap URL (pl. https://localhost:7017)
const API_BASE_URL = 'https://localhost:7017';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// ÁTÍRANDÓ: resource neve (pl. '/Konyv', '/instruments', '/api/Hajo')
const RESOURCE = '/Konyv';

export const entityApi = {
  // GET (összes)
  getAll: async () => {
    const response = await api.get(RESOURCE); // ÁTÍRANDÓ: ha más endpoint kell
    return response.data;
  },

  // GET by ID
  getOne: async (id) => {
    const response = await api.get(`${RESOURCE}/${id}`); // ÁTÍRANDÓ: URL forma
    return response.data;
  },

  // POST (új létrehozása)
  create: async (payload) => {
    const response = await api.post(RESOURCE, payload); // ÁTÍRANDÓ: endpoint/payload
    return response.data;
  },

  // PUT (módosítás)
  update: async (id, payload) => {
    const response = await api.put(`${RESOURCE}/${id}`, payload); // ÁTÍRANDÓ: URL és payload
    return response.data;
  },

  // DELETE (törlés)
  remove: async (id) => {
    await api.delete(`${RESOURCE}/${id}`); // ÁTÍRANDÓ: URL forma
  },
};
```

### Mit kell átírni biztosan?
- `API_BASE_URL`
- `RESOURCE`
- Ha a backend nem `/{resource}/{id}` mintát használ, akkor az URL-eket a metódusokban.

---

## 2) API service sablon (Fetch) – ha nem Axios-t használsz

```js
// ÁTÍRANDÓ: backend alap URL
const API_BASE_URL = 'https://localhost:7017';

const withBase = (path) => `${API_BASE_URL}${path}`;

async function readResponseError(response) {
  const text = await response.text();
  return text || `HTTP ${response.status}`;
}

export async function getAllEntities() {
  const response = await fetch(withBase('/api/Entity/All')); // ÁTÍRANDÓ
  if (!response.ok) throw new Error(await readResponseError(response));
  return response.json();
}

export async function getEntityById(id) {
  const response = await fetch(withBase(`/api/Entity/${id}`)); // ÁTÍRANDÓ
  if (!response.ok) throw new Error(await readResponseError(response));
  return response.json();
}

export async function createEntity(payload) {
  const response = await fetch(withBase('/api/Entity'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await readResponseError(response));
  return response.json();
}

export async function updateEntity(id, payload) {
  const response = await fetch(withBase(`/api/Entity/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await readResponseError(response));
  return response.json();
}

export async function deleteEntity(id) {
  const response = await fetch(withBase(`/api/Entity/${id}`), {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(await readResponseError(response));
}
```

---

## 3) Lista oldal sablon (GET + törlés gomb)

```jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { entityApi } from '../services/entityApi'; // ÁTÍRANDÓ: fájl útvonala + importált objektum neve (pl. konyvApi)

export function EntityListPage() { // ÁTÍRANDÓ: komponensnév
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadItems = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await entityApi.getAll();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Betöltési hiba.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan törlöd?')) return;
    try {
      await entityApi.remove(id);
      setItems((prev) => prev.filter((item) => Number(item.id) !== Number(id))); // tartsd egységesen számos típusban az ID-ket
    } catch (err) {
      setError(err?.response?.data?.message || 'Törlési hiba.');
    }
  };

  if (isLoading) return <p>Betöltés...</p>;

  return (
    <section className="container py-4">
      <h1 className="h3 mb-3">Elemek listája</h1> {/* ÁTÍRANDÓ */}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3">
        {items.map((item) => (
          <div className="col-12 col-md-6 col-lg-4" key={item.id}> {/* backend oldalon legyen minden id egyedi */}
            <div className="card h-100">
              <div className="card-body">
                <h2 className="h5">{item.name}</h2> {/* ÁTÍRANDÓ: mezőnév */}
              </div>
              <div className="card-footer d-flex gap-2">
                <Link className="btn btn-outline-primary btn-sm" to={`/entity/${item.id}`}>Részletek</Link> {/* ÁTÍRANDÓ: route */}
                <Link className="btn btn-outline-warning btn-sm" to={`/entity/edit/${item.id}`}>Szerkesztés</Link> {/* ÁTÍRANDÓ */}
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item.id)}>Törlés</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <Link className="btn btn-primary" to="/entity/new">Új elem</Link> {/* ÁTÍRANDÓ */}
      </div>
    </section>
  );
}
```

---

## 4) Részletek oldal sablon (GET by ID)

```jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { entityApi } from '../services/entityApi'; // ÁTÍRANDÓ

export function EntityDetailsPage() { // ÁTÍRANDÓ
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItem = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await entityApi.getOne(id);
        setItem(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Betöltési hiba.');
      } finally {
        setIsLoading(false);
      }
    };
    loadItem();
  }, [id]);

  if (isLoading) return <p>Betöltés...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!item) return <div className="alert alert-warning">Nincs találat.</div>;

  return (
    <section className="container py-4">
      <h1 className="h3 mb-3">Részletek</h1>
      <div className="card">
        <div className="card-body">
          <p><strong>Név:</strong> {item.name}</p> {/* ÁTÍRANDÓ: mezők */}
        </div>
      </div>
      <div className="mt-3 d-flex gap-2">
        <Link className="btn btn-outline-secondary" to="/">Vissza</Link> {/* ÁTÍRANDÓ */}
        <Link className="btn btn-primary" to={`/entity/edit/${id}`}>Szerkesztés</Link> {/* ÁTÍRANDÓ */}
      </div>
    </section>
  );
}
```

---

## 5) Új létrehozás oldal sablon (POST)

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityForm, initialEntityFormState, mapFormToPayload } from '../components/EntityForm'; // ÁTÍRANDÓ
import { entityApi } from '../services/entityApi'; // ÁTÍRANDÓ

export function EntityCreatePage() { // ÁTÍRANDÓ
  const navigate = useNavigate();
  const [form, setForm] = useState(initialEntityFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await entityApi.create(mapFormToPayload(form));
      navigate('/'); // ÁTÍRANDÓ: visszairányítás
    } catch (err) {
      setError(err?.response?.data?.message || 'Mentési hiba.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EntityForm
      title="Új elem"
      submitText="Mentés"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
}
```

---

## 6) Módosítás oldal sablon (GET by ID + PUT)

```jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EntityForm, mapEntityToForm, mapFormToPayload } from '../components/EntityForm'; // ÁTÍRANDÓ
import { entityApi } from '../services/entityApi'; // ÁTÍRANDÓ

export function EntityUpdatePage() { // ÁTÍRANDÓ
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItem = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await entityApi.getOne(id);
        setForm(mapEntityToForm(data));
      } catch (err) {
        setError(err?.response?.data?.message || 'Betöltési hiba.');
      } finally {
        setIsLoading(false);
      }
    };
    loadItem();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await entityApi.update(id, mapFormToPayload(form, id)); // az URL-hez is kell az id, és néhány backend a body-ban is elvárja
      navigate(`/entity/${id}`); // ÁTÍRANDÓ
    } catch (err) {
      setError(err?.response?.data?.message || 'Módosítási hiba.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Betöltés...</p>;
  if (!form) return <div className="alert alert-warning">Nincs találat.</div>;

  return (
    <EntityForm
      title="Elem módosítása"
      submitText="Mentés"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
}
```

---

## 7) Újrahasznosítható űrlap komponens sablon (Bootstrap)

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const initialEntityFormState = {
  name: '', // ÁTÍRANDÓ: mezők
  year: '',
};

export const mapFormToPayload = (form, id = null) => ({
  id: id == null || id === '' ? 0 : Number(id),
  name: form.name.trim(), // ÁTÍRANDÓ
  year: Number(form.year), // ÁTÍRANDÓ
});

export const mapEntityToForm = (entity) => ({
  name: entity?.name ?? '', // ÁTÍRANDÓ
  year: entity?.year != null ? String(entity.year) : '',
});

export function EntityForm({
  title,
  submitText,
  form,
  onChange,
  onSubmit,
  isSubmitting,
  error,
}) {
  return (
    <section className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">{title}</h1>
        <Link className="btn btn-outline-secondary" to="/">Vissza</Link> {/* ÁTÍRANDÓ: route */}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="card shadow-sm" onSubmit={onSubmit}>
        <div className="card-body row g-3">
          <div className="col-md-8">
            <label htmlFor="name" className="form-label">Név</label> {/* ÁTÍRANDÓ */}
            <input
              id="name"
              name="name"
              className="form-control"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="year" className="form-label">Év</label> {/* ÁTÍRANDÓ */}
            <input
              id="year"
              name="year"
              type="number"
              className="form-control"
              value={form.year}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Mentés...' : submitText}
          </button>
        </div>
      </form>
    </section>
  );
}
```

---

## 8) Navbar komponens sablon (Bootstrap)

```jsx
import { Link, NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Projekt neve {/* ÁTÍRANDÓ */}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end to="/" className="nav-link">Főoldal</NavLink> {/* ÁTÍRANDÓ */}
            </li>
            <li className="nav-item">
              <NavLink to="/masik-oldal" className="nav-link">Másik oldal</NavLink> {/* ÁTÍRANDÓ */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
```

---

## 9) Card komponens sablon (Bootstrap)

```jsx
import { Link } from 'react-router-dom';

function EntityCard({ item }) { // ÁTÍRANDÓ: név + mezők
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <Link to={`/entity/${item.id}`} className="w-100 text-decoration-none"> {/* ÁTÍRANDÓ */}
        <div className="card w-100 h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5> {/* ÁTÍRANDÓ */}
            <p className="card-text text-secondary">{item.description}</p> {/* ÁTÍRANDÓ */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EntityCard;
```

---

## 10) Rövid ellenőrzőlista (ha először csinálod)

1. Másold be a sablont.
2. Cseréld ki az összes `// ÁTÍRANDÓ` részt.
3. Ellenőrizd az endpointokat (GET, GET by ID, POST, PUT, DELETE).
4. Ellenőrizd a route-okat (`to="/..."`).
5. Indítsd el az appot és nézd meg:
   - lista betölt-e,
   - részletek oldal működik-e,
   - létrehozás (POST) működik-e,
   - módosítás (PUT) működik-e,
   - törlés (DELETE) működik-e.

Ha ezt végigcsinálod, stabil CRUD frontendet tudsz építeni kezdőként is.
