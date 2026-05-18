import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KonyvForm, mapFormToPayload, mapKonyvToForm } from '../components/KonyvForm';
import { konyvApi } from '../services/konyvApi';

export function KonyvUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadKonyv = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await konyvApi.getOne(id);
        setForm(mapKonyvToForm(data));
      } catch (err) {
        setError(err?.response?.data?.message || 'A konyv adatai nem tolthetok be.');
      } finally {
        setIsLoading(false);
      }
    };

    loadKonyv();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await konyvApi.update(id, mapFormToPayload(form, id));
      navigate(`/konyv/${id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'A konyv modositasa nem sikerult.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-secondary">Betoltes...</p>;
  }

  if (!form) {
    return <div className="alert alert-warning">A konyv nem talalhato.</div>;
  }

  return (
    <KonyvForm
      title="Konyv modositasa"
      submitText="Valtozasok mentese"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
}
