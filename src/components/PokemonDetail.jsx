import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonDetail() {
    const { pokedexId } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        axios.get(`https://nestjs-pokedex-api.vercel.app/pokemons/${pokedexId}`)
            .then(res => setPokemon(res.data));
    }, [pokedexId]);

    if (!pokemon) return <div>Chargement...</div>;

    return (
        <div className="pokemon-detail-page" style={{ display: 'flex', padding: '2rem' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <img src={pokemon.image} alt={pokemon.name} style={{ width: '300px' }} />
                <h3>Évolutions</h3>
                <div className="evolutions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    {pokemon.evolutions.map(evo => (
                        <PokemonCard key={evo.pokedexId} pokemon={{ ...evo, types: [], image: `${evo.image}` }} />
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, paddingLeft: '2rem' }}>
                <h1>{pokemon.name}</h1>
                <div style={{ marginBottom: '1rem' }}>
                    {pokemon.types.map(t => (
                        <span key={t.id} className="type-badge">{t.name}</span>
                    ))}
                </div>
                <h3>Statistiques</h3>
                <div className="stats">
                    {Object.entries(pokemon.stats)
                        .filter(([k]) => ['HP', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'].includes(k))
                        .map(([key, value]) => (
                            <div key={key} className="stat">
                                <div className="stat-name">{key.replace(/([A-Z])/g, ' $1')}</div>
                                <div className="stat-bar">
                                    <div className="stat-fill" style={{ width: `${(value / 150) * 100}%` }}>{value}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;
