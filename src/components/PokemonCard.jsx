import { useNavigate } from 'react-router-dom';

function PokemonCard({ pokemon }) {
    const navigate = useNavigate();

    return (
        <div className="pokemon-card" onClick={() => navigate(`/pokemon/${pokemon.pokedexId}`)}>
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            <div className="pokemon-infos">
                <div className="pokemon-id">#{pokemon.pokedexId.toString().padStart(3, '0')}</div>
                <div className="pokemon-name">{pokemon.name}</div>
            </div>
            <div className="pokemon-types">
                {pokemon.types.map((t, i) => (
                    <span key={i} className="type-badge">{t.name}</span>
                ))}
            </div>
        </div>
    );
}

export default PokemonCard;
