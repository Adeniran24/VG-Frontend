import { useEffect, useState } from 'react';
import InstrumentCard from '../components/InstrumentCard';
import { getInstruments } from '../api/instrumentsApi';

function InstrumentsPage() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const data = await getInstruments();
        setInstruments(data);
      } catch (error) {
        console.error('Hiba a hangszerek lekerdezesekor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

  if (loading) {
    return <p className="text-center">Betöltés...</p>;
  }

  return (
    <section>
      <h1 className="text-center mb-4">Hangszerek</h1>
      <div className="row g-3">
        {instruments.map((instrument) => (
          <InstrumentCard key={instrument.id} instrument={instrument} />
        ))}
      </div>
    </section>
  );
}

export default InstrumentsPage;
