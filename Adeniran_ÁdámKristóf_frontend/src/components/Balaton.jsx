import { useState, useEffect } from 'react'

export default function Balaton() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://halak.onrender.com/api/Tavak/1')
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
                <div className="card" style={{ width: '18rem' }}>
    <ul className="list-group list-group-flush">
        <li className="list-group-item">{data?.nev}</li>
        <li className="list-group-item">{data?.helyszin}</li>
        <li className="list-group-item">
            {data?.halaks?.map((hal, index) => (
                <div key={index}>{hal}</div>
            ))}
        </li>
    </ul>
</div>
        </div>
    )
}
