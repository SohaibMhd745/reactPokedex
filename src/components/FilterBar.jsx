import { useEffect, useState } from 'react';
import axios from 'axios';

function FilterBar({ onFilterChange }) {
    const [types, setTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [limit, setLimit] = useState(50);

    useEffect(() => {
        axios.get('https://nestjs-pokedex-api.vercel.app/types').then(res => {
            setTypes(res.data);
        });
    }, []);

    useEffect(() => {
        onFilterChange({ limit, types: selectedTypes });
    }, [limit, selectedTypes]);

    const handleTypeToggle = (id) => {
        setSelectedTypes(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    return (
        <div className="filter-bar">
            <div className="quantity-filter">
                Résultats :
                <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
                    {[10, 25, 50, 100].map(n => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>

            <div className="type-filter">
                {types.map(type => (
                    <button
                        key={type.id}
                        className={`type-badge ${selectedTypes.includes(type.id) ? 'selected' : ''}`}
                        onClick={() => handleTypeToggle(type.id)}
                    >
                        {type.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterBar;
