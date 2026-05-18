import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInstrument } from '../api/instrumentsApi';

const initialForm = {
  id: '',
  name: '',
  brand: '',
  price: '',
  quantity: '',
  imageURL: '',
};

function NewInstrumentPage() {
  const [formData, setFormData] = useState(initialForm);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    try {
      await createInstrument(payload);
      alert('Sikeres adatfelvitel!');
      navigate('/');
    } catch (error) {
      console.error('Hiba a hangszer felvitelekor:', error);
    }
  };

 
  return (
    <section className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm p-3">
          <h1 className="h4 mb-3">Uj hangszer</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="id">
                Azonositó
              </label>
              <input id="id" name="id" value={formData.id} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Név
              </label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="brand">
                Márka
              </label>
              <input id="brand" name="brand" value={formData.brand} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="price">
                Ár (HUF)
              </label>
              <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="form-control" min="0" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="quantity">
                Mennyiség (db)
              </label>
              <input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} className="form-control" min="0" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="imageURL">
                Kép URL
              </label>
              <input id="imageURL" name="imageURL" type="url" value={formData.imageURL} onChange={handleChange} className="form-control" required />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Mentés
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewInstrumentPage;
