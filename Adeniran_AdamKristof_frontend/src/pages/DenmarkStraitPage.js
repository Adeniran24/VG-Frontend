import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBattleResult, fetchBattleParticipants } from '../api';
import { DENMARK_STRAIT_BATTLE_NAME } from '../config';

const normalizeShipNames = (data) =>
  data
    .map((item) => {
      if (typeof item === 'string') {
        return item;
      }
      return item?.nev ?? item?.Nev ?? '';
    })
    .filter(Boolean);

function DenmarkStraitPage() {
  const navigate = useNavigate();
  const [ships, setShips] = useState([]);
  const [battleName, setBattleName] = useState(DENMARK_STRAIT_BATTLE_NAME);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadParticipants = async () => {
      const candidateNames = [
        DENMARK_STRAIT_BATTLE_NAME,
        'Denmark Strait',
        'A Denmark Strait csata'
      ];
      let hadRequestError = false;

      for (const candidate of candidateNames) {
        try {
          const data = await fetchBattleParticipants(candidate);
          const participantNames = normalizeShipNames(data);

          if (participantNames.length === 0) {
            continue;
          }

          setBattleName(candidate);
          setShips(participantNames);
          setLoading(false);
          return;
        } catch (err) {
          hadRequestError = true;
          console.error(err.message);
        }
      }

      setShips([]);
      if (hadRequestError) {
        setError('Nem sikerült lekérdezni a csata adatait.');
      } else {
        setError('');
      }
      setLoading(false);
    };

    loadParticipants();
  }, []);

  const onDelete = async (shipName) => {
    const confirmed = window.confirm('Biztosan szeretnéd törölni?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteBattleResult(battleName, shipName);
      window.alert('Sikeres törlés!');
      navigate('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section>
      <h1 className="display-6 fw-bold mb-4">A Denmark Strait csata</h1>

      {loading && <p>Betöltés...</p>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && ships.length === 0 && (
        <div className="alert alert-info">Ehhez a csatához jelenleg nincs résztvevő hajókimenet.</div>
      )}

      <div className="row g-3">
        {ships.map((shipName) => (
          <div className="col-12 col-md-6" key={shipName}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <h2 className="h5 mb-0">{shipName}</h2>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  aria-label={`${shipName} törlése`}
                  onClick={() => onDelete(shipName)}
                >
                  <i className="bi bi-trash-fill" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DenmarkStraitPage;
