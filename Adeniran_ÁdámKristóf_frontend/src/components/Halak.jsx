import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Halak() {
  const [halak, setHalak] = React.useState([]);

  function getHalak() {
    fetch('https://halak.onrender.com/api/Halak')
      .then((response) => response.json())
      .then((data) => setHalak(data))
      .catch((error) => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    getHalak();
  }, []);

  return (
    <div>
      <h1>Halak</h1>
      <div className="container">
        <div className="row">
          {halak.map((hal) => (
            <div className="col-md-4" key={hal.id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{hal.nev}</h5>
                  <Link to={`/card/${hal.id}`} className="btn btn-primary">
                    Részletek
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
