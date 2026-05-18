import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  initialKonyvFormState,
  KonyvForm,
  mapFormToPayload,
} from '../components/KonyvForm';
import { konyvApi } from '../services/konyvApi';

export function KonyvCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialKonyvFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await konyvApi.create(mapFormToPayload(form));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'A konyv letrehozasa nem sikerult.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KonyvForm
      title="Uj konyv felvetele"
      submitText="Konyv mentese"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
}
