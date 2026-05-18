import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getInstrumentById } from '../api/instrumentsApi';

function InstrumentDetailsPage() {
  const { id } = useParams();
  const [instrument, setInstrument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstrument = async () => {
      try {
        const data = await getInstrumentById(id);
        setInstrument(data);
      } catch (error) {
        console.error('Hiba a hangszer lekerdezesekor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstrument();
  }, [id]);

  if (loading) {
    return <p className="text-center">Betöltés...</p>;
  }

  if (!instrument) {
    return <p className="text-center">A hangszer nem található.</p>;
  }

  return (
    <section className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card p-3 shadow-sm">
          <img
            src={instrument.imageURL}
            alt={instrument.name}
            className="detail-image card-img-top"
          />
          <div className="card-body text-center">
            <p className="text-secondary fw-semibold mb-1">{instrument.brand}</p>
            <h2 className="h4 mb-3">{instrument.name}</h2>
            <p className="text-primary fw-bold mb-1">{instrument.price} HUF</p>
            <p className="text-primary mb-3">Készleten: {instrument.quantity} db</p>
            <Link to="/" className="text-decoration-none" aria-label="Vissza a listahoz">
              <i className="bi bi-arrow-left-circle-fill back-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstrumentDetailsPage;
