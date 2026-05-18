import { Link } from 'react-router-dom';

function InstrumentCard({ instrument }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <Link
        to={`/instruments/${instrument.id}`}
        className="instrument-title-link w-100"
        aria-label={`${instrument.name} reszletek`}
      >
        <div className="card instrument-card w-100 text-center p-2">
          <div className="card-body d-flex flex-column">
            <p className="text-secondary fw-semibold mb-1">{instrument.brand}</p>
            <h5 className="card-title mb-2">{instrument.name}</h5>
            <p className="text-primary fw-bold mb-1">{instrument.price} HUF</p>
            <p className="text-primary mb-3">Keszleten: {instrument.quantity} db</p>
            <img
              src={instrument.imageURL}
              alt={instrument.name}
              className="instrument-image mt-auto"
              loading="lazy"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default InstrumentCard;
